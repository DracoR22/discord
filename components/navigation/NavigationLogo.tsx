'use client'

import Image from "next/image"
import ActionTooltip from '@/components/ActionTooltip'

const NavigationLogo = () => {
  return (
    <div>
      <ActionTooltip side="right" align="center" label="Discord">
      <button className="group flex items-center">
        <div className="flex mx-3 h-[48px] w-[48px] rounded-[24px] group-hover:rounded-[16px] transition-all
        overflow-hidden items-center justify-center bg-background dark:bg-neutral-700 group-hover:bg-indigo-500">
          <Image src='/discord3.png' alt="logo" height={25} width={25} className="transition"/>
        </div>
      </button>
      </ActionTooltip>
    </div>
  )
}

export default NavigationLogo