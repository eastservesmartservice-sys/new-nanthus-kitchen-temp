# Legacy WordPress URL Handling & SEO Optimization

This document explains how the application handles legacy WordPress URLs and maintains SEO value through proper 301 redirects.

## Overview

When migrating from WordPress to a single-page React application, it's crucial to maintain SEO rankings by properly redirecting old URLs. This implementation uses multiple layers to ensure compatibility across different hosting environments.

## Architecture

### 1. Server-Side Redirects (Vercel)

**File:** `vercel.json`

```json
{
  "redirects": [
    {
      "source": "/contact-us/:path*",
      "destination": "/#contact",
      "permanent": true
    },
    {
      "source": "/our-menu/:path*",
      "destination": "/#menu",
      "permanent": true
    },
    {
      "source": "/wp-content/themes/maxron-tech/assets/img/web-logo.png",
      "destination": "/new_nanthus_kitchen_logo.png",
      "permanent": true
    }
  ]
}
```

**How it works:**
- `permanent: true` sets HTTP 301 status code
- Preserves SEO value by telling search engines the content moved permanently
- Works at the CDN edge for maximum performance
- Supports trailing slashes and any sub-paths

### 2. Apache Server Redirects

**File:** `public/.htaccess`

For deployments on Apache servers (cPanel, traditional hosting), the `.htaccess` file handles:
- 301 redirects for legacy URLs
- SPA routing fallback
- Security headers
- Asset caching

### 3. Client-Side Navigation

**File:** `src/utils/legacyUrlHandler.ts`

Handles in-app navigation when users land on legacy URLs:

```typescript
// URL Mappings
{ legacyPath: '/contact-us/', sectionId: 'contact' }
{ legacyPath: '/our-menu/', sectionId: 'menu' }
```

**Functions:**
- `initializeLegacyUrlHandlers()` - Main entry point
- `handleLegacyUrl()` - Maps URLs to section IDs
- `scrollToSection()` - Smooth scrolls to sections
- `handleLegacyAssets()` - Redirects asset URLs

## URL Mappings

| Legacy WordPress URL | New Section | HTTP Status |
|---------------------|-------------|-------------|
| `/contact-us/` | `/#contact` | 301 |
| `/our-menu/` | `/#menu` | 301 |
| `/wp-content/themes/.../web-logo.png` | `/new_nanthus_kitchen_logo.png` | 301 |

## Section IDs

The single-page app uses these section IDs:
- `hero` - Homepage/Landing
- `menu` - Menu section
- `special` - Specials section
- `take-away` - Order/Takeaway section
- `catering` - Catering section
- `contact` - Contact section

## How It Works

### 1. User visits `/contact-us/`

1. **Vercel Edge:**
   - Detects the URL matches redirect rule
   - Returns HTTP 301 redirect to `/#contact`
   - Search engines update their index

2. **Browser:**
   - Loads the SPA at `/#contact`
   - App initializes and runs `initializeLegacyUrlHandlers()`
   - Detects hash in URL
   - Smooth scrolls to contact section
   - Updates URL to clean hash format

3. **Result:**
   - User sees the contact section
   - URL is clean: `https://newnanthuskitchen.com/#contact`
   - SEO value preserved via 301

### 2. User visits old logo URL

1. **Vercel Edge:**
   - Matches redirect rule for old asset path
   - Returns HTTP 301 to `/new_nanthus_kitchen_logo.png`

2. **Browser:**
   - Loads the new logo directly
   - No JavaScript needed

3. **Result:**
   - Logo displays correctly
   - Old links work
   - SEO signals maintained

## SEO Benefits

### 1. HTTP 301 Status Code
- Tells search engines the page moved permanently
- Transfers ~90-99% of link equity (PageRank)
- Updates search engine indexes automatically

### 2. Hash-based Navigation
- Allows sections to be bookmarked
- Enables direct linking to specific content
- Compatible with sitemap.xml

### 3. Smooth User Experience
- No broken links
- Seamless navigation
- Fast client-side routing

## Testing

### Test Legacy URLs

```bash
# Test contact redirect
curl -I https://newnanthuskitchen.com/contact-us/

# Should return:
# HTTP/1.1 301 Moved Permanently
# Location: /#contact

# Test menu redirect
curl -I https://newnanthuskitchen.com/our-menu/

# Should return:
# HTTP/1.1 301 Moved Permanently
# Location: /#menu

# Test logo redirect
curl -I https://newnanthuskitchen.com/wp-content/themes/maxron-tech/assets/img/web-logo.png

# Should return:
# HTTP/1.1 301 Moved Permanently
# Location: /new_nanthus_kitchen_logo.png
```

### Manual Testing

1. Visit: `https://newnanthuskitchen.com/contact-us/`
   - Should redirect to contact section
   - URL should show `/#contact`

2. Visit: `https://newnanthuskitchen.com/our-menu/`
   - Should redirect to menu section
   - URL should show `/#menu`

3. Check browser console
   - No errors should appear
   - Smooth scroll should work

## Search Engine Optimization

### Google Search Console

1. **Submit old URLs for recrawl**
   - Google will discover the 301 redirects
   - Update index with new URLs
   - Transfer ranking signals

2. **Monitor Coverage Report**
   - Old URLs will show as "Redirected"
   - New URLs will show as "Indexed"

### Sitemap

The `sitemap.xml` includes hash URLs:
```xml
<url>
  <loc>https://newnanthuskitchen.com/#menu</loc>
  <priority>0.9</priority>
</url>
<url>
  <loc>https://newnanthuskitchen.com/#contact</loc>
  <priority>0.7</priority>
</url>
```

## Browser Support

- ✅ All modern browsers (Chrome, Firefox, Safari, Edge)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)
- ✅ Graceful degradation for older browsers

## Performance

- **Server-side redirects:** ~0ms (edge network)
- **Client-side scroll:** ~100ms delay for smooth animation
- **No additional bundle size:** Utility functions are lightweight

## Maintenance

### Adding New Redirects

1. **Update `vercel.json`:**
```json
{
  "source": "/old-page/",
  "destination": "/#section",
  "permanent": true
}
```

2. **Update `legacyUrlHandler.ts`:**
```typescript
{ legacyPath: '/old-page/', sectionId: 'section' }
```

3. **Update `.htaccess` (if using Apache):**
```apache
RewriteRule ^old-page/?$ /#section [R=301,L,NE]
```

### Removing Old Redirects

After 1-2 years, when old URLs are no longer indexed:
- Remove from `vercel.json`
- Remove from `.htaccess`
- Clean up `legacyUrlHandler.ts`

## Best Practices

1. **Always use 301 (permanent) redirects** for moved content
2. **Keep redirects for at least 1 year** to allow search engines to update
3. **Monitor 404 errors** in analytics to catch missed URLs
4. **Update external backlinks** when possible
5. **Test redirects** after every deployment

## Resources

- [Google: 301 Redirects](https://developers.google.com/search/docs/crawling-indexing/301-redirects)
- [Vercel Redirects Documentation](https://vercel.com/docs/edge-network/redirects)
- [Apache mod_rewrite](https://httpd.apache.org/docs/current/mod/mod_rewrite.html)

## Support

For issues with redirects:
1. Check browser network tab for HTTP status codes
2. Verify section IDs match in components
3. Clear CDN cache after configuration changes
4. Test in incognito/private browsing mode
