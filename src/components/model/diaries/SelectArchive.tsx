type TypeProps = {
	current?: string
}
import { generateIntegerArray } from 'utils/generateIntegerArray'
import { useRouter } from 'next/router'
export const SelectArchive = ({ current }: TypeProps) => {
	let router = useRouter()
	const handleArchives = (event: React.ChangeEvent<HTMLSelectElement>) => {
		if (event.target.value === '') {
			router.push(`/diaries/`)
		} else {
			router.push(`/diaries/archive/${event.target.value}`)
		}
	}
	const firstYear = 2022
	const firstYearFirstMonth = 3
	const currentTime = new Date()
	const thisYear = currentTime.getFullYear()
	const thisMonth = currentTime.getMonth() + 1
	const yearList = [...generateIntegerArray(firstYear, thisYear)]
	const monthList = [...generateIntegerArray(0, 12)]
	const archiveList = yearList.map((year) => {
		if (year === thisYear) {
			let thisYearMonthList = [...generateIntegerArray(0, thisMonth)]
			if (thisYear === firstYear) {
				thisYearMonthList = [
					...generateIntegerArray(firstYearFirstMonth, thisMonth),
				]
			}
			return {
				year: thisYear,
				month: thisYearMonthList,
			}
		} else if (year === firstYear) {
			const thisYearMonthList = [
				...generateIntegerArray(firstYearFirstMonth, 12),
			]
			return {
				year: year,
				month: thisYearMonthList,
			}
		} else {
			return {
				year: year,
				month: monthList,
			}
		}
	})
	let archiveListEl = archiveList.map((archive) => {
		return archive.month.map((month) => {
			let optionValue = `${archive.year}/${month}`
			if (month === 0) {
				optionValue = `${archive.year}`
			}
			return (
				<option value={optionValue} key={optionValue}>
					{optionValue}
				</option>
			)
		})
	})
	return (
		<select
			onChange={handleArchives}
			defaultValue={current}
			className="w-full max-w-full h-10 px-4 border rounded text-base"
		>
			<option value="">最新一覧</option>
			<option value="2022">2022</option>
			{archiveListEl}
		</select>
	)
}
