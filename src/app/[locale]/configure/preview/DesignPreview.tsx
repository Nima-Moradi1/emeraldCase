'use client'

import Phone from '@/components/Phone'
import { Button } from '@/components/ui/button'
import { BASE_PRICE, PRODUCT_PRICES } from '@/config/products'
import { cn, formatPrice } from '@/lib/utils'
import { COLORS, FINISHES, MODELS } from '@/validators/option-validator'
import { Configuration } from '@prisma/client'
import { useMutation } from '@tanstack/react-query'
import { ArrowRight, Check } from 'lucide-react'
import { useEffect, useState } from 'react'
import Confetti from 'react-dom-confetti'
import { createCheckoutSession } from './actions'
import { useRouter } from 'next/navigation'
import { useToast } from '@/components/ui/use-toast'
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs'
import LoginModal from '@/components/LoginModal'
import { useTranslations } from 'next-intl'

const DesignPreview = ({ configuration }: { configuration: Configuration }) => {
  const router = useRouter()
  const { toast } = useToast()
  const { id } = configuration
  const { user } = useKindeBrowserClient()
  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false)
  const [showConfetti, setShowConfetti] = useState<boolean>(false)
  
  useEffect(() => setShowConfetti(true),[])
  const { color, model, finish, material } = configuration

  const tw = COLORS.find((supportedColor) => supportedColor.value === color)?.tw

  const { label: modelLabel } = MODELS.options.find(
    /* @ts-ignore */
    ({ value }) => value === model
  )!

  let totalPrice = BASE_PRICE
  if (material === 'polycarbonate')
    totalPrice += PRODUCT_PRICES.material.polycarbonate
  if (finish === 'textured') totalPrice += PRODUCT_PRICES.finish.textured

  const { mutate: createPaymentSession , isPending } = useMutation({
    mutationKey: ['get-checkout-session'],
    mutationFn: createCheckoutSession,
    onSuccess: ({ url }) => {
      if (url) router.push(url)
      else throw new Error('Unable to retrieve payment URL.')
    },
    onError: () => {
      toast({
        title: 'Something went wrong',
        description: 'There was an error on our end. Please try again.',
        variant: 'destructive',
      })
    },
  })

  const handleCheckout = () => {
    if (user) {
      // create payment session
      createPaymentSession({ configId: id })
    } else {
      // need to log in
      //we're getting the id from desctructuring the id from configuration
      localStorage.setItem('configurationId', id)
      setIsLoginModalOpen(true)
    }
  }
// translation 
const t = useTranslations('PreviewPage');
  return (
    <>
      <div
        aria-hidden='true'
        className='pointer-events-none select-none absolute inset-0 overflow-hidden flex justify-center'>
          {/* confetti is the celebration we get when everything works in preview page */}
        <Confetti
          active={showConfetti}
          config={{ elementCount: 700, spread: 130 }}
        />
      </div>

      <LoginModal isOpen={isLoginModalOpen} setIsOpen={setIsLoginModalOpen} />

      <div className='mt-20 flex flex-col items-center md:grid text-sm sm:grid-cols-12 sm:grid-rows-1 sm:gap-x-6 md:gap-x-8 lg:gap-x-12'>
        <div className='md:col-span-4 lg:col-span-3 md:row-span-2 md:row-end-2'>
          <Phone
            className={cn(`bg-${tw}`, "max-w-[150px] md:max-w-full")}
            imgSrc={configuration.croppedImageUrl!}
          />
        </div>

        <div className='mt-6 sm:col-span-9 md:row-end-1'>
          <h3 className='text-3xl font-bold tracking-tight text-gray-900 dark:text-white'>
       { t('your')}  {modelLabel} {t('case')}
          </h3>
          <div className='mt-3 flex items-center gap-1.5 text-base'>
            <Check className='h-4 w-4 text-primary dark:text-primary' />
            {t('available')}
          </div>
        </div>

        <div className='sm:col-span-12 md:col-span-9 text-base'>
          <div className='grid grid-cols-1 gap-y-8 border-b border-gray-200 py-8 sm:grid-cols-2 sm:gap-x-6 sm:py-6 md:py-10'>
            <div>
              <p className='font-medium text-primary'> {t('highlights')}</p>
              <ol className='mt-3 text-zinc-700 dark:text-gray-200 list-disc list-inside'>
                <li> {t('wireless')}</li>
                <li> {t('tpu')}</li>
                <li> {t('packaging')}</li>
                <li> {t('warranty')}</li>
              </ol>
            </div>
            <div>
              <p className='font-medium text-primary'> {t('material')}</p>
              <ol className='mt-3 text-zinc-700 dark:text-gray-200 list-disc list-inside'>
                <li> {t('quality')}</li>
                <li> {t('resistance')}</li>
              </ol>
            </div>
          </div>

          <div className='mt-8'>
            <div className='bg-slate-200 border border-slate-400 dark:bg-zinc-800 p-6 sm:rounded-lg sm:p-8'>
              <div className='flow-root text-sm'>
                <div className='flex items-center justify-between py-1 mt-2'>
                  <p className='text-gray-600 dark:text-gray-100'> {t('base')}</p>
                  <p className='font-medium text-gray-900 dark:text-gray-100'>
                    {formatPrice(BASE_PRICE / 100)}
                  </p>
                </div>

                {finish === 'textured' ? (
                  <div className='flex items-center justify-between py-1 mt-2'>
                    <p className='text-gray-600 dark:text-gray-100'> {t('textured')}</p>
                    <p className='font-medium text-gray-900 dark:text-gray-100'>
                      {formatPrice(PRODUCT_PRICES.finish.textured / 100)}
                    </p>
                  </div>
                ) : null}

                {material === 'polycarbonate' ? (
                  <div className='flex items-center justify-between py-1 mt-2'>
                    <p className='text-gray-600 dark:text-gray-100'> {t('polycarbonate')}</p>
                    <p className='font-medium text-gray-900 dark:text-gray-100'>
                      {formatPrice(PRODUCT_PRICES.material.polycarbonate / 100)}
                    </p>
                  </div>
                ) : null}

                <div className='my-2 h-px bg-gray-200' />

                <div className='flex items-center justify-between py-2'>
                  <p className='font-bold text-gray-900 dark:text-gray-100'> {t('total')}</p>
                  <p className='font-bold text-gray-900 dark:text-gray-100'>
                    {formatPrice(totalPrice / 100)}
                  </p>
                </div>
              </div>
            </div>
            <div className='flex-col items-center justify-start text-xs text-zinc-500 dark:text-zinc-300 mt-5'>
            <p>
            {t('note')} <span className='text-primary'>Stripe</span>  {t('testMode')}</p>
            <p> {t('address')}</p>
            <p> {t('card')}</p>
            <p> {t('exp')}</p>
            <p> {t('cvv2')}</p>
            </div>
          <div className='mt-8 flex justify-end pb-12'>
              <Button
              isLoading={isPending}
              loadingText={t('loading')}
              disabled={isPending}
                onClick={() => handleCheckout()}
                className={` ${isPending ? "opacity-50" : 'px-4 sm:px-6 lg:px-8'} `}>
                 {t('checkout')} <ArrowRight className='h-4 w-4 ml-1.5 inline rtl:rotate-180 rtl: mr-1.5' />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default DesignPreview
