import type { MetadataRoute } from 'next'
 
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: 'Googlebot',
        allow: ['/'],
        disallow: ['/about/'],
      },
      {
        userAgent: ['Applebot', 'Bingbot'],
        disallow: ['/'],
      },
      {
        userAgent: '*',
        disallow: ['/'],
      }
    ],
    sitemap: '',
  }
}