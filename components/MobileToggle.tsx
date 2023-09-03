import { Menu } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet"
import NavigationSidebar from "./navigation/NavigationSidebar"
import ServerSidebar from "./server/ServerSidebar"
import ClientOnly from "./ClientOnly"

const MobileToggle = ({serverId}: { serverId: string }) => {
  return (
    <ClientOnly>
    <Sheet>
     <SheetTrigger>
        <div className="md:hidden mr-2 p-2 hover:bg-neutral-200 hover:dark:bg-neutral-700 rounded-full transition">
            <Menu/>
        </div>
     </SheetTrigger>
     <SheetContent side='left' className="p-0 flex gap-0">
      <div className="w-[72px]">
        <NavigationSidebar/>
      </div>
      <ServerSidebar serverId={serverId}/>
     </SheetContent>
    </Sheet>
    </ClientOnly>
  )
}

export default MobileToggle
