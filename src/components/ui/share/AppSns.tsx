export const SnsBtn = () => {
	return (
		<ul className="flex items-center -mr-4 -mb-4">
			<li className="mr-4 mb-4">
				<a
					href="https://www.instagram.com/hokke_to_unagi/"
					target="_blank"
					rel="noopener noreferrer"
					className="relative block w-8 h-8 leading-none transition-opacity hover:opacity-80"
				>
					<img
						src="/assets/svg/instagram.svg"
						className="absolute inset-0 w-full h-full object-contain"
						alt="ほっけとうなぎのinstagramアカウント"
					/>
				</a>
			</li>
			<li className="mr-4 mb-4">
				<a
					href="https://twitter.com/shamokit_y2323"
					target="_blank"
					rel="noopener noreferrer"
					className="relative block w-8 h-8 leading-none transition-opacity hover:opacity-80"
				>
					<img
						src="/assets/svg/twitter.svg"
						className="absolute inset-0 w-full h-full object-contain"
						alt="しゃもキットのtwitterアカウント"
					/>
				</a>
			</li>
			<li className="mr-4 mb-4">
				<a
					href="https://github.com/shamokit"
					target="_blank"
					rel="noopener noreferrer"
					className="relative block w-8 h-8 leading-none transition-opacity hover:opacity-80"
				>
					<img
						src="/assets/img/gitHub.png"
						className="absolute inset-0 w-full h-full object-contain"
						alt="しゃもキットのgitHubアカウント"
					/>
				</a>
			</li>
		</ul>
	)
}
