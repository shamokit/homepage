type Props = {
	className?: string
}
export const AppArrow01 = ({ className }: Props) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		height={24}
		width={24}
		className={className}
	>
		<path d="M0 0h24v24H0z" fill="none" />
		<path d="m22 12-4-4v3H3v2h15v3z" fill="currentColor" />
	</svg>
)
