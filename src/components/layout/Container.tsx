import { ReactNode } from 'react'

type Props = {
	children?: ReactNode
	className?: string
}

const Container = ({ children, className }: Props) => {
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

export default Container
