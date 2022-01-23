import 'zenn-content-css/lib/index.css'
import style from '@/styles/markdown-styles.module.css'
type Props = {
  content: string
  className?: string
}

const PostBody = ({ content, className }: Props) => {
  return (
    <div
      className={`znc ${style['znc']} ${className}`}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  )
}

export default PostBody
