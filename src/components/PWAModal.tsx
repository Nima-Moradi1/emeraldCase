import type { Dispatch, SetStateAction } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from './ui/dialog'
import Image from 'next/image'
import { Button } from './ui/button'

const PWAModal = ({
  show,
  onClose,
  onInstall,
}: {
  show: boolean
  onClose : any 
  onInstall : any
  // i got the type from hovering on the setIsOpen on useState!
}) => {


  return (
    <div className={` ${show ? "mt-72 sm:mt-0" : "mt-0"}`}>
    <Dialog  open={show} onOpenChange={onClose}>
      <DialogContent className='z-[9999999]'>
        <DialogHeader>
          <div className='relative mx-auto w-24 h-24 mb-2'>
            <Image
              src='/snake-1.png'
              alt='snake image'
              className='object-contain'
              fill
            />
          </div>
          <DialogTitle className='text-3xl text-center font-bold tracking-tight text-gray-900 dark:text-gray-100'>
           Install the PWA app to access the app on your phone!
          </DialogTitle>
          <DialogDescription className='text-base text-center py-2'>
            
            Click the button below to install it on your Phone!
          </DialogDescription>
        </DialogHeader>

        <div className='grid grid-cols-2 gap-3 '>
         <Button
         onClick={onInstall}
         >Install PWA</Button>
         <Button 
         onClick={onClose}
         variant={'outline'}
         >Not right Now !</Button>
        </div>
      </DialogContent>
    </Dialog>
    </div>
  )
}

export default PWAModal
