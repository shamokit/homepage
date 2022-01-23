import fs from 'fs'
import { join } from 'path'
import matter from 'gray-matter'
import { getTag, getTagBySlug } from './tags'

const directory = join(process.cwd(), 'src/')

export function getPostDirectory(dirName: string) {
  const postsDirectory = join(directory, `_${dirName}/`)
  return postsDirectory
}

export function getPostSlugs(dirName: string) {
  return fs.readdirSync(getPostDirectory(dirName))
}

export function getPostBySlug(slug: string, fields: string[] = [], dirName: string) {
  const realSlug = slug.replace(/\.mdx$/, '')
  const fullPath = join(getPostDirectory(dirName), `${realSlug}.mdx`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)

  type Items = {
    [key: string]: string | number | number[]
  }

  const items: Items = {}

  fields.forEach((field) => {
    if (field === 'slug') {
      items[field] = realSlug
    }
    if (field === 'content') {
      items[field] = content
    }

    if (typeof data[field] !== 'undefined') {
      items[field] = data[field]
    }
  })

  return items
}

export function getAllPosts(fields: string[] = [], dirName: string) {
  const slugs = getPostSlugs(dirName)
  const posts = slugs
    .map((slug) => getPostBySlug(slug, fields, dirName))
    .sort((post1, post2) => (post1['date']! > post2['date']! ? -1 : 1))
  return posts
}
export function getTagPosts(fields: string[] = [], dirName: string, tagSlug: string) {
  const slugs = getPostSlugs(dirName)
  const tag = getTagBySlug(tagSlug)
  const posts = slugs
    .map((slug) => getPostBySlug(slug, [...fields, 'tag'], dirName))
    .filter((post) => {
      const postTags = post['tags']
      if (postTags) {
        if (Array.isArray(postTags)) {
          return tag && postTags?.includes(tag.id)
        } else {
          return postTags === tag?.id
        }
      }
      return false
    })
    .sort((post1, post2) => (post1['date']! > post2['date']! ? -1 : 1))
  return posts
}
