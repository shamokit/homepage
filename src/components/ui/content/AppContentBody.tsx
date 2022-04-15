import style from '@/styles/markdown-styles.module.css'
import 'zenn-content-css'
import classNames from 'classnames'
type TypeProps = {
	content: string
	className?: string
}

export const PostBody = ({ content, className }: TypeProps) => {
	return (
		<div
			className={classNames('znc', style['znc'], { className: className })}
			dangerouslySetInnerHTML={{ __html: content }}
		/>
	)
}
