// Site Configuration
// Update these values to customize your website
export const siteConfig = {
  // Basic Site Information
  siteName: 'The Total Education Experience',
  siteAbbreviation: 'TTEE',
  tagline: 'BLS & ACLS Training',
  description: 'Professional BLS and ACLS training with on-location service. Expert nursing instruction for healthcare professionals and individuals.',

  // Contact Information
  contact: {
    phone: '(555) 123-4567',
    phoneLink: 'tel:+15551234567',
    email: 'info@blsaclstraining.com',
    emailLink: 'mailto:info@blsaclstraining.com'
  },

  // Business Address
  address: {
    street: '123 Healthcare Drive',
    city: 'Medical City',
    state: 'CA',
    zipCode: '90210',
    full: '123 Healthcare Drive, Medical City, CA 90210'
  },

  // Business Information
  business: {
    legalName: 'BLS & ACLS Training Services LLC',
    founded: '2020',
    license: 'CA-BLS-2024-001',
    certifications: ['American Heart Association Authorized Training Center']
  },

  // SEO & Meta Information
  seo: {
    title: 'BLS & ACLS Training - Professional Life-Saving Certification',
    keywords: 'BLS training, ACLS training, CPR certification, American Heart Association, mobile training, nursing instructor',
    author: 'The Total Education Experience',
    twitterHandle: '@TTETraining',
    facebookPage: 'TTETraining'
  },

  // Instructor Information
  instructor: {
    name: 'Nadine Henry-Thomas',
    credentials: 'DNP MSN-Ed CMSRN PCCN',
    title: 'Certified BLS & ACLS Instructor',
    fullTitle: 'Lead BLS & ACLS Instructor',
    experience: {
      nursing: '8+ years',
      training: '5+ years',
      specialties: ['Emergency Nursing', 'ICU Nursing', 'Critical Care']
    },
    // Note: instructor image is now referenced from assets.instructorImage for consistency
    bio: `I’m excited to have you here! As a dedicated healthcare professional and certified instructor, 
    I am committed to providing top-quality BLS (Basic Life Support) certification training for healthcare workers, 
    first responders, and anyone eager to learn life-saving skills.
    My mission is simple, empowering you with the knowledge and confidence to take action 
    in critical situations. I follow the latest American Heart Association guidelines, ensuring you receive 
    up-to-date, hands-on training that truly makes a difference.
    Let’s get started on this journey together!`
  },

  // Social Media Links
  social: {
    facebook: 'https://facebook.com/TTETraining',
    twitter: 'https://twitter.com/TTETraining',
    linkedin: 'https://linkedin.com/company/tte-training',
    instagram: 'https://instagram.com/ttetraining'
  },

  // Assets & Branding
  assets: {
    // Logo and Branding - Local images in /public/images/
    logo: '/images/logos/logo.png',
    logoAlt: 'The Total Education Experience Logo',
    footerLogo: '/images/logos/footer-logo.png', // Footer version (can be white/inverted)
    footerLogoAlt: 'The Total Education Experience Footer Logo',
    favicon: '/favicon.png',

    // Hero Section Images - Replace with your local images
    heroImage: '/images/hero/hero-background.jpg', // Add your hero image here
    heroImageAlt: 'Healthcare professional performing CPR training',
    // Fallback to Unsplash if local image not available
    heroImageFallback: 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',

    // Course Section Images - Replace with your local images
    blsCourseImage: '/images/courses/bls-course.jpg', // Add your BLS image here
    blsCourseImageAlt: 'BLS training session with medical professionals',
    blsCourseImageFallback: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',

    aclsCourseImage: '/images/courses/acls-course.jpg', // Add your ACLS image here
    aclsCourseImageAlt: 'ACLS training with healthcare team',
    aclsCourseImageFallback: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',

    // Instructor Section Images - Replace with your local images
    instructorImage: '/images/instructor/instructor-photo.jpg', // Add instructor photo here
    instructorImageAlt: 'Professional headshot of training instructor',
    instructorImageFallback: '#',

    // Benefits Section Images (optional background images for cards)
    benefitsImages: {
      expertInstructor: null, // Set to null for icon-only, or add image URL
      onLocationTraining: null,
      groupDiscounts: null,
      certifiedTraining: null
    },

    // Booking Section Images - Replace with your local images
    bookingBackgroundImage: '/images/gallery/group-training.jpg', // Add group training image here
    bookingBackgroundImageAlt: 'Healthcare professionals in group training session',
    bookingBackgroundImageFallback: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',

    // Gallery Images - Replace with your local training photos
    gallery: [
      {
        src: '/images/gallery/training-1.jpg', // Add your training photos here
        alt: 'BLS training session in progress',
        caption: 'Hands-on BLS Training',
        fallback: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80'
      },
      {
        src: '/images/gallery/training-2.jpg',
        alt: 'CPR training demonstration',
        caption: 'Professional CPR Instruction',
        fallback: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80'
      },
      {
        src: '/images/gallery/training-3.jpg',
        alt: 'ACLS team training',
        caption: 'Advanced Cardiac Life Support',
        fallback: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80'
      },
      {
        src: '/images/gallery/certification.jpg',
        alt: 'Group certification ceremony',
        caption: 'Certification Success',
        fallback: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80'
      }
    ],

    // Social Media Images - Use local images for better control
    socialMedia: {
      ogImage: '/images/logos/social-og.jpg', // Create a 1200x630 social media image
      ogImageAlt: 'The Total Education Experience - BLS & ACLS Training',
      ogImageFallback: 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80',
      twitterImage: '/images/logos/social-twitter.jpg', // Create a 1200x600 Twitter image  
      twitterImageAlt: 'Professional BLS & ACLS training services',
      twitterImageFallback: 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=600'
    },

    // Background patterns or textures (optional)
    backgrounds: {
      primaryPattern: null, // URL to background pattern
      secondaryPattern: null,
      testimonialsBg: null,
      footerBg: null
    }
  },

  // Business Hours
  hours: {
    monday: '9:00 AM - 6:00 PM',
    tuesday: '9:00 AM - 6:00 PM',
    wednesday: '9:00 AM - 6:00 PM',
    thursday: '9:00 AM - 6:00 PM',
    friday: '9:00 AM - 6:00 PM',
    saturday: '10:00 AM - 4:00 PM',
    sunday: 'By Appointment Only'
  },

  // Service Areas
  serviceAreas: [
    'The Total Educational Experience',
    '2927 Berwick Ave',
    'Baltimore MD, 21234'
  ],

  // Booking & External Services
  booking: {
    squareAppointmentsUrl: 'https://squareup.com/appointments/book/your-booking-url',
    emergencyPhone: '(443) 414-0807',
    preferredContactMethod: 'phone', // 'phone' or 'email'

    // Square Appointments Widget Configuration
    square: {
      // Widget script URL from Square
      scriptUrl: 'https://app.squareup.com/appointments/buyer/widget/4eb7ki9ztaybyc/L659EBYGC9J8M.js',
      // Direct booking URL for fallback
      bookingUrl: 'https://app.squareup.com/appointments/buyer/widget/4eb7ki9ztaybyc/L659EBYGC9J8M',
      // Widget configuration
      widget: {
        // Button styling to match your brand
        buttonStyle: {
          backgroundColor: '#10b981', // Your primary color
          color: 'white',
          height: '48px',
          textTransform: 'uppercase',
          fontFamily: "'Inter', 'helvetica neue', helvetica, arial, sans-serif",
          letterSpacing: '1px',
          lineHeight: '46px',
          padding: '0 28px',
          borderRadius: '8px',
          fontWeight: '600',
          fontSize: '14px',
          cursor: 'pointer',
          display: 'inline-block',
          textDecoration: 'none',
          border: 'none',
          transition: 'all 0.3s ease'
        },
        buttonText: 'Book an Appointment',
        // Hover state
        hoverStyle: {
          backgroundColor: '#059669', // Darker green on hover
          transform: 'translateY(-2px)',
          boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)'
        }
      }
    }
  },

  // Pricing Information
  mobileTraining: {
    available: true,
    minimumCharge: 10,
    notes: 'Mobile service includes a minimum $10 surcharge (may vary based on distance and location)'
  }
}

// Helper function to get formatted phone number
export const getFormattedPhone = () => {
  return siteConfig.contact.phone
}

// Helper function to get full business name with credentials
export const getInstructorFullName = () => {
  return `${siteConfig.instructor.name}, ${siteConfig.instructor.credentials}`
}

// Helper function to get complete address
export const getFullAddress = () => {
  return siteConfig.address.full
}

// Export default for easy importing
export default siteConfig