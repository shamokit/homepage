import React from 'react'
import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Navigation from '@/components/layout/Navigation'
import { LinkBase } from '@/types/LinkBase'
import { BLOG_DOMAIN } from '@/lib/constants'
type TypeProps = {
	className?: string
}
// const cats = ['issues', 'books', 'items', 'cats']
const cats = ['issues', 'books']
const list:LinkBase[] = cats.map((cat) => ({
  name: cat,
  href: `${BLOG_DOMAIN}/${cat}/`,
}))
const Header = ({ className }: TypeProps) => {
	const [open, setOpen] = useState(false)
	/**
	 * ナビ開閉
	 */
	const toggleOpen = () => {
		setOpen(!open)
	}
	/**
	 * ナビを閉じる
	 */
	const close = () => {
		setOpen(false)
	}

	const CloseButton = () => {
		return (
			<button
				className={`flex justify-between items-center w-14 h-14 mt-auto ml-auto px-2 leading-none text-bold font-bold`}
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
				className={`fixed top-0 right-0 left-0 z-30 flex justify-start py-3 px-4 md:px-6 lg:px-8 gradation-dark !border-0 ${
					className ? className : ''
				}`}
			>
				<p className="self-center w-8 md:w-10 lg:w-14">
					<Link href="/">
						<a className="grid place-items-center bg-white rounded-full p-1 lg:p-2 leading-none transition-opacity hover:opacity-80">
							<Image
								src="/logo/icon_fill.svg"
								alt="しゃもキット"
								width={40}
								height={40}
								objectFit="contain"
							/>
						</a>
					</Link>
				</p>
				<button
					className="absolute top-0 right-0 z-10 flex md:hidden flex-col justify-center items-center gap-1 w-14 h-14 text-center leading-tight font-code font-bold overflow-hidden"
					onClick={toggleOpen}
					type="button"
				>
					<span
						className={`absolute inset-y-0 flex justify-between items-center w-full px-2 leading-none text-bold`}
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
						className={`block w-5 border  transition-transform relative shadow-inner ${
							open
								? 'rotate-45 top-[3px] border-white'
								: 'rotate-0 border-accent'
						}`}
					></span>
					<span
						className={`block w-5 border  transition-transform relative shadow-inner ${
							open
								? '-rotate-45 -top-[3px] border-white'
								: 'rotate-0 border-accent'
						}`}
					></span>
					<div className="sr-only">menu</div>
				</button>
				<Navigation list={list} open={open} closeButton={<CloseButton />} />
			</header>
			<div
				className={`fixed top-0 right-0 z-20 h-screen w-full bg-main-bg bg-opacity-20 backdrop-blur-sm transition-opacity ${
					open ? 'opacity-100' : 'opacity-0 pointer-events-none'
				}
					md:hidden
				`}
				onClick={close}
			></div>
		</>
	)
}
export default Header
