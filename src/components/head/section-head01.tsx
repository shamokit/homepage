import classNames from "classnames";
type Props = {
  className?: string
  as?: React.ElementType
  text: string
}
export const Head01 = ({className, as:TagName = 'h2' , text}: Props) => {
  return (
    <TagName className={classNames('text-lg font-bold leading-tight',{[`${className}`]: className})}>
      {text}
    </TagName>
  )
}
