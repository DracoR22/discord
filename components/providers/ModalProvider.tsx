'use client'

import CreateServerModal from '@/components/modals/CreateServerModal'
import { useEffect, useState } from 'react'
import InviteModal from '../modals/InviteModal'
import EditServerModal from '../modals/EditServerModal'
import MembersModal from '../modals/MembersModal'
import CreateChannelModal from '../modals/CreateChannelModal'
import LeaveServerModal from '../modals/LeaveServerModal'

const ModalProvider = () => {

 const [isMounted, setIsMounted] = useState(false)

 useEffect(() => {
    setIsMounted(true)
 }, [])

 if(!isMounted) {
    return null
 }

  return (
    <>
    <CreateServerModal/>
    <InviteModal/>
    <EditServerModal/>
    <MembersModal/>
    <CreateChannelModal/>
    <LeaveServerModal/>
    </>
  )
}

export default ModalProvider