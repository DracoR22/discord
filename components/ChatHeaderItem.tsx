'use client'

import { Hash } from "lucide-react"
import { BiSolidMessage } from 'react-icons/bi'
import { BsFillBellSlashFill } from 'react-icons/bs'
import { AiFillPushpin } from 'react-icons/ai'
import { HiUsers } from 'react-icons/hi'

const ChatHeaderItem = () => {
  return (
    <div className="text-zinc-500 dark:text-zinc-400 flex items-center gap-4">
      <div className="relative inline-block ">
        <Hash className="h-6 w-6"/>
        <BiSolidMessage className="absolute bottom-0 right-[2px] w-[12.5px] h-[12.5px]"/>
      </div>
      <BsFillBellSlashFill className="h-5 w-5"/>
      <AiFillPushpin className="h-6 w-6"/>
      <HiUsers className="h-6 w-6"/>
    </div>
  )
}

export default ChatHeaderItem
