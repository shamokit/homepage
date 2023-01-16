import type { Section } from './section'
export type Content = {
	fieldId: "content"
	content: string
}
export type Contents = {
	fieldId: "contents"
	body: Section[]
}
