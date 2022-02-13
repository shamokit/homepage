import classNames from 'classnames'
import { AppArrow01 } from '@/components/ico/arrow01'
import Link from 'next/link'
type Props = {
	className?: string
	href: string
	text: string
}
export const Btn01 = ({ className, href, text }: Props) => {
	return (
		<Link href={href}>
			<a
				className={classNames(
					'relative flex items-center max-w-xs pt-2 pb-2.5 px-4 rounded leading-normal text-center border-2 border-base-color bg-base-color text-white transition-colors ease-out hover:bg-white hover:text-base-color',
					{ [`${className}`]: className }
				)}
			>
				{text}
				<AppArrow01 className="absolute top-1/2 -translate-y-1/2 right-2" />
			</a>
		</Link>
	)
}
