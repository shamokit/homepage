import { parseISO, format } from 'date-fns'

type Props = {
  dateString: string
}

export const DateFormat = ({ dateString }: Props) => {
  const date = parseISO(dateString)
  const dateText = format(date,'YYY-MM-dd')
  return dateText
}
