'use client'

import { useQuery } from '@tanstack/react-query'
import { getPaymentStatus } from './actions'
import { useSearchParams } from 'next/navigation'
import { Loader2 } from 'lucide-react'
import PhonePreview from '@/components/PhonePreview'
import { formatPrice } from '@/lib/utils'
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs'
import { useTranslations } from 'next-intl'

const ThankYou = () => {
  // we get the orderId from the url with searchParams
  const searchParams = useSearchParams()
  const orderId = searchParams.get('orderId') || ''
  const {getUser} = useKindeBrowserClient()
  const t = useTranslations('ThankYouPage')
  const user = getUser()
  const { data } = useQuery({
    queryKey: ['get-payment-status'],
    queryFn: async () => await getPaymentStatus({ orderId }),
    retry: true,
    retryDelay: 500,
  })
// so this is phase1 , the loading state (we still don't have the payment status from stripe)
  if (data === undefined) {
    return (
      <div className='w-full mt-24 flex justify-center'>
        <div className='flex flex-col items-center gap-2'>
          <Loader2 className='h-8 w-8 animate-spin text-zinc-500' />
          <h3 className='font-semibold text-xl md:text-2xl'>{t('loadingTitle')}</h3>
          <p>{t('loadingSub')}</p>
        </div>
      </div>
    )
  }
// here, we're still waiting for our database to update the status of payment, so we still
// do not have the isPaid property to be true... (not yet paid on database)
  if (data === false) {
    return (
      <div className='w-full mt-24 flex justify-center'>
        <div className='flex flex-col items-center gap-2'>
          <Loader2 className='h-8 w-8 animate-spin text-zinc-500' />
          <h3 className='font-semibold text-xl md:text-2xl'>{t('verifyTitle')}</h3>
          <p>{t(
            'verifySub'
          )}</p>
        </div>
      </div>
    )
  }

  const { configuration, billingAddress, shippingAddress, amount } = data
  const { color } = configuration

  return (
    <div className='bg-white dark:bg-background'>
      <div className='mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8'>
        <div className='max-w-xl'>
          <p className='text-lg sm:text-3xl font-medium text-primary capitalize'>{t('thanks')}, {user?.given_name}!</p>
          <h1 className='mt-2 text-4xl font-bold tracking-tight sm:text-5xl'>
            {t(
              'case'
            )}
          </h1>
          <p className='mt-2 text-base text-zinc-500 dark:text-zinc-300'>
            {t('process')}
          </p>

          <div className='mt-12 text-sm font-medium'>
            <p className='text-zinc-900 dark:text-zinc-300'>{t('orderNum')}</p>
            <p className='mt-2 text-zinc-500'>{orderId}</p>
          </div>
        </div>

        <div className='mt-10 border-t border-zinc-200'>
          <div className='mt-10 flex flex-auto flex-col'>
            <h4 className='font-semibold lg:text-2xl text-zinc-900 dark:text-zinc-300'>
             {t(
              'choice'
             )}
            </h4>
            <p className='mt-2 text-sm text-zinc-600 dark:text-zinc-400'>
             {t('choiceSub')}
            </p>
          </div>
        </div>

        <div className='flex space-x-6 overflow-hidden mt-4 rounded-xl bg-gray-900/5 dark:bg-gray-900/65 ring-1 ring-inset ring-gray-900/10 lg:rounded-2xl'>
          <PhonePreview
            croppedImageUrl={configuration.croppedImageUrl!}
            color={color!}
          />
        </div>

        <div>
          <div className='grid grid-cols-2 gap-x-6 py-10 text-sm'>
            <div>
              <p className='font-medium text-gray-900 dark:text-zinc-400'>{t('shipping')}</p>
              <div className='mt-2 text-zinc-700 dark:text-zinc-500'>
                <address className='not-italic'>
                  <span className='block'>{shippingAddress?.name}</span>
                  <span className='block'>{shippingAddress?.street}</span>
                  <span className='block'>
                    {shippingAddress?.postalCode} {shippingAddress?.city}
                  </span>
                </address>
              </div>
            </div>
            <div>
              <p className='font-medium text-gray-900 dark:text-zinc-400'>{t('billing')}</p>
              <div className='mt-2 text-zinc-700 dark:text-zinc-500'>
                {/* we're using address tag for better semantic html practice! */}
                <address className='not-italic'>
                  <span className='block'>{billingAddress?.name}</span>
                  <span className='block'>{billingAddress?.street}</span>
                  <span className='block'>
                    {billingAddress?.postalCode} {billingAddress?.city}
                  </span>
                </address>
              </div>
            </div>
          </div>

          <div className='grid grid-cols-2 gap-x-6 border-t border-zinc-200 py-10 text-sm'>
            <div>
              <p className='font-medium text-zinc-900 dark:text-zinc-300'>{t('payment')}</p>
              <p className='mt-2 text-zinc-700 dark:text-zinc-400'>{t('status')}</p>
            </div>

            <div>
              <p className='font-medium text-zinc-900 dark:text-zinc-300'>{t('shipMethod')}</p>
              <p className='mt-2 text-zinc-700 dark:text-zinc-400'>
                {t('shipSub')}
              </p>
            </div>
          </div>
        </div>

        <div className='space-y-6 border-t border-zinc-200 pt-10 text-sm'>
          <div className='flex justify-between'>
            <p className='font-medium text-zinc-900 dark:text-zinc-300'>{t('subTotal')}</p>
            <p className='text-zinc-700 dark:text-zinc-400'>{formatPrice(amount)}</p>
          </div>
          <div className='flex justify-between'>
            <p className='font-medium text-zinc-900 dark:text-zinc-300'>{t('shipping2')}</p>
            <p className='text-zinc-700 dark:text-zinc-400'>{formatPrice(0)}</p>
          </div>
          <div className='flex justify-between'>
            <p className='font-medium text-zinc-900 dark:text-zinc-300'>{t('total')}</p>
            <p className='text-zinc-700 dark:text-zinc-400'>{formatPrice(amount)}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ThankYou
