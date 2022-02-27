import { ReactNode } from 'react'

type TypeProps = {
	children?: ReactNode
	className?: string
}

export const Container = ({ children, className }: TypeProps) => {
	return (
		<div
			className={`container mx-auto px-4 md:px-6 lg:px-8 ${
				className ? className : ''
			}`}
		>
			{children}
		</div>
	)
}
