'use client'

import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from "react-hook-form"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import ClientOnly from '../ClientOnly'
import FileUpload from '../FileUpload'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useModal } from '@/hooks/useModalStore'
import { useEffect } from 'react'

const formSchema = z.object({
    name: z.string().min(1, {message: 'Server name is required.'}),
    imageUrl: z.string().min(1, {message: 'Server image is required'})
})

const EditServerModal = () => {

 const { isOpen, onClose, type, data } = useModal()
 const router = useRouter()

 const isModalOpen = isOpen && type === 'editServer'
 const { server } = data

 const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
        name: '',
        imageUrl: ''
    }
 })

 useEffect(() => {
    if(server) {
        form.setValue('name', server.name)
        form.setValue('imageUrl', server.imageUrl)
    }
 }, [server, form])

 const isLoading = form.formState.isSubmitting

 const onSumbit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(`/api/servers/${server?.id}`, values)

      form.reset()
      router.refresh()
      onClose()

    } catch (error) {
      console.log(error)
    }
 }

 const handleClose = () => {
    form.reset()
    onClose()
 }

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className="bg-neutral-900 text-neutral-100 p-0 overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center rfont-bold">
            Customize your server
          </DialogTitle>
          <DialogDescription className="text-center text-zinc-400">
            Give your server a personality with a name and an image. You can always change it later.
          </DialogDescription>
        </DialogHeader>
        {/* STARTS CREATE SERVER FORM */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSumbit)} className='space-y-8'>
            <div className='space-y-8 px-6'>
              {/* IMAGE UPLOAD USING UPLOADTHING */}
              <div className='flex items-center justify-center text-center'>
                <FormField control={form.control} name='imageUrl' render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <FileUpload endpoint='serverImage' value={field.value} onChange={field.onChange}/>
                    </FormControl>
                    <FormMessage/>
                  </FormItem>
                )}/>
              </div>
               {/* NAME */}
              <FormField control={form.control} name='name' render={({ field }) => (
                <FormItem>
                  <FormLabel className='uppercase text-xs font-bold text-zinc-400'>
                    Server name
                  </FormLabel> 
                  <FormControl>
                    <Input disabled={isLoading} className='bg-neutral-800 border-0 focus-visible:ring-0
                     text-neutral-100 focus-visible:ring-offset-0' placeholder='Enter server name' {...field}/>
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}/>
            </div>
            <DialogFooter className='bg-neutral-800 px-6 py-4'>
              <Button isLoading={isLoading} type='submit' variant='primary'>
                Save
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default EditServerModal
