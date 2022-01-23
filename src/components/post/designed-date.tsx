import { DateFormat } from '@/functions/common/date-format'
import classNames from 'classnames'

type Props = {
  dateString: string
  className?: string
}

export const DesignedDate = ({ dateString, className }: Props) => {
  const dateText = DateFormat({ dateString })
  const splitDate = dateText.split('-')
  const year = splitDate[0]
  const month = splitDate[1]
  const day = splitDate[2]
  return (
    <p
      className={classNames('inline-grid font-code leading-none', {
        [`${className}`]: className,
      })}
    >
      <span className='text-sm'>{year}</span> <span className='text-xl'>{month}/{day}</span>
    </p>
  )
}
