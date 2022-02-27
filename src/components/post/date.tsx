import { DateFormat } from '@/functions/common/date-format'

type TypeProps = {
	pageSingle?: boolean
	dateString: string
	className?: string
}
import classnames from 'classnames'
export const PostDate = ({
	pageSingle = false,
	dateString,
	className,
}: TypeProps) => {
	const dateText = DateFormat({ dateString })
	return (
		<>
			{pageSingle ? (
				<time
					dateTime={dateText}
					className={classnames('font-code font-bold', className)}
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
