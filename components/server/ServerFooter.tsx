'use client'

import { UserButton } from "@clerk/nextjs"
import { Settings } from "lucide-react"
import ActionTooltip from "../ActionTooltip"
import { ModeToggle } from "../ModeToggle"

interface ServerFooterProps {
    name: string
    userId: string
}

const ServerFooter = ({name, userId}: ServerFooterProps) => {
  return (
    <div className="w-full dark:bg-[#1E1F22] bg-[#E3E5E8] p-2">
        <div className="grid grid-cols-2">
         <div className="flex items-center gap-2">
         <UserButton appearance={{ elements: { avatarBox: 'h-[35px] w-[35px]'}}} afterSignOutUrl="/"/>
         <div className="block truncate">
         <p className="text-[12.5px] font-bold truncate">
            {name}
          </p>
          <p className="text-[11px] font-semibold dark:text-zinc-400 truncate -mt-1">
            {userId}
          </p>
         </div>
          <div className="absolute right-2">
           <ActionTooltip label="Appearance" side="top">
             <div className="p-[7px] rounded-lg">
                <ModeToggle />
             </div>
           </ActionTooltip>
          </div>
          </div>
        </div>
    </div>
  )
}

export default ServerFooter
