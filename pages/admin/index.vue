<script setup lang="ts">
definePageMeta({ layout: false })
useSeoMeta({ title: 'Admin — The Total Experience', robots: 'noindex,nofollow' })

interface Invite {
  id: string
  email: string
  customer_name: string | null
  created_at: number
  expires_at: number
  used_at: number | null
  status: 'pending' | 'submitted' | 'expired'
}

interface Review {
  id: string
  invite_id: string
  name: string
  rating: number
  comment: string
  created_at: number
  is_published: boolean
  published_at: number | null
}

const invites = ref<Invite[]>([])
const reviews = ref<Review[]>([])
const invitesLoading = ref(false)
const reviewsLoading = ref(false)

const inviteEmail = ref('')
const inviteName = ref('')
const inviteSubmitting = ref(false)
const inviteError = ref<string | null>(null)

const toast = useToastSafe()

function formatDate(ms: number | null): string {
  if (!ms) return '—'
  return new Date(ms).toLocaleString()
}

function statusSeverity(status: Invite['status']): string {
  if (status === 'submitted') return 'success'
  if (status === 'expired') return 'danger'
  return 'info'
}

async function loadInvites() {
  invitesLoading.value = true
  try {
    invites.value = await $fetch<Invite[]>('/api/admin/invites')
  } catch (err) {
    toast?.add({ severity: 'error', summary: 'Failed to load invites', life: 4000 })
  } finally {
    invitesLoading.value = false
  }
}

async function loadReviews() {
  reviewsLoading.value = true
  try {
    reviews.value = await $fetch<Review[]>('/api/admin/reviews')
  } catch (err) {
    toast?.add({ severity: 'error', summary: 'Failed to load reviews', life: 4000 })
  } finally {
    reviewsLoading.value = false
  }
}

async function createInvite() {
  if (inviteSubmitting.value) return
  inviteError.value = null
  inviteSubmitting.value = true
  try {
    await $fetch('/api/admin/invites', {
      method: 'POST',
      body: {
        email: inviteEmail.value.trim(),
        customer_name: inviteName.value.trim() || null
      }
    })
    inviteEmail.value = ''
    inviteName.value = ''
    toast?.add({ severity: 'success', summary: 'Invite sent', life: 3000 })
    await loadInvites()
  } catch (err: unknown) {
    const e = err as { statusCode?: number; statusMessage?: string }
    inviteError.value = e?.statusMessage || 'Failed to create invite.'
  } finally {
    inviteSubmitting.value = false
  }
}

async function resendInvite(invite: Invite) {
  try {
    await $fetch('/api/admin/invites', {
      method: 'POST',
      body: { email: invite.email, customer_name: invite.customer_name }
    })
    toast?.add({ severity: 'success', summary: `Resent to ${invite.email}`, life: 3000 })
    await loadInvites()
  } catch (err) {
    toast?.add({ severity: 'error', summary: 'Failed to resend invite', life: 4000 })
  }
}

async function togglePublished(review: Review, next: boolean) {
  const previous = review.is_published
  review.is_published = next
  try {
    await $fetch(`/api/admin/reviews/${review.id}`, {
      method: 'PATCH',
      body: { is_published: next }
    })
    toast?.add({
      severity: 'success',
      summary: next ? 'Review published' : 'Review hidden',
      life: 2500
    })
  } catch (err) {
    review.is_published = previous
    toast?.add({ severity: 'error', summary: 'Failed to update review', life: 4000 })
  }
}

async function deleteReview(review: Review) {
  if (!confirm(`Delete review by ${review.name}? This cannot be undone.`)) return
  try {
    await $fetch(`/api/admin/reviews/${review.id}`, { method: 'DELETE' })
    reviews.value = reviews.value.filter((r) => r.id !== review.id)
    toast?.add({ severity: 'success', summary: 'Review deleted', life: 2500 })
  } catch (err) {
    toast?.add({ severity: 'error', summary: 'Failed to delete review', life: 4000 })
  }
}

async function logout() {
  try {
    await $fetch('/api/admin/logout', { method: 'POST' })
  } finally {
    await navigateTo('/admin/login')
  }
}

onMounted(() => {
  loadInvites()
  loadReviews()
})
</script>

