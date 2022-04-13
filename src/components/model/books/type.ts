export type TypeBook = {
	slug: string
	title: string
	description?: string
	date: string
	ogImage?: {
		url?: string
	}
	tags?: number[]
	category: string
	content: string
	private: boolean
	isbn?: string
	thumbnail?: string
}
export type TypeBookFieldKey = keyof TypeBook
