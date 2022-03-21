import classNames from 'classnames'
const allowElem = ['h1', 'h2', 'h3', 'h4'] as const
type ListAllowElem = typeof allowElem[number]
type OwnProps<E extends ListAllowElem> = {
	className?: string
	as?: E
	text: React.ReactNode
	lead?: string | JSX.Element
}

type TypeProps<E extends ListAllowElem> = OwnProps<E> &
	Omit<React.ComponentProps<E>, keyof OwnProps<E>>
export const Head01 = <E extends ListAllowElem>({
	className,
	as,
	text,
	lead,
}: TypeProps<E>) => {
	const TagName = as || 'h2'
	return (
		<header className={classNames(['grid gap-4',className])}>
			<div
				className={classNames([
					'w-10 h-1',
					'gradation-r',
				])}
			></div>
			<TagName
				className={classNames([
					'inline-block',
					'gradation-text text-2xl md:text-3xl lg:text-4xl',
					'font-medium leading-tight font-code',
					'tracking-none',
				])}
			>
				{text}
			</TagName>
			{lead && lead}
		</header>
	)
}
