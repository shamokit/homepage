export const tags = [
  {
    id: 0,
    name: 'React.js',
    slug: 'react'
  },
  {
    id: 1,
    name: 'Next.js',
    slug: 'next-js'
  },
  {
    id: 2,
    name: 'API',
    slug: 'api'
  }
] as const

/**
 * タグidからタグのオブジェクトを返す
 */
export const getTag = (id: number) => {
  return tags.find((tag) => {
    return tag.id === id
  })
}

/**
 * タグslugからタグのオブジェクトを返す
 */
export const getTagBySlug = (slug: string) => {
  return tags.find((tag) => {
    return tag.slug === slug
  })
}
