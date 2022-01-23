import Image from "next/image"

const SnsBtn = () => {
  return (
    <ul className="flex items-center gap-4">
      <li>
        <a
          href="https://twitter.com/shamokit_y2323"
          target="_blank"
          rel="noopener noreferrer"
          className="block leading-none transition-opacity hover:opacity-80"
        >
          <Image src="/logo/twitter.svg" width={32} height={32} />
        </a>
      </li>
      <li>
        <a
          href="https://github.com/shamokit"
          target="_blank"
          rel="noopener noreferrer"
          className="block leading-none transition-opacity hover:opacity-80"
        >
          <Image src="/logo/gitHub.png" width={32} height={32} />
        </a>
      </li>
    </ul>
  )
}
export default SnsBtn
