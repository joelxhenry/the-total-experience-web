# BLS & ACLS Training Website

A static marketing website built with Nuxt 3 for a nurse offering BLS and ACLS certification training services.

## 🚀 Tech Stack

- **Nuxt 3** - Vue.js framework with static site generation
- **TailwindCSS** - Utility-first CSS framework  
- **PrimeVue** - Vue UI component library
- **Square Appointments** - Booking integration

## 📦 Installation

1. Install dependencies:
```bash
npm install
```

2. Start development server:
```bash
npm run dev
```

3. Build for production:
```bash
npm run build
```

4. Generate static site:
```bash
npm run generate
```

5. Preview static site:
```bash
npm run preview
```

## 🎯 Features

### Page Sections
- **Hero Section** - Eye-catching intro with CTA button
- **BLS/ACLS Explanation** - Clear descriptions of both course types
- **Benefits** - 4 key benefits using PrimeVue Cards
- **Pricing Table** - Complete pricing structure with PrimeVue DataTable
- **Mobile Training Notice** - On-location service information
- **Booking Section** - Square Appointments integration
- **Contact Information** - Phone and email details

### Pricing Structure
- BLS First Time: $70
- BLS Renewal: $60
- Group (6 people): $50/person
- Large Groups (10+): $45/person
- ACLS First Time: $160
- ACLS Renewal: $140
- BLS + ACLS Renewal: $210
- BLS + ACLS First Time: $245

## 🎨 Design Features

- **Mobile-first responsive design**
- **Professional color scheme** with primary green theme
- **PrimeVue components only** for all UI elements
- **Smooth scrolling navigation**
- **Hover effects and transitions**

## ⚙️ Configuration

### Square Appointments Integration

To connect your actual Square Appointments booking:

1. Replace the placeholder URL in `pages/index.vue`:
```javascript
const openSquareBooking = () => {
  window.open('https://squareup.com/appointments/book/YOUR-ACTUAL-BOOKING-URL', '_blank')
}
```

### Contact Information

Update contact details in `pages/index.vue`:
```javascript
// Update phone and email in the contact section
Phone: (555) 123-4567
Email: info@blsaclstraining.com
```

## 🌐 Deployment

The site is configured for static generation. After running `npm run generate`, deploy the `dist/` folder to any static hosting service:

- Netlify
- Vercel  
- GitHub Pages
- AWS S3
- Any CDN or web server

## 📱 Mobile Training

The site highlights that training is offered on-location with a minimum $10 surcharge that may vary based on distance.

## 🎓 Certifications

All training provides official American Heart Association certification upon successful completion.