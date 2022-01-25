import { DateFormat } from '@/functions/common/date-format'

type Props = {
  pageSingle?: boolean
  dateString: string
  className?: string
}
import classnames from 'classnames'
export const PostDate = ({
  pageSingle = false,
  dateString,
  className,
}: Props) => {
  const dateText = DateFormat({ dateString })
  return (
    <>
      {pageSingle ? (
        <time
          dateTime={dateString}
          className={classnames('font-code', className)}
        >
          {dateText}
        </time>
      ) : (
        <p>{dateText}</p>
      )}
    </>
  )
}

export default Date
