import { siteConfig } from '~/config/site.js'

/**
 * Composable for accessing site configuration
 * This provides a reactive way to access site settings throughout the app
 */
export const useSiteConfig = () => {
  return {
    // Site basic info
    siteName: siteConfig.siteName,
    siteAbbreviation: siteConfig.siteAbbreviation,
    tagline: siteConfig.tagline,
    description: siteConfig.description,
    
    // Contact information
    contact: siteConfig.contact,
    address: siteConfig.address,
    business: siteConfig.business,
    
    // SEO data
    seo: siteConfig.seo,
    
    // Instructor details
    instructor: siteConfig.instructor,
    instructors: siteConfig.instructors,
    
    // Social media
    social: siteConfig.social,
    
    // Assets and branding
    assets: siteConfig.assets,
    
    // Business operations
    hours: siteConfig.hours,
    serviceAreas: siteConfig.serviceAreas,
    booking: siteConfig.booking,
    mobileTraining: siteConfig.mobileTraining,
    
    // Utility functions
    getFormattedPhone: () => siteConfig.contact.phone,
    getPhoneLink: () => siteConfig.contact.phoneLink,
    getEmailLink: () => siteConfig.contact.emailLink,
    getInstructorFullName: () => `${siteConfig.instructor.name}, ${siteConfig.instructor.credentials}`,
    getFullAddress: () => siteConfig.address.full,
    
    // Image utility functions
    getHeroImage: () => ({ src: siteConfig.assets.heroImage, alt: siteConfig.assets.heroImageAlt }),
    getInstructorImage: () => ({ src: siteConfig.assets.instructorImage, alt: siteConfig.assets.instructorImageAlt }),
    getBLSCourseImage: () => ({ src: siteConfig.assets.blsCourseImage, alt: siteConfig.assets.blsCourseImageAlt }),
    getACLSCourseImage: () => ({ src: siteConfig.assets.aclsCourseImage, alt: siteConfig.assets.aclsCourseImageAlt }),
    getBookingBackgroundImage: () => ({ src: siteConfig.assets.bookingBackgroundImage, alt: siteConfig.assets.bookingBackgroundImageAlt }),
    getFooterLogo: () => ({ src: siteConfig.assets.footerLogo, alt: siteConfig.assets.footerLogoAlt }),
    getGalleryImages: () => siteConfig.assets.gallery,
    getSocialMediaImages: () => siteConfig.assets.socialMedia,
    
    // Navigation items (can be customized here)
    getNavItems: () => [
      { id: 'hero', label: 'Home', icon: 'pi pi-home' },
      { id: 'courses', label: 'Courses', icon: 'pi pi-book' },
      { id: 'instructor', label: 'Instructor', icon: 'pi pi-user' },
      { id: 'pricing', label: 'Pricing', icon: 'pi pi-tags' }
    ]
  }
}