import 'zenn-content-css'
import style from '@/styles/markdown-styles.module.css'
import classNames from 'classnames'
type TypeProps = {
	content: string
	className?: string
}

export const PostBody = ({ content, className }: TypeProps) => {
	return (
		<div
			className={classNames(style['znc'], 'znc', { className: className })}
			dangerouslySetInnerHTML={{ __html: content }}
		/>
	)
}
