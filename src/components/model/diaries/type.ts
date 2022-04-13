import { Content } from 'newt-client-js'
export type TypeDiary = Content & {
	title: string
	slug: string
	body: string
	date: Date | string
	content: string
}
