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
