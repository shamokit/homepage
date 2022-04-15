import { DateFormat } from '@/lib/date-format'
import classNames from 'classnames'

type TypeProps = {
	dateString: string | Date
	className?: string
}

export const AppDesignedDate = ({ dateString, className }: TypeProps) => {
	const dateText = DateFormat({ dateString })
	const splitDate = dateText.split('-')
	const year = splitDate[0]
	const month = splitDate[1]
	const day = splitDate[2]
	return (
		<p
			className={classNames('inline-grid gap-2  leading-none font-semibold', {
				[`${className}`]: className,
			})}
		>
			<span className="text-xs">{year}</span>{' '}
			<span className="text-base">
				{month}/{day}
			</span>
		</p>
	)
}