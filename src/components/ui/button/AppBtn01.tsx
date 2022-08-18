import classNames from 'classnames'
import { AppIcoArrow01 } from '@/components/ui/ico/AppIcoArrow01'
import Link, { LinkProps } from 'next/link'
type TypeProps = {
	outerLink?: boolean
	children: React.ReactNode
} & LinkProps
export const AppBtn01 = ({ children, href, outerLink }: TypeProps) => {
	return (
		<>
			{outerLink ? (
				<a
					className={classNames([
						'group',
						'relative overflow-hidden',
						'flex items-center',
						'max-w-xs',
						'py-4 px-6',
						'rounded-full',
						'leading-normal text-center text-white',
						'transition-colors ease-out',
						'gradation-r',
					])}
				>
					<div
						className={classNames([
							'absolute inset-0',
							'bg-base-color',
							'transition-opacity duration-500',
							'opacity-0 group-hover:opacity-100',
						])}
					></div>
					<span className="relative">{children}</span>
					<AppIcoArrow01
						className={classNames([
							'absolute top-1/2 right-5',
							'-translate-y-1/2',
						])}
					/>
				</a>
			) : (
				<Link href={href}>
					<a
						className={classNames([
							'group',
							'relative overflow-hidden',
							'flex items-center',
							'max-w-xs',
							'py-4 px-6',
							'rounded-full',
							'leading-normal text-center text-white',
							'transition-colors ease-out',
							'gradation-r',
						])}
					>
						<div
							className={classNames([
								'absolute inset-0',
								'bg-base-color',
								'transition-opacity duration-500',
								'opacity-0 group-hover:opacity-100',
							])}
						></div>
						<span className="relative">{children}</span>
						<AppIcoArrow01
							className={classNames([
								'absolute top-1/2 right-5',
								'-translate-y-1/2',
							])}
						/>
					</a>
				</Link>
			)}
		</>
	)
}
