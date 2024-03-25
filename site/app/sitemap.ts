import { MetadataRoute } from 'next'
import { allData } from 'data'

export default function sitemap(): MetadataRoute.Sitemap {
  return allData.all().map((data) => ({
    url: `https://mdxts.dev/${data.pathname}`,
    lastModified: data.updatedAt,
  }))
}
