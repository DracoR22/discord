'use client'

import qs from 'query-string'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog"
import { useModal } from '@/hooks/useModalStore'
import { Button } from "../ui/button"
import { useState } from "react"
import axios from "axios"

const DeleteMessageModal = () => {

 const { isOpen, onClose, type, data } = useModal()

 const isModalOpen = isOpen && type === 'deleteMessage'
 const { apiUrl, query } = data

 const [isLoading, setIsLoading] = useState(false)

 const onCLick = async () => {
    try {
        setIsLoading(true)
        const url = qs.stringifyUrl({
           url: apiUrl || '',
           query
        })

        await axios.delete(url)

        onClose()
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
            Delete Message
          </DialogTitle>
          <DialogDescription className="text-center text-zinc-400">
           Are you sure you want to do this? <br />
           The message will be permanently deleted
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

export default DeleteMessageModal