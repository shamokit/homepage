import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { Breadcrumb, TypeBreadcrumb } from '@/components/layout/Breadcrumb'
import classNames from 'classnames'
type TypeProps = {
	children: React.ReactNode
	sidebar?: React.ReactNode
	breadcrumb?: TypeBreadcrumb[]
	containerClassName?: string
}

export const LayoutBase = ({
	children,
	sidebar,
	breadcrumb,
	containerClassName,
}: TypeProps) => {
	return (
		<>
			<Header />
			<div className="flex flex-col min-h-screen pt-14 md:pt-20">
				{breadcrumb && <Breadcrumb items={breadcrumb} />}
				<div
					className={classNames(
						'flex-1 py-14 md:py-20 lg:py-32',
						sidebar ? 'container md:flex mx-auto' : '',
						{ containerClassName: containerClassName }
					)}
				>
					{sidebar && (
						<div className="md:order-1 md:w-60 px-4 md:pl-0 md:pr-6 lg:pr-8 mb-10 lg:mb-0">
							{sidebar}
						</div>
					)}
					<main className="flex-1">{children}</main>
				</div>
				<Footer />
			</div>
		</>
	)
}
