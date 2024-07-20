import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import Phone from '@/components/Phone';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

export default function NotFound() {
  const t = useTranslations('NotFound')
   return ( 
    <MaxWidthWrapper>
    <div className='flex items-center justify-center gap-20 dark:bg-background min-h-screen'>
      <div className='hidden lg:block'>
        <Phone className='w-60' imgSrc='/404.jpeg'/>
      </div>
        <div className="flex flex-col items-center justify-center gap-y-5
     dark:bg-background text-center"> 
    <h2 className="lg:hidden text-9xl font-bold text-gray-800 dark:text-gray-400">404</h2>
    <h1 className="text-3xl md:text-7xl font-bold text-gray-800 dark:text-gray-400">
      {t('subTitle')}
      </h1> 
    <p className="text-2xl text-gray-600 dark:text-gray-500 mt-4">
      {t('title')}</p> 
      <Link 
      className="mt-6 px-6 py-3 bg-primary text-white rounded-lg
       text-lg hover:text-primary hover:bg-zinc-700 dark:hover:bg-white transition-all duration-300"
      href="/"> 
     {t(
      'button'
     )}
       </Link> 
       </div> 
    </div>
    </MaxWidthWrapper>
       );
       }