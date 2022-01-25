type PropTypes = {
  title: string
  className?: string
}
import classnames from "classnames";
export const PostTitle = ({title, className}: PropTypes) => {
  return (
    <h1 className={classnames('font-bold text-xl leading-normal', className)}>{title}</h1>
  )
}
