import { getPostSlugs, getPostBySlug } from '@/lib/api'
import { TagType } from '@/components/model/tags/Tag'
export const tags = [
	{
		id: 0,
		name: 'React.js',
		slug: 'react',
	},
	{
		id: 1,
		name: 'Next.js',
		slug: 'next-js',
	},
	{
		id: 2,
		name: 'API',
		slug: 'api',
	},
	{
		id: 3,
		name: 'Vue.js',
		slug: 'vue',
	},
	{
		id: 4,
		name: 'Nuxt.js',
		slug: 'nuxt-js',
	},
	{
		id: 5,
		name: 'Svelte',
		slug: 'svelte',
	},
	{
		id: 6,
		name: 'SvelteKit',
		slug: 'svelte-kit',
	},
	{
		id: 7,
		name: '途中',
		slug: 'wip',
	},
	{
		id: 8,
		name: 'CircleCI',
		slug: 'circle-ci',
	},
	{
		id: 9,
		name: 'CI/CD',
		slug: 'ci-cd',
	},
	{
		id: 10,
		name: 'デザイン',
		slug: 'design',
	},
	{
		id: 11,
		name: 'TypeScript',
		slug: 'typescript',
	},
	{
		id: 12,
		name: 'WebGL',
		slug: 'webgl',
	},
	{
		id: 13,
		name: '数学',
		slug: 'math',
	},
	{
		id: 14,
		name: 'Laravel',
		slug: 'laravel',
	},
	{
		id: 15,
		name: 'JavaScript',
		slug: 'javascript',
	},
	{
		id: 16,
		name: 'microCMS',
		slug: 'microcms',
	},
	{
		id: 17,
		name: 'CSS',
		slug: 'css',
	},
	{
		id: 18,
		name: 'まだ読んでない',
		slug: 'unread',
	},
	{
		id: 19,
		name: '検証ツール',
		slug: 'devtools',
	},
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

/**
 * タグに紐づく記事の件数も含めたタグデータを返す
 */
import { TypePost } from '@/components/model/posts/Post'
export function getTagsWithCount(posts: TypePost[], category: string) {
	let tagDataWithCount = tags.map((tag) => {
		return { ...tag, count: 0 }
	})
	const postsLength = posts.length
	for (let postIndex = 0; postIndex < postsLength; postIndex++) {
		const post = posts[postIndex]
		if (!post) return
		const postTags = post['tags']
		const postCategory = post['category']
		if (postCategory && postCategory !== category) continue
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
