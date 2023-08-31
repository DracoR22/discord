import { currentProfile } from "@/lib/currentProfile"
import { redirectToSignIn } from "@clerk/nextjs"

interface MemberIdPageProps {
  params: {
    memberId: string
    serverId: string
  }
}

const MemberIdPage = async ({params}: MemberIdPageProps) => {

 const profile = await currentProfile()

 if(!profile) {
  return redirectToSignIn()
 }

  return (
    <div>
      Member Id Page!
    </div>
  )
}

export default MemberIdPage
