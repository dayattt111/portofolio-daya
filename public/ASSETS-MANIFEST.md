# Assets Manifest

This file contains a comprehensive list of all assets available in the public directory.

## Last Updated
November 26, 2025

## Assets Overview

### 📁 Profile Images (`/images/profile/`)
| File | Description | Size | Format | Used In |
|------|-------------|------|--------|---------|
| `avatar.svg` | Profile avatar with retro 8-bit design | 400x400 | SVG | About.tsx |

### 📁 Project Screenshots (`/images/projects/`)
| File | Description | Colors | Used In |
|------|-------------|--------|---------|
| `project-1.svg` | E-Commerce Platform mockup | Cyan (#00ff88) | Projects.tsx (Project #1) |
| `project-2.svg` | Portfolio Website mockup | Pink (#ff006e) | Projects.tsx (Project #2) |
| `project-3.svg` | Admin Dashboard mockup | Purple (#b537f2) | Projects.tsx (Project #3) |
| `project-4.svg` | Mobile Application mockup | Yellow (#ffbe0b) | Projects.tsx (Project #4) |
| `project-5.svg` | IoT Automation mockup | Pink (#ff006e) | Projects.tsx (Project #5) |
| `project-6.svg` | Blog Platform mockup | Blue (#00a3ff) | Projects.tsx (Project #6) |

### 📁 Certificate Images (`/images/certificates/`)
| File | Description | Used In |
|------|-------------|---------|
| `cert-react.svg` | React Developer Certification badge | Certificates.tsx (placeholder) |

### 📁 Branding Assets
| File | Description | Size | Used In |
|------|-------------|------|---------|
| `logo.svg` | Main portfolio logo | 120x120 | Navbar.tsx |
| `favicon.svg` | Browser favicon | 32x32 | index.html |

## Integration Status

### ✅ Implemented
- [x] Profile avatar in About section
- [x] All 6 project images in Projects section
- [x] Logo in Navbar
- [x] Favicon in HTML head
- [x] Responsive image loading
- [x] Hover animations on images

### 📋 Pending / Optional
- [ ] Certificate images in Certificates carousel
- [ ] Community partner logos
- [ ] Additional project screenshots
- [ ] Hero section background patterns
- [ ] Loading placeholders/skeletons

## Usage Examples

### In React Components
```tsx
// Profile Image
<img src="/images/profile/avatar.svg" alt="Profile" />

// Project Image
<img src="/images/projects/project-1.svg" alt="E-Commerce Platform" />

// Logo
<img src="/images/logo.svg" alt="Logo" />

// Favicon (in index.html)
<link rel="icon" type="image/svg+xml" href="/favicon.svg" />
```

### Image Properties
All SVG images use the portfolio color palette:
- **Cyan**: `#00ff88` (Primary)
- **Pink**: `#ff006e` (Secondary)
- **Purple**: `#b537f2` (Tertiary)
- **Yellow**: `#ffbe0b` (Accent)
- **Blue**: `#00a3ff` (Info)
- **Dark**: `#050812` (Background)
- **Darker**: `#0a0e27` (Card Background)

## Performance Notes
- All images are SVG format for optimal scaling
- Average file size: ~1-2KB per image
- No external dependencies
- Lazy loading recommended for future images
- Consider image optimization for production

## Future Asset Requirements

### High Priority
1. Real project screenshots (replace placeholders)
2. Actual certificate images
3. Professional profile photo

### Medium Priority
1. Community partner logos
2. Skill icons
3. Social media icons
4. Background patterns

### Low Priority
1. Additional decorative elements
2. Loading animations
3. Error state images

## Notes
- All placeholder images use retro 8-bit aesthetic
- Images are responsive and work on all screen sizes
- SVG format ensures crisp rendering at any resolution
- Replace placeholder images with actual assets when available
