type TypeProps = {
	current?: string
}
import { generateIntegerArray } from "@/functions/generateIntegerArray";
import Link from 'next/link'
import classNames from 'classnames'

export const ListArchive = ({current}: TypeProps) => {
	const firstYear = 2022
	const firstYearFirstMonth = 3
	const currentTime = new Date();
	const thisYear = currentTime.getFullYear()
	const thisMonth = currentTime.getMonth() + 1
	const yearList = [...generateIntegerArray(firstYear, thisYear)]
	const monthList = [...generateIntegerArray(1, 12)]
	const archiveList = yearList.map((year) => {
		if(year === firstYear) {
			const thisYearMonthList = [...generateIntegerArray(firstYearFirstMonth, thisMonth)]
			return {
				year: year,
				month: thisYearMonthList
			}
		} else if(year === thisYear) {
			const thisYearMonthList = [...generateIntegerArray(1, thisMonth)]
			return {
				year: thisYear,
				month: thisYearMonthList
			}
		} else {
			return {
				year: year,
				month: monthList
			}
		}
	})
	const archiveListEl = archiveList.map((archive) => {
		return archive.month.map((month) => {
			const link = `/diaries/archive/${archive.year}/${month}`
			const text = `${archive.year}/${month}`
			return (
				<li key={text}>
					<Link href={link}>
						<a className={classNames(['group relative block p-4 text-white',current === `${archive.year}/${month}` ? 'bg-gradient-to-r from-base-color to-main' : 'bg-base-color' ])}>
							<span className="absolute inset-0 transition-opacity bg-gradient-to-r from-base-color to-main opacity-0 group-hover:opacity-100"></span>
							<span className="relative z-10">{text}</span>
						</a>
					</Link>
				</li>
			)
		})
	})
	return (
		<ul className="grid gap-2 text-base">
			{archiveListEl}
		</ul>
	)
}
