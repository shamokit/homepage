type PropTypes = {
	title: string
	className?: string
}
import classnames from 'classnames'
export const PostTitle = ({ title, className }: PropTypes) => {
	return (
		<h1
			className={classnames(
				'font-bold text-2xl md:text-3xl lg:text-4xl leading-normal',
				className
			)}
		>
			{title}
		</h1>
	)
}
