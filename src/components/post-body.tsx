import 'zenn-content-css/lib/index.css'
import style from '@/styles/markdown-styles.module.css'
type Props = {
  className?: string
  content: string
}

const PostBody = ({ content, className }: Props) => {
  return (
    <div className="max-w-full mx-auto">
      <div
        className={`znc ${style['znc']} ${className}`}
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  )
}

export default PostBody
