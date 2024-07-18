'use client'

import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { getAuthStatus } from './actions'
import { useRouter } from 'next/navigation'
import { Loader2 } from 'lucide-react'
import { useTranslations } from 'next-intl'
const Page = () => {
  const [configId, setConfigId] = useState<string | null>(null)
  const router = useRouter()
  useEffect(() => {
    const configurationId = localStorage.getItem('configurationId')
    if (configurationId) setConfigId(configurationId)
  }, [])

  const { data } = useQuery({
    queryKey: ['auth-callback'],
    queryFn: async () => await getAuthStatus(),
    retry: true,
    retryDelay: 500,
  })

  if (data?.success) {
    if (configId) {
      localStorage.removeItem('configurationId')
      router.push(`/configure/preview?id=${configId}`)
    } else {
      router.push(`/`)
    }
  }
const t = useTranslations('Auth-Callback')
  return (
    <div className='w-full mt-24 flex justify-center'>
      <div className='flex flex-col items-center gap-2 gap-y-5 justify-center min-h-[60vh]'>
        <Loader2 className='h-8 w-8 animate-spin text-zinc-500 dark:text-gray-100' />
        <h3 className='font-semibold text-xl'>{t('title')}</h3>
        <p>{t('subTitle')}</p>
      </div>
    </div>
  )
}

export default Page
