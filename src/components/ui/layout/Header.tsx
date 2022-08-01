import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import classNames from 'classnames'
import Navigation from '@/components/ui/layout/Navigation'
type TypeProps = {
	className?: string
}
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock'
const Header = ({ className }: TypeProps) => {
	const router = useRouter()
	const [open, setOpen] = useState(false)
	let navigation: HTMLElement | null = null
	if (typeof document !== 'undefined') {
		navigation = document.getElementById('navigation')
	}

	useEffect(() => {
		router.events.on('routeChangeStart', handleOnEnable)
	}, [])

	const handleOnDisable = () => {
		if (!navigation) return
		disableBodyScroll(navigation)
	}

	const handleOnEnable = () => {
		enableBodyScroll(navigation)
	}

	/**
	 * ナビ開閉
	 */
	const toggleOpen = () => {
		setOpen(!open)
		open === true ? handleOnEnable() : handleOnDisable()
	}
	/**
	 * ナビを閉じる
	 */
	const close = () => {
		setOpen(false)
		handleOnEnable()
	}

	const CloseButton = () => {
		return (
			<button
				className={`flex justify-between items-center w-14 h-14 mt-auto ml-auto px-2 leading-none font-semibold text-accent`}
				onClick={close}
				type="button"
			>
				<span>&lt;</span>
				<span>/</span>
				<span>&gt;</span>
			</button>
		)
	}
	return (
		<>
			<header
				className={classNames([
					'fixed top-0 right-0 left-0 z-30',
					'flex justify-start',
					'py-3 px-4 md:px-6 lg:px-8',
					'!border-0',
					'gradation-dark',
					className,
				])}
			>
				<p className="self-center w-8 md:w-10 lg:w-14">
					<Link href="/">
						<a className="grid place-items-center bg-white rounded-full p-1 lg:p-2 leading-none transition-opacity hover:opacity-80">
							<img
								src="/logo/icon_fill.svg"
								alt="しゃもキット"
								width={40}
								height={40}
								className="object-contain"
								loading="lazy"
							/>
						</a>
					</Link>
				</p>
				<button
					className="absolute top-0 right-0 z-10 flex md:hidden flex-col justify-center items-center w-14 h-14 text-center leading-tight font-semibold overflow-hidden"
					onClick={toggleOpen}
					type="button"
				>
					<span
						className={`absolute inset-y-0 flex justify-between items-center w-full px-2 leading-none text-bold text-accent`}
					>
						<span
							className={`relative flex transition-transform ${
								open ? 'translate-x-0' : '-translate-x-full opacity-0'
							}`}
						>
							&lt;
						</span>
						<span
							className={`relative flex transition-transform ${
								open ? 'translate-x-0' : 'translate-x-full opacity-0'
							}`}
						>
							&gt;
						</span>
					</span>
					<span
						className={`block w-5 mb-0.5 border  transition-transform relative shadow-inner border-accent ${
							open ? 'rotate-45 top-[3px]' : 'rotate-0'
						}`}
					></span>
					<span
						className={`block w-5 mt-0.5 border  transition-transform relative shadow-inner border-accent ${
							open ? '-rotate-45 -top-[3px]' : 'rotate-0'
						}`}
					></span>
					<span className="sr-only">menu</span>
				</button>
				<Navigation open={open} closeButton={<CloseButton />} />
			</header>
			<div
				className={classNames([
					'fixed top-0 right-0 z-20',
					'md:hidden',
					'w-full h-screen',
					'transition-opacity bg-main-bg bg-opacity-20 backdrop-blur-sm',
					open ? 'opacity-100' : 'opacity-0 pointer-events-none',
				])}
				onClick={close}
			></div>
		</>
	)
}
export default Header
