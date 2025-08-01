# Images Directory

This directory contains all the local images used throughout the website. Place your images in the appropriate subdirectories:

## Directory Structure

### `/logos/`
- `logo.png` - Main company logo (used in navigation)
- `favicon.ico` - Website favicon
- `logo-white.png` - White version of logo (if needed)

### `/hero/`
- `hero-background.jpg` - Main hero section background image
- `cpr-training.jpg` - CPR training images for hero section

### `/courses/`
- `bls-course.jpg` - BLS course representative image
- `acls-course.jpg` - ACLS course representative image
- `training-session.jpg` - General training session images

### `/instructor/`
- `instructor-photo.jpg` - Professional headshot of the instructor
- `instructor-teaching.jpg` - Action shots of instructor teaching

### `/gallery/`
- `training-1.jpg` - Training session photos
- `training-2.jpg` - Student certification photos
- `equipment.jpg` - Training equipment photos
- `group-training.jpg` - Group training sessions

## Image Guidelines

### File Formats
- **Photos**: Use `.jpg` or `.webp` for photographs
- **Logos/Graphics**: Use `.png` for graphics with transparency
- **Icons**: Use `.svg` when possible for scalability

### Size Recommendations
- **Logo**: 200x200px minimum, transparent background
- **Hero Images**: 1920x1080px or larger
- **Course Images**: 800x600px minimum
- **Instructor Photos**: 400x400px minimum for headshots
- **Gallery Images**: 800x600px minimum

### Optimization
- Compress images to reduce file size while maintaining quality
- Use tools like TinyPNG or ImageOptim
- Consider using `.webp` format for better compression

## Usage in Code

Images are referenced from the site configuration file (`/config/site.js`):

```javascript
// Example usage
assets: {
  logo: '/images/logos/logo.png',
  heroImage: '/images/hero/hero-background.jpg',
  instructorImage: '/images/instructor/instructor-photo.jpg'
}
```

Images in the `/public` directory are served statically and can be referenced with paths starting from `/images/...`.