import React from 'react';
import Link, { LinkProps } from 'next/link'
import classNames from 'classnames'
import { SnsBtn } from '@/components/ui/share/AppSns'
type TypeProps = {
	open: boolean
	closeButton: JSX.Element
}
import { BLOG_DOMAIN } from 'config/constants'
const cats = ['profile', 'posts', 'books', 'diaries'] as const
const list: (LinkProps & { name: typeof cats[number] })[] = cats.map((cat) => ({
	name: cat,
	href: `${BLOG_DOMAIN}/${cat}/`,
}))
const Navigation = ({ open, closeButton }: TypeProps) => {
	const classOpen = open ? 'translate-x-0' : 'translate-x-full md:translate-x-0'
	return (
		<>
			<nav
				id="navigation"
				className={classNames(
					'fixed md:static top-0 right-0 overflow-auto md:overflow-hidden flex flex-col md:flex-row md:items-center w-48 md:w-auto h-screen md:h-auto md:ml-auto pt-14 pb-5 md:py-0 pl-4 md:pl-0 bg-base-color transition-transform',
					classOpen
				)}
				role="navigation"
				itemProp="hasPart"
				itemType="http://www.schema.org/SiteNavigationElement"
			>
				<div className="flex flex-col md:flex-row md:items-center px-4 md:py-2">
					<div className="order-1 md:order-none mt-6 md:mt-0 md:mr-6">
						<SnsBtn />
					</div>
					<ul className="flex flex-col md:flex-row md:justify-end -mr-4 py-2 md:py-0 text-base">
						{list.map((item) => {
							return (
								<li
									className="flex mr-4"
									key={item.name}
									itemProp="hasPart"
									itemScope
									itemType="http://schema.org/WebPage"
								>
									<Link href={`${item.href}`}>
										<a
											className="group relative flex items-center py-2 transition-all capitalize overflow-hidden"
											itemProp="url"
										>
											<span itemProp="name">{item.name}</span>
											<span className="absolute left-0 bottom-1 right-0 h-[1px] bg-accent scale-0 origin-bottom-right transition-transform ease-in-out duration-300 border-current text-current group-hover:scale-100 group-hover:origin-bottom-left will-change-transform"></span>
										</a>
									</Link>
								</li>
							)
						})}
					</ul>
				</div>
				<div className="md:hidden mt-auto">{closeButton}</div>
				<div className="safe-area"></div>
			</nav>
		</>
	)
}

export default Navigation
