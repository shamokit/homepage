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
					<img
						src="/logo/twitter.svg"
						className="absolute inset-0 w-full h-full object-contain"
						alt="しゃもキットのtwitterアカウント"
					/>
				</a>
			</li>
			<li>
				<a
					href="https://github.com/shamokit"
					target="_blank"
					rel="noopener noreferrer"
					className="relative block w-8 h-8 leading-none transition-opacity hover:opacity-80"
				>
					<img
						src="/logo/gitHub.png"
						className="absolute inset-0 w-full h-full object-contain"
						alt="しゃもキットのgitHubアカウント"
					/>
				</a>
			</li>
		</ul>
	)
}
