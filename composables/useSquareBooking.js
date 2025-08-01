// Square Booking Composable
// Handles Square Appointments widget integration
import { ref, computed, nextTick } from 'vue'
import { useSiteConfig } from '~/composables/useSiteConfig.js'

export const useSquareBooking = () => {
  const config = useSiteConfig()
  const isScriptLoaded = ref(false)
  const isBookingModalOpen = ref(false)
  
  // Computed properties for Square configuration
  const squareConfig = computed(() => config.booking.square)
  const bookingUrl = computed(() => squareConfig.value.bookingUrl)
  const buttonStyle = computed(() => squareConfig.value.widget.buttonStyle)
  const buttonText = computed(() => squareConfig.value.widget.buttonText)
  
  // Check if Square script is loaded
  const checkSquareScript = () => {
    return typeof window !== 'undefined' && window.SquareWebPaymentsSDK !== undefined
  }
  
  // Load Square script dynamically if not already loaded
  const loadSquareScript = () => {
    return new Promise((resolve, reject) => {
      if (typeof window === 'undefined') {
        reject(new Error('Window object not available'))
        return
      }
      
      // Check if script is already loaded
      if (checkSquareScript()) {
        isScriptLoaded.value = true
        resolve(true)
        return
      }
      
      // Check if script tag already exists
      const existingScript = document.querySelector(`script[src="${squareConfig.value.scriptUrl}"]`)
      if (existingScript) {
        existingScript.onload = () => {
          isScriptLoaded.value = true
          resolve(true)
        }
        existingScript.onerror = () => reject(new Error('Failed to load Square script'))
        return
      }
      
      // Create and load script
      const script = document.createElement('script')
      script.src = squareConfig.value.scriptUrl
      script.defer = true
      script.onload = () => {
        isScriptLoaded.value = true
        resolve(true)
      }
      script.onerror = () => reject(new Error('Failed to load Square script'))
      
      document.head.appendChild(script)
    })
  }
  
  // Open Square booking widget
  const openBookingWidget = async () => {
    try {
      if (typeof window === 'undefined') {
        console.warn('Square booking not available on server side')
        return
      }
      
      // Use direct URL approach - more reliable than embedded widget
      window.open(bookingUrl.value, '_blank', 'noopener,noreferrer')
      
    } catch (error) {
      console.error('Error opening Square booking widget:', error)
      // Fallback to direct URL
      window.open(bookingUrl.value, '_blank', 'noopener,noreferrer')
    }
  }
  
  // Create a booking button element with Square styling
  const createBookingButton = (customText = null, customStyle = {}) => {
    const text = customText || buttonText.value
    const style = { ...buttonStyle.value, ...customStyle }
    
    return {
      text,
      style,
      onClick: openBookingWidget
    }
  }
  
  // Get booking button as HTML string (for v-html if needed)
  const getBookingButtonHtml = (customText = null, customClass = '') => {
    const text = customText || buttonText.value
    const styleString = Object.entries(buttonStyle.value)
      .map(([key, value]) => `${key.replace(/([A-Z])/g, '-$1').toLowerCase()}: ${value}`)
      .join('; ')
    
    return `<a href="${bookingUrl.value}" 
              target="_blank" 
              rel="noopener noreferrer"
              class="${customClass}"
              style="${styleString}"
              onclick="event.preventDefault(); window.open('${bookingUrl.value}', '_blank', 'noopener,noreferrer');">
              ${text}
            </a>`
  }
  
  // Initialize Square booking
  const initializeSquareBooking = async () => {
    if (typeof window === 'undefined') return
    
    try {
      await nextTick()
      await loadSquareScript()
    } catch (error) {
      console.warn('Square script failed to load, using fallback:', error)
      // Fallback is still available via direct URL
    }
  }
  
  // Don't auto-initialize on mount - only load when user wants to book
  
  return {
    // State
    isScriptLoaded,
    isBookingModalOpen,
    
    // Configuration
    squareConfig,
    bookingUrl,
    buttonStyle,
    buttonText,
    
    // Methods
    openBookingWidget,
    createBookingButton,
    getBookingButtonHtml,
    loadSquareScript,
    initializeSquareBooking,
    checkSquareScript
  }
}