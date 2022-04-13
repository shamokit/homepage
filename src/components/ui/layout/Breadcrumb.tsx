import Link from 'next/link'

import classNames from 'classnames'

import { Container } from '@/components/ui/layout/Container'
export type TypeBreadcrumb = {
	name: string
	url: string
}
type TypeProps = {
	items: TypeBreadcrumb[]
}
export const Breadcrumb = ({ items }: TypeProps) => {
	const breadcrumbList = items?.map((item, index) => {
		return (
			<li
				key={item.url}
				className="flex my-1 mr-3 before:content-['\>'] before:mr-3 first-of-type:before:hidden"
			>
				<Link href={item.url}>
					<a
						className={classNames([
							'inline-block',
							items.length === index + 1 && 'text-sub',
						])}
					>
						{index === 0 ? (
							<img
								src="/logo/icon_fill.svg"
								alt="TOPページ"
								width={30}
								height={30}
								className='object-contain'
								loading='lazy'
							/>
						) : (
							item.name
						)}
					</a>
				</Link>
			</li>
		)
	})
	return (
		<div className="sticky top-14 md:top-20 left-0 z-10 bg-white shadow">
			<Container>
				<ol
					className={classNames([
						'flex items-center flex-wrap -mr-3 py-2 md:py-4 text-xs leading-tight'
					])}
				>
					{breadcrumbList}
				</ol>
			</Container>
		</div>
	)
}
