'use client'

import { Icons } from '@/components/Icons'
import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import Phone from '@/components/Phone'
import { Reviews } from '@/components/Reviews'
import { buttonVariants } from '@/components/ui/button'
import { ArrowRight, Check, Star } from 'lucide-react'
import Link from 'next/link'
import {useTranslations} from 'next-intl'
import PWAModal from '@/components/PWAModal'
import { useEffect, useState } from 'react'

export default function Home({params : {locale}} : {params : {locale : string}}) {
  const t = useTranslations('Home') ;
const handleCloseModal = () => {
  setShowInstallModal(false)
}
const handleInstallClick = () => {
  if(prompt){
    prompt.prompt()

    prompt.userChoice.then((choiceResult : any)=> {
      if(choiceResult.outcome === 'accepted') {
        console.log("Accepted Pwa installation by user")
      } else {
        console.log("rejected !")
      }
      setPrompt(null)
      setShowInstallModal(false)
    })
  }
}
const [showInstallModal,setShowInstallModal] = useState<boolean>(false)
const [prompt,setPrompt] = useState<any>(null)
useEffect(()=> {
  const handleBeforeInstallPrompt = ( event : any) => {
    event.preventDefault()
    setPrompt(event)
    if(!window.matchMedia("(display-mode: standalone)").matches) {
      setShowInstallModal(true);
    }
  }
  window.addEventListener('beforeinstallprompt',handleBeforeInstallPrompt)

  //cleanup functions
  return () => {
    window.removeEventListener('beforeinstallprompt',handleBeforeInstallPrompt)
  }
},[])


  return (
    <div>
      <section>
        <MaxWidthWrapper className='pb-24 pt-10 lg:grid lg:grid-cols-3 sm:pb-32 lg:gap-x-0 xl:gap-x-8 lg:pt-24 xl:pt-32 lg:pb-52'>
          <div className='col-span-2 px-6 lg:px-0 lg:pt-4'>
            <div className='relative mx-auto text-center lg:text-left flex flex-col items-center lg:items-start'>
              <div className='absolute w-28 left-0 rtl:left-3/4 rtl:ml-20 rtl:-top-0 -top-20 hidden lg:block'>
                {/* this div, it's purely visual gradient and looks nice */}
                <div className='absolute inset-x-0 bottom-0 h-28' />
                <img src='/snake-1.png' alt='snake' className='w-full' />
              </div>
              <h1 className='relative w-fit tracking-tight rtl:tracking-wider text-balance mt-16 font-bold !leading-tight rtl:text-4xl rtl:text-center rtl:lg:mt-0 
               rtl:rounded-lg rtl:p-2 rtl:md:text-5xl rtl:-ml-5 text-gray-900 dark:text-white text-4xl md:text-6xl '>
                {t('header')}{" "}
                {/* @ts-ignore */}
                {locale === "en" ? <span>&#8594;</span> : <span>&#8592;</span>}
                 {' '}
                <span className='bg-primary dark:bg-primary rounded-md px-2 rtl:py-1 text-white dark:text-zinc-800'>{t('custom')}</span>{' '}
              </h1>
              <p className='mt-8 text-lg lg:pr-10 max-w-prose text-center lg:text-left rtl:lg:text-right text-balance md:text-wrap'>
                {t('subHeader')}
              </p>

              <ul className='mt-8 space-y-2 text-left font-medium flex flex-col items-center sm:items-start'>
                <div className='space-y-2'>
                  <li className='flex gap-1.5 items-center text-left'>
                    <Check className='h-5 w-5 shrink-0 text-primary dark:text-primary' />
                   {t('quality')}
                  </li>
                  <li className='flex gap-1.5 items-center text-left'>
                    <Check className='h-5 w-5 shrink-0 text-primary dark:text-primary' />
                    {t('guarantee')}
                  </li>
                  <li className='flex gap-1.5 items-center text-left'>
                    <Check className='h-5 w-5 shrink-0 text-primary dark:text-primary' />
                    {t('supported')}
                  </li>
                </div>
              </ul>

              <div className='mt-12 flex flex-col sm:flex-row items-center sm:items-start gap-5'>
                <div className='flex -space-x-4'>
                  <img
                    className='inline-block h-10 w-10 rounded-full ring-2 ring-slate-100'
                    src='/users/user-1.png'
                    alt='user image'
                  />
                  <img
                    className='inline-block h-10 w-10 rounded-full ring-2 ring-slate-100'
                    src='/users/user-2.png'
                    alt='user image'
                  />
                  <img
                    className='inline-block h-10 w-10 rounded-full ring-2 ring-slate-100'
                    src='/users/user-3.png'
                    alt='user image'
                  />
                  <img
                    className='inline-block h-10 w-10 rounded-full ring-2 ring-slate-100'
                    src='/users/user-4.jpg'
                    alt='user image'
                  />
                  <img
                    className='inline-block object-cover h-10 w-10 rounded-full ring-2 ring-slate-100'
                    src='/users/user-5.jpg'
                    alt='user image'
                  />
                </div>

                <div className='flex flex-col justify-between items-center sm:items-start'>
                  <div className='flex gap-0.5'>
                    <Star className='size-4 text-primary fill-primary' />
                    <Star className='size-4 text-primary fill-primary' />
                    <Star className='size-4 text-primary fill-primary' />
                    <Star className='size-4 text-primary fill-primary' />
                    <Star className='size-4 text-primary fill-primary' />
                  </div>

                  <p>
                    <span className='font-semibold'>1,250</span>  {t('happy')}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className='col-span-full lg:col-span-1 w-full flex justify-center px-8 sm:px-16 md:px-0 mt-32 lg:mx-0 lg:mt-20 h-fit'>
            <div className='relative md:max-w-xl'>
              <img
                src='/your-image.png'
                alt='your-image'
                className='dark:hidden absolute w-40 lg:w-52 left-56 rtl:hidden -top-20 select-none hidden sm:block lg:hidden xl:block'
              />
              <img
              alt='line'
                src='/line.png'
                className='absolute w-20 -left-6 -bottom-6 select-none'
              />
              <Phone className='w-64' imgSrc='/testimonials/jungle.jpeg' />
            </div>
          </div>
        </MaxWidthWrapper>
      </section>

      {/* value proposition section */}
      <section className='bg-slate-100 dark:bg-background py-24'>
        <MaxWidthWrapper className='flex flex-col items-center gap-16 sm:gap-32'>
          <div className='flex flex-col lg:flex-row items-center gap-4 sm:gap-6'>
            <h2 className='order-1 mt-2 tracking-tight text-center text-balance !leading-tight font-bold text-5xl rtl:text-4xl rtl:md-text-5xl md:text-6xl text-zink-800 dark:text-slate-50'>
            {t('what')}{' '}
              <span className='relative px-2'>
              {t('customers')}{' '}
                <Icons.underline className='hidden sm:block pointer-events-none absolute inset-x-0 -bottom-6 text-primary' />
              </span>{' '}
              {t('say')}
            </h2>
            <img alt='snake' src='/snake-2.png' className='w-24 order-0 lg:order-2' />
          </div>

          <div className='mx-auto grid max-w-2xl grid-cols-1 px-4 lg:mx-0 lg:max-w-none lg:grid-cols-2 gap-y-16'>
            <div className='flex flex-auto flex-col gap-4 lg:pr-8 xl:pr-20'>
              <div className='flex gap-0.5 mb-2'>
                <Star className='size-6 text-primary fill-primary' />
                <Star className='size-6 text-primary fill-primary' />
                <Star className='size-6 text-primary fill-primary' />
                <Star className='size-6 text-primary fill-primary' />
                <Star className='size-6 text-primary fill-primary' />
              </div>
              <div className='text-lg leading-8'>
                <p>
                "{t('comment1Part1')}{' '}
                  <span className='p-0.5 bg-slate-800 text-white'>
                  {t('comment1Bold')}
                  </span>
                  {" "}{t('comment1Part2')}"
                </p>
              </div>
              <div className='flex gap-4 mt-2'>
                <img
                  className='rounded-full h-12 w-12 object-cover'
                  src='/users/user-7.jpeg'
                  alt='user'
                />
                <div className='flex flex-col'>
                  <p className='font-semibold'>{t('navid')}</p>
                  <div className='flex gap-1.5 items-center text-zinc-600'>
                    <Check className='h-4 w-4 stroke-[3px] text-primary' />
                    <p className='text-sm'>{t('purchase')}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* second user review */}
            <div className='flex flex-auto flex-col gap-4 lg:pr-8 xl:pr-20'>
              <div className='flex gap-0.5 mb-2'>
                <Star className='size-6 text-primary fill-primary' />
                <Star className='size-6 text-primary fill-primary' />
                <Star className='size-6 text-primary fill-primary' />
                <Star className='size-6 text-primary fill-primary' />
                <Star className='size-6 text-primary fill-primary' />
              </div>
              <div className='text-lg leading-8'>
                <p>
                  "{t('comment2Part1')}{' '}
                  <span className='p-0.5 bg-slate-800 text-white'>
                  {t('comment2Bold')}
                  </span>
                  {t('comment2Part2')}"
                </p>
              </div>
              <div className='flex gap-4 mt-2'>
                <img
                  className='rounded-full h-12 w-12 object-cover'
                  src='/users/user-6.jpeg'
                  alt='user'
                />
                <div className='flex flex-col'>
                  <p className='font-semibold'>{t('nima')}</p>
                  <div className='flex gap-1.5 items-center text-zinc-600'>
                    <Check className='h-4 w-4 stroke-[3px] text-primary' />
                    <p className='text-sm'>{t('purchase')}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </MaxWidthWrapper>

        <div className='pt-16'>
          <Reviews />
        </div>
      </section>
      <section>
        <MaxWidthWrapper className='py-24'>
          <div className='mb-12 px-6 lg:px-8'>
            <div className='mx-auto max-w-2xl sm:text-center'>
              <h2 className='order-1 mt-2 tracking-tight text-center text-balance !leading-tight font-bold text-5xl md:text-6xl rtl:text-4xl rtl:md:text-5xl text-zinc-800 dark:text-slate-50'>
              {t('uploadTitle')}{' '}
                <span className='relative px-2 bg-primary text-white dark:text-zinc-800'>
                {t('uploadTitleBold')}
                </span>{' '}
                {' '}{t('now')}
              </h2>
            </div>
          </div>

          <div className='mx-auto max-w-6xl px-6 lg:px-8'>
            <div className='relative flex flex-col items-center md:grid grid-cols-2 gap-40'>
              <img
              alt='arrow'
                src='/arrow.png'
                className='absolute top-[45rem] md:top-1/2 -translate-y-1/2 z-10 left-1/2 -translate-x-1/2 rotate-90 md:rotate-0 rtl:md:rotate-180'
              />

              <div className='relative h-[40rem] w-full md:justify-self-end max-w-sm rounded-xl bg-red-200'>
                <img
                alt='a couple'
                  src='/testimonials/darabad.jpeg'
                  className='rounded-xl object-cover h-full w-full'
                />
              </div>

              <Phone className='w-60' imgSrc='/testimonials/darabad.jpeg' />
            </div>
          </div>

          <ul className='mx-auto mt-12 max-w-prose sm:text-lg space-y-2 w-fit'>
            <li className='w-fit'>
              <Check className='h-5 w-5 text-primary inline mr-1.5' />
             {" "} {t('quality')}
            </li>
            <li className='w-fit'>
              <Check className='h-5 w-5 text-primary inline mr-1.5' />
              {" "}{t('scratch')}
            </li>
            <li className='w-fit'>
              <Check className='h-5 w-5 text-primary inline mr-1.5' />
              {" "}{t('wireless')}
            </li>
            <li className='w-fit'>
              <Check className='h-5 w-5 text-primary inline mr-1.5' />
              {" "} {t('guarantee')}
            </li>

            <div className='flex justify-center '>
              <Link
                className={buttonVariants({
                  size: 'lg',
                  className: 'mx-auto mt-8',
                })}
                href='/configure/upload'>
                {t('create')} 
                <ArrowRight className='h-4 w-4 ml-1.5 rtl:rotate-180' />
              </Link>
            </div>
          </ul>
        </MaxWidthWrapper>
      </section>
      <MaxWidthWrapper>
      <PWAModal show={showInstallModal} onClose={handleCloseModal} onInstall={handleInstallClick}/>
      </MaxWidthWrapper>
    </div>
  )
}
