import Link from 'next/link'
import { Dispatch, FC, SetStateAction } from 'react'
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai'
import { BsRobot } from 'react-icons/bs'
import IconButton from './IconButton'

type HeaderProps = {
  isSidebarOpen: boolean
  setIsSidebarOpen: Dispatch<SetStateAction<boolean>>
}

const Header: FC<HeaderProps> = ({ isSidebarOpen, setIsSidebarOpen }) => {
  return (
    <header className="flex justify-between border-t p-4 font-medium">
      <IconButton
        onClick={() => setIsSidebarOpen((t) => !t)}
        Icon={isSidebarOpen ? AiOutlineClose : AiOutlineMenu}
        label="sidebarToggle"
      />
      <Link href="/">
        <h1 className="text-3xl font-medium text-slate-600 lg:text-4xl">
          BLOG
        </h1>
      </Link>
      <IconButton
        Icon={BsRobot}
        component={Link}
        label="chatbotLink"
        href="/search"
      />
    </header>
  )
}
export default Header
