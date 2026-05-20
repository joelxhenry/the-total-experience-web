<script setup lang="ts">
definePageMeta({ layout: false })
useSeoMeta({ title: 'Admin login — The Total Experience', robots: 'noindex,nofollow' })

const password = ref('')
const submitting = ref(false)
const errorMsg = ref<string | null>(null)

async function submit() {
  if (submitting.value) return
  errorMsg.value = null
  submitting.value = true
  try {
    await $fetch('/api/admin/login', {
      method: 'POST',
      body: { password: password.value }
    })
    await navigateTo('/admin')
  } catch (err: unknown) {
    const e = err as { statusCode?: number; data?: { statusMessage?: string } }
    errorMsg.value = e?.statusCode === 401 ? 'Incorrect password.' : 'Login failed. Please try again.'
  } finally {
    submitting.value = false
  }
}
</script>

<template>
  <main class="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 px-4">
    <ClientOnly>
      <Card class="w-full max-w-md shadow-xl">
        <template #title>
          <h1 class="text-2xl font-bold text-gray-900 dark:text-white">Admin sign in</h1>
        </template>
        <template #subtitle>
          <p class="text-sm text-gray-600 dark:text-gray-400">Enter the admin password to manage invites and reviews.</p>
        </template>
        <template #content>
          <form class="flex flex-col gap-4" @submit.prevent="submit">
            <label class="flex flex-col gap-2">
              <span class="text-sm font-medium text-gray-700 dark:text-gray-300">Password</span>
              <InputText
                v-model="password"
                type="password"
                autocomplete="current-password"
                required
                :disabled="submitting"
                class="w-full"
              />
            </label>

            <p
              v-if="errorMsg"
              role="alert"
              class="text-sm text-red-600 dark:text-red-400"
            >
              {{ errorMsg }}
            </p>

            <Button
              type="submit"
              :loading="submitting"
              :disabled="submitting || !password"
              label="Sign in"
              icon="pi pi-sign-in"
              class="w-full"
            />
          </form>
        </template>
      </Card>
    </ClientOnly>
  </main>
</template>
