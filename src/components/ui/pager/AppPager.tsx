type Props = {
	dir: string
	pager: {
		pages: number[]
		current: number
	}
}
import Link from 'next/link'

export const AppPager = ({ dir, pager }: Props) => {
	const items = pager.pages.map((page) => {
		if (page === pager.current) {
			return (
				<li key={page} className={'mr-2 mb-2'}>
					<span className="box-border grid place-items-center w-10 h-10 pl-0.5 gradation-r text-white rounded">
						{page}
					</span>
				</li>
			)
		} else {
			const link = page === 1 ? `${dir}/` : `${dir}/page/${page}/`
			return (
				<li key={page} className={'mr-2 mb-2'}>
					<Link href={link}>
						<a className="group relative box-border grid place-items-center w-10 h-10 pl-0.5 transition-colors hover:text-white rounded overflow-hidden">
							<span className="absolute inset-0 gradation-r opacity-0 transition-opacity group-hover:opacity-100"></span>
							<span className="relative">{page}</span>
						</a>
					</Link>
				</li>
			)
		}
	})
	return (
		<ul className="flex flex-wrap justify-center -mr-2 -mb-2 text-center">
			{items}
		</ul>
	)
}
