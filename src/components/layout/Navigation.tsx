import Link from 'next/link'
import { LinkBase } from '@/types/LinkBase'
import { SnsBtn } from '@/components/seo/share'
type NavigationItem = LinkBase
type Props = {
  open: boolean
  list: NavigationItem[],
  closeButton: JSX.Element
}
const Navigation = ({ list, open, closeButton }: Props) => {
  return (
    <>
      <nav
        className={`fixed md:static top-0 right-0 flex flex-col md:flex-row md:items-center w-48 md:w-auto h-screen md:h-auto overflow-auto md:ml-auto pt-14 pb-5 md:py-0 pl-4 md:pl-0 bg-base-color  transition-transform
			${open ? 'translate-x-0' : 'translate-x-full md:translate-x-0'}
			  `}
      >
        <div className="flex flex-col md:flex-row md:items-center px-6 md:py-2">
          <div className="order-1 md:order-none mt-6 md:mt-0 md:mr-6">
            <SnsBtn />
          </div>
          <ul className="flex flex-col md:flex-row md:justify-end gap-4 py-2 md:py-0 font-medium">
            {list.map((item) => {
              return (
                <li className="flex" key={item.name}>
                  <Link href={item.href}>
                    <a className="group relative flex items-center py-2 transition-all uppercase overflow-hidden">
                      {item.name}
                      <span className="absolute left-0 bottom-1 right-0 h-[1px] bg-white scale-0 origin-bottom-right transition-transform ease-in-out duration-300 border-current text-current group-hover:scale-100 group-hover:origin-bottom-left will-change-transform"></span>
                    </a>
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
        <div className="md:hidden mt-auto">{closeButton}</div>
      </nav>
    </>
  )
}

export default Navigation
