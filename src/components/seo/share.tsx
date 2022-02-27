import Image from 'next/image'

export const SnsBtn = () => {
	return (
		<ul className="flex items-center gap-4">
			<li>
				<a
					href="https://twitter.com/shamokit_y2323"
					target="_blank"
					rel="noopener noreferrer"
					className="relative block w-8 h-8 leading-none transition-opacity hover:opacity-80"
				>
					<Image src="/logo/twitter.svg" layout="fill" objectFit="contain" />
				</a>
			</li>
			<li>
				<a
					href="https://github.com/shamokit"
					target="_blank"
					rel="noopener noreferrer"
					className="relative block w-8 h-8 leading-none transition-opacity hover:opacity-80"
				>
					<Image src="/logo/gitHub.png" layout="fill" objectFit="contain" />
				</a>
			</li>
		</ul>
	)
}
