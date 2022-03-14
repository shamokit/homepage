import fs from 'fs'
import { join } from 'path'
import matter from 'gray-matter'
import { getTagBySlug } from './tags'
const POST_DIRECTORY = join(process.cwd(), 'src/contents/')
export function getPostDirectory() {
	return POST_DIRECTORY
}

export function getPostSlugs() {
	const fileList = fs.readdirSync(getPostDirectory())
	const result = fileList.filter((file) => {
		return file.includes('.mdx')
	})
	return result
}

import {TypePost, TypePostFieldKey} from '@/types/Post'
export function getPostBySlug(
	slug: string,
	fields: TypePostFieldKey[]
) {
	let activeFields = fields
	const fileSlug = slug.replace(/\.mdx$/, '')
	const fullPath = join(POST_DIRECTORY, `${fileSlug}.mdx`)
	const fileContents = fs.readFileSync(fullPath, 'utf8')
	const { data, content } = matter(fileContents)

	let item: TypePost = {
		slug: '',
		title: '',
		date: '',
		category: '',
		content: '',
		private: false,
	}

	activeFields.forEach((field) => {
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

export function getAllPosts(fields: TypePostFieldKey[], dirName?: string) {
	const slugs = getPostSlugs()
	let posts = slugs
		.map((slug) => getPostBySlug(slug, fields))
		.sort((post1, post2) => (post1['date']! > post2['date']! ? -1 : 1))
	if(dirName) {
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
	fields: TypePostFieldKey[] = [],
	tagSlug: string,
	category?: string,
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
	if(category) {
		posts = posts.filter((post) => {
			return post['category'] === category
		})
	}
	return posts
}

/**
 * タグに紐づく記事の件数も含めたタグデータを返す
 */
import {tags} from '@/lib/tags'
export function getTagsWithCount() {
	const slugs = getPostSlugs()
	const posts = slugs
		.map((slug) => getPostBySlug(slug, ['tags']))
		.filter((post) => {
			return post['private'] !== true
		})
	let tagDataWithCount = tags.map((tag) => {
		return { ...tag, count: 0 }
	})
	const postsLength = posts.length
	for (let postIndex = 0; postIndex < postsLength; postIndex++) {
		const post = posts[postIndex]
		if (!post) return
		const postTags = post['tags']
		if (Array.isArray(postTags)) {
			const postTagsLength = postTags.length
			for (let tagIndex = 0; tagIndex < postTagsLength; tagIndex++) {
				const loopTag = postTags[tagIndex]
				const target = tagDataWithCount.find((tag) => {
					return loopTag === tag.id
				})
				if (target) target.count += 1
			}
		} else {
			const target = tagDataWithCount.find((tag) => postTags === tag.id)
			if (target) target.count += 1
		}
	}
	tagDataWithCount = tagDataWithCount.filter((tag) => {
		return tag.count > 0
	})
	return tagDataWithCount
}
