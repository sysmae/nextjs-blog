'use client'

import { cn } from '@/utils/style'
import Link from 'next/link'
import { FC } from 'react'
import { AiFillGithub, AiFillInstagram, AiOutlineClose } from 'react-icons/ai'
import IconButton from './IconButton'
import { useQuery } from '@tanstack/react-query'
import { createClient } from '../utils/supabase/client'
import { useCategories } from '@/utils/hooks'

interface SidebarProps {
  close: () => void
  isOpen: boolean
}

const supabase = createClient()

const Sidebar: FC<SidebarProps> = ({ close, isOpen }) => {
  const { data: existingCategories } = useCategories()

  return (
    <div
      className={cn(
        'absolute z-10 min-h-screen flex-col gap-6 border-r bg-white p-10 pr-6 text-base lg:relative',
        isOpen ? 'flex' : 'hidden',
      )}
    >
      <div className="flex justify-end lg:hidden">
        <IconButton
          Icon={AiOutlineClose}
          onClick={close}
          label="sidebarClose"
        />
      </div>
      <Link href="/" className="w-48 font-medium text-gray-600 hover:underline">
        홈
      </Link>
      <Link
        href="/tags"
        className="w-48 font-medium text-gray-600 hover:underline"
      >
        태그
      </Link>
      {existingCategories?.map((category) => (
        <Link
          href={`/categories/${category}`}
          className="w-48 font-medium text-gray-600 hover:underline"
          key={category}
        >
          {category}
        </Link>
      ))}
      <div className="mt-10 flex items-center gap-4">
        <IconButton
          Icon={AiFillInstagram}
          component={Link}
          label="instagramLink"
          href="https://www.instagram.com/sysmae__/"
          target="_blank"
        />
        <IconButton
          Icon={AiFillGithub}
          component={Link}
          label="githubLink"
          href="https://github.com/sysmae"
          target="_blank"
        />
        <img
          src="https://hits.seeyoufarm.com/api/count/incr/badge.svg?url=https%3A%2F%2Fwww.onlinetoolstorage.com&count_bg=%2379C83D&title_bg=%23555555&icon=&icon_color=%23E7E7E7&title=hits&edge_flat=false"
          alt="badge"
        />
      </div>
    </div>
  )
}

export default Sidebar
