import classNames from 'classnames'

import { AppGradationLine } from '@/components/ui/line/AppGradationLine'

export type TypeAppHead01AllowElements = 'h1' | 'h2' | 'h3' | 'h4'
export type TypeAppHead01OwnProps<E extends TypeAppHead01AllowElements> = {
	as?: E
	text: React.ReactNode
	lead?: string | JSX.Element
}
export type TypeAppHead01Props<E extends TypeAppHead01AllowElements> =
	TypeAppHead01OwnProps<E> &
		Omit<React.ComponentProps<E>, keyof TypeAppHead01OwnProps<E>>

export const AppHead01 = <E extends TypeAppHead01AllowElements>({
	as,
	text,
	lead,
}: TypeAppHead01Props<E>) => {
	const TagName = as || 'h2'
	return (
		<header className={classNames(['grid gap-4 tracking-widest'])}>
			<AppGradationLine />
			<TagName
				className={classNames([
					'inline-block',
					'gradation-text text-2xl md:text-3xl lg:text-4xl',
				])}
			>
				{text}
			</TagName>
			{lead && lead}
		</header>
	)
}
