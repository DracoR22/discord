import { currentProfile } from "@/lib/currentProfile"
import { db } from "@/lib/db"
import { redirect } from "next/navigation"
import NavigationAction from "./NavigationAction"
import { Separator } from "../ui/separator"
import { ScrollArea } from "../ui/scroll-area"
import NavigationLogo from "./NavigationLogo"
import NavigationItem from "./NavigationItem"
import { ModeToggle } from "../ModeToggle"
import { UserButton } from "@clerk/nextjs"

const NavigationSidebar = async () => {

  const profile = await currentProfile()

  if(!profile) {
    return redirect('/')
  }

  const servers = await db.server.findMany({
    where: {
        members: {
            some: {
                profileId: profile.id
            }
        }
    }
  })

  return (
    <div className="space-y-4 flex flex-col items-center h-full text-primary w-full dark:bg-[#1E1F22] py-3">
      <NavigationLogo/>
      <Separator className="h-[2px] bg-zinc-300 dark:bg-zinc-700 rounded-md w-10 mx-auto"/>
      <ScrollArea className="flex-1 w-full">
         {servers.map((server) => (
          <div key={server.id} className="mb-2.5">
            <NavigationItem id={server.id} name={server.name} imageUrl={server.imageUrl}/>
          </div>
         ))}
         <NavigationAction/>
      </ScrollArea>
    </div>
  )
}

export default NavigationSidebar
