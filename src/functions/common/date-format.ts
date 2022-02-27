import { parseISO, format } from 'date-fns'

type TypeProps = {
	dateString: string
}

export const DateFormat = ({ dateString }: TypeProps) => {
	const date = parseISO(dateString)
	const dateText = format(date, 'YYY-MM-dd')
	return dateText
}
