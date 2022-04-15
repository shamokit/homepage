import fs from 'fs'
import { join } from 'path'
import matter from 'gray-matter'
import { getTagBySlug } from '../utils/tags'
const POST_DIRECTORY = join(process.cwd(), 'src/contents/')

export function getPostSlugs() {
	const fileList = fs.readdirSync(POST_DIRECTORY)
	const result = fileList.filter((file) => {
		return file.includes('.mdx')
	})
	return result
}

import { TypePost, TypePostFieldKey } from '@/components/model/posts/Post'
import { TypeBook, TypeBookFieldKey } from '@/components/model/books/type'
export function getPostBySlug(
	slug: string,
	fields: (TypePostFieldKey | TypeBookFieldKey)[]
) {
	const fileSlug = slug.replace(/\.mdx$/, '')
	const fullPath = join(POST_DIRECTORY, `${fileSlug}.mdx`)
	const fileContents = fs.readFileSync(fullPath, 'utf8')
	const { data, content } = matter(fileContents)

	let item: TypePost | TypeBook = {
		slug: '',
		title: '',
		date: '',
		category: '',
		content: '',
		private: false,
	}

	fields.forEach((field) => {
		if (field === 'slug') {
			item[field] = fileSlug
		}
		if (field === 'content') {
			item[field] = content
		}

		if (typeof data[field] !== 'undefined') {
			// @ts-ignore
			item[field] = data[field]
		}
	})
	return item
}

export function getAllPosts(
	fields: (TypePostFieldKey | TypeBookFieldKey)[],
	dirName?: string
) {
	const slugs = getPostSlugs()
	let posts = slugs
		.map((slug) => getPostBySlug(slug, fields))
		.sort((post1, post2) => (post1['date']! > post2['date']! ? -1 : 1))
	if (dirName) {
		posts = posts.filter((post) => {
			return post['category'] === dirName
		})
	}
	posts = posts.filter((post) => {
		return post['private'] !== true
	})
	return posts
}

export function getTagPosts(
	fields: (TypePostFieldKey | TypeBookFieldKey)[] = [],
	tagSlug: string,
	category?: string
) {
	const slugs = getPostSlugs()
	const tag = getTagBySlug(tagSlug)
	let posts = slugs
		.map((slug) => getPostBySlug(slug, [...fields, 'tags']))
		.filter((post) => {
			const postTags = post['tags']
			if (!postTags) return false
			if (Array.isArray(postTags)) {
				return tag && postTags?.includes(tag.id)
			} else {
				return postTags === tag?.id
			}
		})
		.sort((post1, post2) => (post1['date']! > post2['date']! ? -1 : 1))
		.filter((post) => {
			return post['private'] !== true
		})
	if (category) {
		posts = posts.filter((post) => {
			return post['category'] === category
		})
	}
	return posts
}

import { BOOK_API_URL } from 'config/constants'
export const getBookData = async (isbn: string) => {
	return await fetch(`${BOOK_API_URL}${isbn}`)
}
