# Website Changes Summary

This document outlines all the changes made to ensure AHA compliance and remove BLS group offerings.

## 1. Added AHA Disclaimer Text

**Required Text Added:**
> The American Heart Association strongly promotes knowledge and proficiency in all AHA courses and has developed instructional materials for this purpose. Use of these materials in an educational course does not represent course sponsorship by the AHA. Any fees charged for such a course, except for a portion of fees needed for AHA course materials, do not represent income to the AHA.

### Files Modified:

#### `components/BookingSection.vue` (Lines 74-85)
- Added blue-themed AHA disclaimer notice above contact information
- Positioned prominently in the booking section

#### `components/SquareBookingModal.vue` (Lines 68-79)
- Added yellow-themed AHA disclaimer notice within the booking modal
- Includes warning icon for visibility

#### `components/CoursesSection.vue` (Lines 241-254)
- Added gray-themed AHA disclaimer notice at bottom of course selection area
- Subtle styling to complement the design

## 2. Updated Instructor Qualifications

### File Modified: `config/site.js`

#### Lines 48-49:
- **Before:** `title: 'Certified BLS & ACLS Instructor'`
- **After:** `title: 'AHA Certified BLS & ACLS Instructor'`
- **Before:** `fullTitle: 'Lead BLS & ACLS Instructor'`
- **After:** `fullTitle: 'Lead AHA Certified BLS & ACLS Instructor'`

#### Line 62:
- **Before:** `'American Heart Association BLS & ACLS Instructor Certified'`
- **After:** `'AHA Certified BLS & ACLS Instructor'`

**Purpose:** Clarified instructor certification status to remove any doubt about AHA employee status.

## 3. Updated Mobile Training Wording (AHA Compliance)

### File Modified: `components/BenefitsSection.vue` (Line 26)
- **Before:** `"Convenient mobile training at your workplace, home, or preferred location."`
- **After:** `"Convenient mobile training - we can come to you at your workplace or preferred location."`

**Purpose:** Removed specific reference to private homes per AHA guidelines while maintaining mobile service messaging.

## 4. Removed BLS Group Offerings

### Files Modified:

#### `components/TrainingSection.vue`
- **Removed:** "BLS Group (6 people)" card (Lines 66-92)
- **Removed:** "BLS Large Group (10+)" card (Lines 94-120)
- **Updated:** Grid layout from 4 columns (`lg:grid-cols-4`) to 2 columns for BLS section
- **Retained:** BLS First Time and BLS Renewal individual courses only

#### `components/BenefitsSection.vue`
- **Removed:** "Group Discounts" benefit card (Lines 32-42)
- **Updated:** Grid layout from 4 columns (`lg:grid-cols-4`) to 3 columns (`md:grid-cols-3`)
- **Updated:** Container max width from `max-w-7xl` to `max-w-5xl`

#### `pages/index.vue` (Line 95)
- **Removed:** "Group Training" from footer services list
- **Retained:** BLS Training, ACLS Training, and Mobile Training links

## 5. Code Cleanup

### Files Modified:
- `components/BookingSection.vue`: Removed unused `isScriptLoaded` import
- `components/SquareBookingModal.vue`: Removed unused `ref` import

## Summary of Impact

- **AHA Compliance:** All class registration areas now display required AHA disclaimer text
- **Instructor Credentials:** Clear "AHA Certified" designation removes ambiguity about employment status
- **Mobile Training:** AHA-compliant wording that avoids advertising private home training
- **Service Offerings:** Streamlined to individual BLS/ACLS courses only, no group offerings
- **UI/UX:** Maintained visual balance and professional appearance after removing group components

## 6. Removed On-Location Training References

### Files Modified:

#### `config/site.js`
- **Line 8:** Changed `"on-location service"` to `"mobile service"` in site description
- **Line 145:** Changed `onLocationTraining: null` to `mobileTraining: null` in assets configuration

#### `components/HeroSection.vue` (Line 48)
- **Before:** `"On-location training"`
- **After:** `"Mobile training"`

#### `components/BenefitsSection.vue` (Line 24)
- **Before:** `"On-Location Training"`
- **After:** `"Mobile Training"`

#### `components/BookingSection.vue` (Line 12)
- **Before:** `"All training is offered on-location at your convenience."`
- **After:** `"All training is offered as mobile service at your convenience."`

**Purpose:** Removed specific "on-location" terminology while maintaining mobile service messaging for AHA compliance.

## Files Changed
1. `components/BookingSection.vue`
2. `components/SquareBookingModal.vue`
3. `components/CoursesSection.vue`
4. `config/site.js`
5. `components/BenefitsSection.vue`
6. `components/TrainingSection.vue`
7. `pages/index.vue`
8. `components/HeroSection.vue`