import Image from 'next/image';
import { AUTHOR_NAME } from '@/lib/constants'

const Avatar = () => {
  return (
    <figure className="flex items-center">
      <div className="w-12 h-12 rounded-full mr-4">
        <Image
          src="/logo/icon_fill.svg"
          alt={AUTHOR_NAME}
          width={48}
          height={48}
          objectFit="contain"
        />
      </div>
      <figcaption className="text-xl font-bold">{AUTHOR_NAME}</figcaption>
    </figure>
  )
}

export default Avatar
