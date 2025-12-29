import { MetadataRoute } from 'next'
 
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://happyboxlogistics.com',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
      alternates: {
        languages: {
          en: 'https://happyboxlogistics.com',
          ru: 'https://happyboxlogistics.com/ru',
        },
      },
    },
    {
      url: 'https://happyboxlogistics.com/ru',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
  ]
}
