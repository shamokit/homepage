import { parseISO, format } from 'date-fns'

type TypeProps = {
	dateString: string | Date
}

export const DateFormat = ({ dateString }: TypeProps) => {
	const date = parseISO(dateString)
	const dateText = format(date, 'YYY-MM-dd')
	return dateText
}
