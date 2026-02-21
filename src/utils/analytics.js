/**
 * Google Analytics 4 (gtag) helpers for granular tracking.
 * No-ops when gtag is unavailable (e.g. ad blocker, tests).
 */

function gtagSafe(...args) {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag(...args)
  }
}

/**
 * Send a virtual page view for SPA route changes.
 * Call this whenever the route changes so GA4 gets per-page stats.
 *
 * @param {string} path - Full path (e.g. /blog, /blog/my-post)
 * @param {string} [title] - Optional page title (defaults to document.title)
 */
export function trackPageView(path, title) {
  gtagSafe('event', 'page_view', {
    page_path: path || window?.location?.pathname || '/',
    page_title: title || (typeof document !== 'undefined' ? document.title : ''),
  })
}

/**
 * Send a custom event to GA4 for reporting and audiences.
 *
 * @param {string} eventName - GA4 event name (e.g. 'outbound_click', 'blog_post_click')
 * @param {Record<string, string|number|boolean>} [params] - Event parameters (show in GA4 Events)
 */
export function trackEvent(eventName, params = {}) {
  gtagSafe('event', eventName, params)
}

/**
 * Track outbound / external link clicks (LinkedIn, GitHub, etc.).
 * Use in onClick for <a href="https://..."> that leave the site.
 *
 * @param {string} url - Destination URL
 * @param {string} [label] - Human label (e.g. 'LinkedIn', 'Resume PDF')
 */
export function trackOutboundClick(url, label = '') {
  trackEvent('outbound_click', {
    link_url: url,
    link_destination: label || url,
  })
}

/**
 * Track when a user clicks a blog post from the listing.
 *
 * @param {{ slug: string, title: string, category?: string }} post
 */
export function trackBlogPostClick({ slug, title, category }) {
  trackEvent('blog_post_click', {
    blog_slug: slug,
    blog_title: title,
    ...(category && { blog_category: category }),
  })
}

/**
 * Track when a single blog post page is viewed (optional; page_view also carries path).
 * Useful for reports filtered by event name.
 *
 * @param {{ slug: string, title: string, category?: string }} post
 */
export function trackBlogPostView({ slug, title, category }) {
  trackEvent('blog_post_view', {
    blog_slug: slug,
    blog_title: title,
    ...(category && { blog_category: category }),
  })
}
