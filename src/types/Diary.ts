import { Content } from 'newt-client-js'
export type TypeDiary = Content & {
	title: string
	slug: string
	body: string
	day: Date
	tags: string[]
}
