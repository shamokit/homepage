import { DateFormat } from '@/functions/common/date-format'

type Props = {
  pageSingle?: boolean,
  dateString: string
}

export const DateElem = ({ pageSingle = false, dateString }: Props) => {
  const dateText = DateFormat({dateString})
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
