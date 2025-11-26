# Public Assets Directory

This folder contains all static assets for the portfolio website.

## Directory Structure

```
public/
├── images/
│   ├── profile/
│   │   └── avatar.svg          # Profile/avatar image
│   ├── projects/
│   │   ├── project-1.svg       # E-commerce App screenshot
│   │   ├── project-2.svg       # Portfolio Website screenshot
│   │   ├── project-3.svg       # Dashboard Admin screenshot
│   │   └── project-4.svg       # Mobile App screenshot
│   ├── certificates/
│   │   └── cert-react.svg      # React certification badge
│   └── logo.svg                # Main logo
├── favicon.svg                 # Browser favicon
└── README.md                   # This file
```

## Usage

Assets can be accessed in components using relative paths:

```tsx
// Example usage
<img src="/images/profile/avatar.svg" alt="Profile" />
<img src="/images/projects/project-1.svg" alt="Project" />
```

## Asset Guidelines

### Images
- **Format**: SVG preferred for icons and illustrations
- **Format**: JPG/PNG for photos and complex images
- **Naming**: Use kebab-case (e.g., `project-name.svg`)

### Projects Screenshots
- Recommended size: 800x600px
- Use retro 8-bit aesthetic colors
- Include project name in the design

### Certificates
- Recommended size: 600x400px
- Match the portfolio's color scheme (#00ff88, #ff006e, #b537f2, #ffbe0b)

### Profile Images
- Recommended size: 400x400px
- Square aspect ratio
- Retro pixel art style preferred

## Color Palette
- Primary (Cyan): `#00ff88`
- Secondary (Pink): `#ff006e`
- Tertiary (Purple): `#b537f2`
- Accent (Yellow): `#ffbe0b`
- Background Dark: `#050812`
- Background Darker: `#0a0e27`

## Adding New Assets

1. Place files in appropriate subdirectory
2. Use consistent naming convention
3. Update this README if adding new categories
4. Optimize images before adding (compress, resize)

## Notes

- All placeholder SVGs use the portfolio's retro theme
- Replace with actual images/screenshots when available
- Maintain aspect ratios for responsive design
