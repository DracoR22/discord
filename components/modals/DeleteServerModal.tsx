'use client'

import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog"
import { useModal } from '@/hooks/useModalStore'
import { Button } from "../ui/button"
import { useState } from "react"
import axios from "axios"
import { useRouter } from "next/navigation"

const DeleteServerModal = () => {

 const { isOpen, onClose, type, data } = useModal()
 const router = useRouter()

 const isModalOpen = isOpen && type === 'deleteServer'
 const { server } = data

 const [isLoading, setIsLoading] = useState(false)

 const onCLick = async () => {
    try {
        setIsLoading(true)

        await axios.delete(`/api/servers/${server?.id}`)

        onClose()
        router.refresh()
        router.push('/')
    } catch (error) {
        console.log(error)
    } finally {
        setIsLoading(false)
    }
 }
 
  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="bg-neutral-900 text-neutral-100 p-0 overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center font-bold">
            Delete Server
          </DialogTitle>
          <DialogDescription className="text-center text-zinc-400">
           Are you sure you want to do this? <br />
           <span className="text-indigo-500 font-semibold">{server?.name}</span> will be permanently deleted.
          </DialogDescription>
        </DialogHeader>
         <DialogFooter className="bg-neutral-800 px-6 py-4">
           <div className="flex items-center justify-between w-full">
             <Button disabled={isLoading} onClick={onClose} variant='ghost'>
                Cancel
             </Button>
             <Button isLoading={isLoading} variant='primary' onClick={onCLick}>
                Confirm
             </Button>
           </div>
         </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default DeleteServerModal