type PropTypes = {
	title: string
	className?: string
}
import classnames from 'classnames'
export const PostTitle = ({ title, className }: PropTypes) => {
	return (
		<h1
			className={classnames(
				'text-2xl md:text-3xl lg:text-4xl font-medium leading-normal tracking-wide',
				className
			)}
		>
			{title}
		</h1>
	)
}
