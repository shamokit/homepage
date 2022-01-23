import { ReactNode } from 'react'

type Props = {
  children?: ReactNode
}

const PostTitle = ({ children }: Props) => {
  return (
    <h1 className="leading-tight font-bold text-lg">
      {children}
    </h1>
  )
}

export default PostTitle
