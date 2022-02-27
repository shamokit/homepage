import classNames from 'classnames'
import { AppArrow01 } from '@/components/ico/arrow01'
import Link from 'next/link'
type TypeProps = {
	className?: string
	href: string
	text: string
}
export const Btn01 = ({ className, href, text }: TypeProps) => {
	return (
		<Link href={href}>
			<a
				className={classNames([
					className,
					'group relative overflow-hidden',
					'flex items-center',
					'max-w-xs',
					'py-4 px-6',
					'rounded-full',
					'font-code leading-normal text-center',
					'transition-colors ease-out',
					'text-white',
					'gradation-r',
				])}
			>
				<div className="absolute inset-0 bg-base-color opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>
				<span className="relative">{text}</span>
				<AppArrow01 className="absolute top-1/2 -translate-y-1/2 right-5" />
			</a>
		</Link>
	)
}