<template>
  <main class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <header class="border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800">
      <div class="container mx-auto px-4 lg:px-20 py-4 flex items-center justify-between">
        <h1 class="text-xl font-bold text-gray-900 dark:text-white">Admin dashboard</h1>
        <ClientOnly>
          <Button
            severity="secondary"
            text
            icon="pi pi-sign-out"
            label="Sign out"
            @click="logout"
          />
        </ClientOnly>
      </div>
    </header>

    <ClientOnly>
      <Toast position="top-right" />

      <div class="container mx-auto px-4 lg:px-20 py-8">
        <TabView>
          <TabPanel header="Invites">
            <Card class="mb-6 shadow-lg">
              <template #title>
                <h2 class="text-lg font-semibold">Send a new review invite</h2>
              </template>
              <template #content>
                <form class="grid grid-cols-1 md:grid-cols-3 gap-4 items-end" @submit.prevent="createInvite">
                  <label class="flex flex-col gap-2 md:col-span-1">
                    <span class="text-sm font-medium text-gray-700 dark:text-gray-300">Customer name (optional)</span>
                    <InputText v-model="inviteName" :disabled="inviteSubmitting" placeholder="Jane Doe" class="w-full" />
                  </label>
                  <label class="flex flex-col gap-2 md:col-span-1">
                    <span class="text-sm font-medium text-gray-700 dark:text-gray-300">Email <span class="text-red-500">*</span></span>
                    <InputText
                      v-model="inviteEmail"
                      type="email"
                      required
                      :disabled="inviteSubmitting"
                      placeholder="jane@example.com"
                      class="w-full"
                    />
                  </label>
                  <Button
                    type="submit"
                    :loading="inviteSubmitting"
                    :disabled="inviteSubmitting || !inviteEmail"
                    label="Send invite"
                    icon="pi pi-send"
                  />
                </form>
                <p v-if="inviteError" role="alert" class="mt-3 text-sm text-red-600 dark:text-red-400">{{ inviteError }}</p>
              </template>
            </Card>

            <Card class="shadow-lg">
              <template #content>
                <DataTable
                  :value="invites"
                  :loading="invitesLoading"
                  data-key="id"
                  striped-rows
                  paginator
                  :rows="10"
                  removable-sort
                >
                  <Column field="email" header="Email" sortable />
                  <Column field="customer_name" header="Name">
                    <template #body="{ data }">{{ data.customer_name || '—' }}</template>
                  </Column>
                  <Column field="status" header="Status" sortable>
                    <template #body="{ data }">
                      <Tag :severity="statusSeverity(data.status)" :value="data.status" />
                    </template>
                  </Column>
                  <Column field="created_at" header="Sent" sortable>
                    <template #body="{ data }">{{ formatDate(data.created_at) }}</template>
                  </Column>
                  <Column field="expires_at" header="Expires" sortable>
                    <template #body="{ data }">{{ formatDate(data.expires_at) }}</template>
                  </Column>
                  <Column header="Actions">
                    <template #body="{ data }">
                      <Button
                        v-if="data.status !== 'submitted'"
                        size="small"
                        severity="secondary"
                        text
                        icon="pi pi-refresh"
                        label="Resend"
                        @click="resendInvite(data)"
                      />
                    </template>
                  </Column>
                  <template #empty>
                    <p class="text-center text-gray-500 py-6">No invites yet.</p>
                  </template>
                </DataTable>
              </template>
            </Card>
          </TabPanel>

          <TabPanel header="Reviews">
            <Card class="shadow-lg">
              <template #content>
                <DataTable
                  :value="reviews"
                  :loading="reviewsLoading"
                  data-key="id"
                  striped-rows
                  paginator
                  :rows="10"
                  removable-sort
                >
                  <Column field="name" header="Name" sortable />
                  <Column field="rating" header="Rating" sortable>
                    <template #body="{ data }">
                      <span class="text-yellow-500" :aria-label="`${data.rating} out of 5 stars`">
                        <i v-for="n in 5" :key="n" :class="n <= data.rating ? 'pi pi-star-fill' : 'pi pi-star'" class="text-sm" />
                      </span>
                    </template>
                  </Column>
                  <Column field="comment" header="Comment">
                    <template #body="{ data }">
                      <p class="max-w-md text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap break-words">{{ data.comment }}</p>
                    </template>
                  </Column>
                  <Column field="created_at" header="Submitted" sortable>
                    <template #body="{ data }">{{ formatDate(data.created_at) }}</template>
                  </Column>
                  <Column field="is_published" header="Published" sortable>
                    <template #body="{ data }">
                      <InputSwitch
                        :model-value="data.is_published"
                        :aria-label="`Toggle published state for review by ${data.name}`"
                        @update:model-value="(v: boolean) => togglePublished(data, v)"
                      />
                    </template>
                  </Column>
                  <Column header="Actions">
                    <template #body="{ data }">
                      <Button
                        size="small"
                        severity="danger"
                        text
                        icon="pi pi-trash"
                        aria-label="Delete review"
                        @click="deleteReview(data)"
                      />
                    </template>
                  </Column>
                  <template #empty>
                    <p class="text-center text-gray-500 py-6">No reviews yet.</p>
                  </template>
                </DataTable>
              </template>
            </Card>
          </TabPanel>
        </TabView>
      </div>
    </ClientOnly>
  </main>
</template>
