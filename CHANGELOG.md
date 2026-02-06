# Changelog

## 2026-01-13 - Major Polish Update

### New Arguments Added (5)

- Gun control and safety
- Abortion rights and bodily autonomy
- Drug legalization harm reduction
- Cryptocurrency regulation vs innovation
- School choice and voucher programs

**Total Arguments: 26** (Average quality: 88.1/100)

### Typography & Spacing

- Switched to Inter font (from Plus Jakarta Sans) for better readability
- Updated to JetBrains Mono (from Fira Code) for code elements
- Improved letter-spacing and line-height across all text
- Increased padding and margins throughout for better breathing room
- Better responsive text scaling (mobile to desktop)

### Mobile Responsiveness

- All buttons now meet 44px minimum touch target size
- Improved responsive typography with sm/md breakpoints
- Better input field sizing on mobile devices
- Enhanced suggestion pill sizing and spacing
- Optimized grid layouts for smaller screens

### UX Improvements

- **Conversation persistence**: Conversations saved to localStorage (24hr expiry)
- **Error boundary**: Graceful error handling with recovery UI
- **Loading states**: Added loading.tsx with spinner
- **404 page**: Custom not-found page
- **Smooth scrolling**: Enabled smooth scroll behavior
- **Focus indicators**: Better keyboard navigation with visible focus rings
- **Accessibility**: Added comprehensive ARIA labels and roles throughout

### Performance & Security

- Enabled SWC minification
- Image optimization configuration (AVIF, WebP)
- Security headers (X-Frame-Options, CSO, etc.)
- CSS optimization enabled
- Compressed responses

### Error Handling

- Retry functionality on API errors
- Better error messages with user guidance
- Fallback UI for React errors
- Automatic conversation recovery

### Code Quality

- All TypeScript errors resolved
- ESLint warnings fixed
- Consistent code formatting
- Type safety throughout

### Build Status

✅ All files building successfully
✅ No compilation errors
✅ All 26 arguments indexed to Algolia
