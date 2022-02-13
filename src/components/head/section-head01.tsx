import classNames from 'classnames'
type Props = {
	className?: string
	as?: React.ElementType
	text: string
}
export const Head01 = ({ className, as: TagName = 'h2', text }: Props) => {
	return (
		<header>
			<div className="w-10 mb-3 md:mb-4 border-b-4 border-main"></div>
			<TagName
				className={classNames(
					'text-xl md:text-2xl lg:text-3xl font-bold leading-tight',
					{ [`${className}`]: className }
				)}
			>
				{text}
			</TagName>
		</header>
	)
}
