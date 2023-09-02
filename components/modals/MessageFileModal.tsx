'use client'

import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from "react-hook-form"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog"
import { Form, FormControl, FormField, FormItem, FormMessage } from '../ui/form'
import { Button } from '../ui/button'
import FileUpload from '../FileUpload'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useModal } from '@/hooks/useModalStore'
import qs from 'query-string'

const formSchema = z.object({
    fileUrl: z.string().min(1, {message: 'Attachment is required'})
})

const MessageFileModal = () => {

 const { isOpen, onClose, type, data } = useModal()
 const router = useRouter()

 const isModalOpen = isOpen && type === 'messageFile'
 const { apiUrl, query } = data

 const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
        fileUrl: ''
    }
 })

 const handleClose = () => {
    form.reset()
    onClose()
 }

 const isLoading = form.formState.isSubmitting

 const onSumbit = async (values: z.infer<typeof formSchema>) => {
    try {
      const url = qs.stringifyUrl({
        url: apiUrl || '',
        query
      })

      await axios.post(url, { ...values, content: values.fileUrl })

      form.reset()
      router.refresh()
      handleClose()

    } catch (error) {
      console.log(error)
    }
 }

  return (
    
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className="bg-neutral-900 text-neutral-100 p-0 overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center rfont-bold">
            Add attachment
          </DialogTitle>
          <DialogDescription className="text-center text-zinc-400">
            Send a file as a message
          </DialogDescription>
        </DialogHeader>
        {/* STARTS CREATE SERVER FORM */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSumbit)} className='space-y-8'>
            <div className='space-y-8 px-6'>
              {/* IMAGE UPLOAD USING UPLOADTHING */}
              <div className='flex items-center justify-center text-center'>
                <FormField control={form.control} name='fileUrl' render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <FileUpload endpoint='messageFile' value={field.value} onChange={field.onChange}/>
                    </FormControl>
                    <FormMessage/>
                  </FormItem>
                )}/>
              </div>
            </div>
            <DialogFooter className='bg-neutral-800 px-6 py-4'>
              <Button isLoading={isLoading} type='submit' variant='primary'>
                Send
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default MessageFileModal
