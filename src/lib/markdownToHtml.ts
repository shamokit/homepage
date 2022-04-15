import markdownToHtml from 'zenn-markdown-html'

export default function mdToHtml(markdown: string) {
	const result = markdownToHtml(markdown)
	return result.toString()
}
