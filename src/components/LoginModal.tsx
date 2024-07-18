import type { Dispatch, SetStateAction } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from './ui/dialog'
import Image from 'next/image'
import { LoginLink, RegisterLink } from '@kinde-oss/kinde-auth-nextjs'
import { buttonVariants } from './ui/button'
import { useTranslations } from 'next-intl'

const LoginModal = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean
  // i got the type from hovering on the setIsOpen on useState!
  setIsOpen: Dispatch<SetStateAction<boolean>>
}) => {

const t = useTranslations('LoginModal')

  return (
    <div className={` ${isOpen ? "mt-96 sm:mt-0" : "mt-0"}`}>
    <Dialog onOpenChange={setIsOpen} open={isOpen} >
      <DialogContent className='absolute z-[9999999]'>
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
            {t('title')}
          </DialogTitle>
          <DialogDescription className='text-base text-center py-2'>
            <span className='font-medium text-zinc-900 dark:text-gray-100'>
            {t('config')}
            </span>{' '}
            {t('subTitle')}
          </DialogDescription>
        </DialogHeader>

        <div className='grid grid-cols-2 gap-6 divide-x divide-gray-200'>
          <LoginLink className={buttonVariants({ variant: 'outline' })}>
          {t('login')}
          </LoginLink>
          <RegisterLink className={buttonVariants({ variant: 'default' })}>
          {t('signup')}
          </RegisterLink>
        </div>
      </DialogContent>
    </Dialog>
    </div>
  )
}

export default LoginModal
