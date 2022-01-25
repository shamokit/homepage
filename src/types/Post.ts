export type TypePost = {
  slug: string
  title: string
  description?: string
  date: string
  coverImage: string
  ogImage: {
    url: string
  }
  tags?: number[]
  content: string
}
