import classNames from 'classnames'
const allowElem = ['h2', 'h3', 'h4'] as const
type ListAllowElem = typeof allowElem[number]
type OwnProps<E extends ListAllowElem> = {
	className?: string
	as?: E
	text: React.ReactNode
}

type TypeProps<E extends ListAllowElem> = OwnProps<E> &
	Omit<React.ComponentProps<E>, keyof OwnProps<E>>
export const AppHead02 = <E extends ListAllowElem>({
	className,
	as,
	text,
}: TypeProps<E>) => {
	const TagName = as || 'h3'
	return (
		<TagName
			className={classNames([
				'pl-2 md:pl-4 border-l-4 border-accent',
				className,
			])}
		>
			{text}
		</TagName>
	)
}
