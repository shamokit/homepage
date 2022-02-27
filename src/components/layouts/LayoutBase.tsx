import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

type TypeProps = {
	children: React.ReactNode
}

export const LayoutBase = ({ children }: TypeProps) => {
	return (
		<>
			<Header />
			<div className="flex flex-col min-h-screen pt-14 md:pt-20">
				<div className="flex-1 py-14 md:py-20 lg:py-32">
					<main>{children}</main>
				</div>
				<Footer />
			</div>
		</>
	)
}
