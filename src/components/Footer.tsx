import Link from 'next/link'
import MaxWidthWrapper from './MaxWidthWrapper'
import { useTranslations } from 'next-intl'

const Footer = () => {
  const t = useTranslations('Footer');
  return (
    <footer className='bg-slate-200 dark:bg-background h-20 relative'>
      <MaxWidthWrapper>
        <div className='border-t border-gray-200' />

        <div className='h-full flex flex-col md:flex-row md:justify-between justify-center items-center'>
          <div className='text-center md:text-left pb-2 md:pb-0'>
            <div className='flex gap-x-2 rtl:flex-row-reverse text-sm text-muted-foreground'>
              <p>&copy; {new Date().getFullYear()} </p>
              <p>  {t('title')}</p>
            </div>
          </div>

          <div className='flex items-center justify-center'>
            <div className='flex gap-x-10'>
              <Link
                href='#'
                className='text-sm text-muted-foreground hover:text-gray-600'>
                {t('terms')}
              </Link>
              <Link
                href='#'
                className='text-sm text-muted-foreground hover:text-gray-600'>
                {t('privacy')}
              </Link>
              <Link
                href='#'
                className='text-sm text-muted-foreground hover:text-gray-600'>
                {t('cookie')}
              </Link>
            </div>
          </div>
        </div>
      </MaxWidthWrapper>
    </footer>
  )
}

export default Footer
