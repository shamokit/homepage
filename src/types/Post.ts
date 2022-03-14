export type TypePost = {
	slug: string
	title: string
	description?: string
	date: string
	coverImage?: string
	ogImage?: {
		url?: string
	}
	tags?: number[]
	category: string
	content: string
	private: boolean
}
export type TypePostFieldKey = keyof TypePost
