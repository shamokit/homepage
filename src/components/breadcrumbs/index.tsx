import Link from 'next/link'
import Image from 'next/image'
import classNames from 'classnames'
import { Container } from '@/components/layout/Container'

type Breadcrumb = {
	name: string
	url: string
}
type TypeProps = {
	className?: string
	breadcrumb: Breadcrumb[]
}
export const Breadcrumb = ({ className, breadcrumb }: TypeProps) => {
	const breadcrumbList = breadcrumb?.map((item, index) => {
		return (
			<li
				key={item.name}
				className="flex my-1 mr-3 before:content-['\>'] before:mr-3 first-of-type:before:hidden"
			>
				<span className="inline-block first-of-type:hidden">&gt;</span>
				<Link href={item.url}>
					<a className={classNames(['inline-block',
					breadcrumb.length === index + 1 && 'text-sub'
				])}>
						{index === 0 ? (
							<Image
								src="/logo/icon_fill.svg"
								alt="しゃもキット"
								width={30}
								height={30}
								objectFit="contain"
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
						'flex items-center flex-wrap -mr-3 py-2 md:py-4 text-xs leading-tight',
						className,
					])}
				>
					{breadcrumbList}
				</ol>
			</Container>
		</div>
	)
}
