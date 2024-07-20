"use client"

import Link from 'next/link'
import MaxWidthWrapper from './MaxWidthWrapper'
import { buttonVariants } from './ui/button'
import { ArrowRight } from 'lucide-react'
import { useTranslations } from 'next-intl'
import DarkModeToggle from './ui/darkModeToggle'
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs'
import { LangChange } from './LangChange'


const Navbar = () => {
  const t = useTranslations('Navbar');
  const { user } = useKindeBrowserClient()
  const isAdmin = user?.email === process.env.ADMIN_EMAIL
  return (
    <nav className='sticky z-[100] h-14 inset-x-0 top-0 w-full border-b border-gray-300 bg-slate-200 dark:bg-background backdrop-blur-lg transition-all'>
      <MaxWidthWrapper>
        <div className='flex h-14 items-center justify-between border-b border-gray-300'>
          <Link href='/' className=' z-40 font-semibold rtl:flex-row-reverse'>
            <span className='text-sm mt-[1.9px]'>emerald</span><span className='text-primary'>case</span>
          </Link>

          <div className='h-full flex items-center space-x-4'>
            {user ? (
              <>
                <Link
                  href='/api/auth/logout'
                  className={buttonVariants({
                    size: 'sm',
                    variant: 'outline',
                    className : "bg-transparent hover:bg-transparent mx-1 border border-slate-300"
                  })}>
                  {t("signOut")}
                </Link>
                <div className='h-8 w-px bg-zinc-400 block' />
                {isAdmin ? (
                  <Link
                    href='/dashboard'
                    className={buttonVariants({
                      size: 'sm',
                      variant: 'ghost',
                    })}>
                    {t(
                      "dashboard"
                    )} ✨
                  </Link>
                ) : null}
                <Link
                  href='/configure/upload'
                  className={buttonVariants({
                    size: 'sm',
                    className: 'hidden sm:flex items-center gap-1',
                  })}>
                  {t("button")}
                  <ArrowRight className='ml-1.5 h-5 w-5 rtl:rotate-180' />
                </Link>
                <DarkModeToggle />
                <LangChange />
              </>
            ) : (
              <>
                <Link
                  href='/api/auth/register'
                  className={buttonVariants({
                    size: 'sm',
                    variant: 'ghost',
                     className : 'hidden md:flex'
                  }) }>
                  {t("signup")}
                </Link>

                <Link
                  href='/api/auth/login'
                  className={buttonVariants({
                    size: 'sm',
                    variant: 'ghost',
                  })}>
                  {t(
                    "login"
                  )}
                </Link>

                <div className='h-8 w-px bg-zinc-400 hidden sm:block' />

                <Link
                  href='/configure/upload'
                  className={buttonVariants({
                    size: 'sm',
                    className: 'hidden sm:flex items-center gap-1',
                  })}>
                  {t("button")}
                  <ArrowRight className='ml-1.5 h-5 w-5 rtl:rotate-180' />
                </Link>
                <DarkModeToggle />
                <LangChange />
              </>
            )}
          </div>
        </div>
      </MaxWidthWrapper>
    </nav>
  )
}

export default Navbar
