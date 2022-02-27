import markdownToHtml from 'zenn-markdown-html'

export default async function mdToHtml(markdown: string) {
	const result = await markdownToHtml(markdown)
	return result.toString()
}
