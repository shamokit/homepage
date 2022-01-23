import { parseISO, format } from 'date-fns'

type Props = {
  pageSingle?: boolean,
  dateString: string
}

const DateFormatter = ({ pageSingle = false, dateString }: Props) => {
  const date = parseISO(dateString)
  const dateText = format(date,'YYY-MM-dd')
  return (
    <>
      {pageSingle ? (
        <time dateTime={dateString}>{dateText}</time>
      ) : (
        <p>{dateText}</p>
      )}
    </>
  )
}

export default DateFormatter
