'use client'

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog"
import { useModal } from '@/hooks/useModalStore'
import { Label } from "../ui/label"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { Check, Copy, RefreshCw } from "lucide-react"
import { useOrigin } from "@/hooks/useOrigin"
import { useState } from "react"
import axios from "axios"

const LeaveServerModal = () => {

 const {onOpen, isOpen, onClose, type, data } = useModal()

 const isModalOpen = isOpen && type === 'leaveServer'
 const { server } = data

 const [copied, setCopied] = useState(false)
 const [isLoading, setIsLoading] = useState(false)
 
  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="bg-neutral-900 text-neutral-100 p-0 overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center font-bold">
            Leave Server
          </DialogTitle>
        </DialogHeader>
         <div className="p-6">
           Leave server
         </div>
      </DialogContent>
    </Dialog>
  )
}

export default LeaveServerModal