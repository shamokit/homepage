import fs from 'fs'
import { join } from 'path'
import matter from 'gray-matter'
import { getTagBySlug } from './tags'

const directory = join(process.cwd(), 'src/')

export function getPostDirectory(dirName: string | string[]) {
	const postsDirectory = join(directory, `_${dirName}/`)
	return postsDirectory
}

export function getPostSlugs(dirName: string | string[]) {
	return fs.readdirSync(getPostDirectory(dirName))
}

export function getPostBySlug(
	slug: string,
	fields: string[] = ['private'],
	dirName: string | string[]
) {
	let activeFields = [...fields, 'private']
	const realSlug = slug.replace(/\.mdx$/, '')
	const fullPath = join(getPostDirectory(dirName), `${realSlug}.mdx`)
	const fileContents = fs.readFileSync(fullPath, 'utf8')
	const { data, content } = matter(fileContents)

	type Item = {
		[key: string]: string | number | number[] | boolean
	}

	let item: Item = {}

	activeFields.forEach((field) => {
		if (field === 'slug') {
			item[field] = realSlug
		}
		if (field === 'content') {
			item[field] = content
		}

		if (typeof data[field] !== 'undefined') {
			item[field] = data[field]
		}
	})

	return item
}

export function getAllPosts(fields: string[] = [], dirName: string | string[]) {
	const slugs = getPostSlugs(dirName)
	let posts = slugs
		.map((slug) => getPostBySlug(slug, fields, dirName))
		.sort((post1, post2) => (post1['date']! > post2['date']! ? -1 : 1))
	posts = posts.filter((post) => {
		return post['private'] !== true
	})
	return posts
}
export function getTagPosts(
	fields: string[] = [],
	dirName: string,
	tagSlug: string
) {
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
