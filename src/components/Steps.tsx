'use client'

import { cn } from '@/lib/utils'
import { usePathname } from 'next/navigation'

const STEPS = [
  {
    name: 'Step 1: Add image',
    description: 'Choose an image for your case',
    url: '/upload/',
  },
  {
    name: 'Step 2: Customize design',
    description: 'Make the case yours',
    url: '/design/',
  },
  {
    name: 'Step 3: Summary',
    description: 'Review your final design',
    url: '/preview/',
  },
]
const STEPS_FA = [
  {
    name: 'مرحله ۱: افزودن تصویر دلخواه',
    description: 'تصویر مورد نظرتون رو برای قاب انتخاب کنید',
    url: '/upload/',
  },
  {
    name: 'مرحله ۲: شخصی سازی دیزاین',
    description: 'قاب خودت رو بساز',
    url: '/design/',
  },
  {
    name: 'مرحله ۳: خلاصه سفارش',
    description: 'دیزاین نهایی خودتون رو بررسی کنید',
    url: '/preview/',
  },
]
const Steps = () => {
  const pathname = usePathname()
  const locale = pathname.split('/')[1]
  return (
    <ol className='rounded-md bg-slate-200 dark:bg-background lg:flex lg:rounded-none lg:border-l lg:border-r lg:border-gray-200 dark:lg:border-zinc-700'>
      {locale === "en" ? 
      <>{STEPS.map((step, i) => {
        const isCurrent = pathname.endsWith(step.url)
        const isCompleted = STEPS.slice(i + 1).some((step) =>
          pathname.endsWith(step.url)
        )
        const imgPath = `/snake-${i + 1}.png`

        return (
          <li key={step.name} className='relative overflow-hidden lg:flex-1'>
            <div>
              <span
                className={cn(
                  'absolute left-0 top-0 h-full w-1 bg-zinc-400 dark:bg-zinc-500 lg:bottom-0 lg:top-auto lg:h-1 lg:w-full',
                  {
                    'bg-zinc-700 dark:bg-zinc-300 ': isCurrent , 
                    'bg-green-500 dark:bg-green-500' : isCompleted
                  }
                )}
                aria-hidden='true'
              />

              <span
                className={cn(
                  i !== 0 ? 'lg:pl-9' : '',
                  'flex items-center px-6 py-4 text-sm font-medium'
                )}>
                <span className='flex-shrink-0'>
                  <img
                  alt=''
                    src={imgPath}
                    className={cn(
                      'flex h-20 w-20 object-contain items-center justify-center',
                      {
                        'border-none': isCompleted,
                        'border-zinc-700 dark:border-zinc-400': isCurrent,
                      }
                    )}
                  />
                </span>

                <span className='ml-4 h-full mt-0.5 flex min-w-0 flex-col justify-center'>
                  <span
                    className={cn('text-sm font-semibold text-zinc-400 dark:text-zinc-600', {
                      'text-zinc-700 dark:text-zinc-300': isCurrent,
                      'text-green-500 dark:text-green-500' : isCompleted
                    })}>
                    {step.name}
                  </span>
                  <span className={cn('text-sm text-zinc-400 dark:text-zinc-600',
                    {'text-zinc-500 dark:text-zinc-400' : isCurrent,
                      '' : isCompleted
                    }
                  )}>
                    {step.description}
                  </span>
                </span>
              </span>

              {/* separator */}
              {i !== 0 ? (
                <div className='absolute inset-0 hidden w-3 lg:block'>
                  <svg
                    className='h-full w-full text-gray-300'
                    viewBox='0 0 12 82'
                    fill='none'
                    preserveAspectRatio='none'>
                    <path
                      d='M0.5 0V31L10.5 41L0.5 51V82'
                      stroke='currentcolor'
                      vectorEffect='non-scaling-stroke'
                    />
                  </svg>
                </div>
              ) : null}
            </div>
          </li>
        )
      })}</> : 
      <>{STEPS_FA.map((step, i) => {
        const isCurrent = pathname.endsWith(step.url)
        const isCompleted = STEPS.slice(i + 1).some((step) =>
          pathname.endsWith(step.url)
        )
        const imgPath = `/snake-${i + 1}.png`

        return (
          <li key={step.name} className='relative overflow-hidden lg:flex-1'>
            <div className='bg-slate-200 dark:bg-background'>
              <span
                className={cn(
                  'absolute left-0 top-0 h-full w-1 bg-zinc-400 dark:bg-zinc-500 lg:bottom-0 lg:top-auto lg:h-1 lg:w-full',
                  {
                    'bg-zinc-700 dark:bg-zinc-300 ': isCurrent , 
                    'bg-green-500 dark:bg-green-500' : isCompleted
                  }
                )}
                aria-hidden='true'
              />

              <span
                className={cn(
                  i !== 0 ? 'lg:pl-9' : '',
                  'flex items-center px-6 py-4 text-sm font-medium'
                )}>
                <span className='flex-shrink-0'>
                  <img
                  alt=''
                    src={imgPath}
                    className={cn(
                      'flex h-20 w-20 object-contain items-center justify-center',
                      {
                        'border-none': isCompleted,
                        'border-zinc-700 dark:border-zinc-400': isCurrent,
                      }
                    )}
                  />
                </span>

                <span className='ml-4 h-full mt-0.5 flex min-w-0 flex-col justify-center'>
                  <span
                    className={cn('text-sm font-semibold text-zinc-400 dark:text-zinc-600 mx-3', {
                      'text-zinc-700 dark:text-zinc-300': isCurrent,
                      'text-green-500 dark:text-green-500' : isCompleted
                    })}>
                    {step.name}
                  </span>
                  <span className={cn('text-sm text-zinc-400 dark:text-zinc-600 mx-2',
                    {'text-zinc-500 dark:text-zinc-400' : isCurrent,
                      '' : isCompleted
                    }
                  )}>
                    {step.description}
                  </span>
                </span>
              </span>

              {/* separator */}
              {i !== 0 ? (
                <div className='absolute inset-0 hidden w-3 lg:block'>
                  <svg
                    className='h-full w-full text-gray-300'
                    viewBox='0 0 12 82'
                    fill='none'
                    preserveAspectRatio='none'>
                    <path
                      d='M0.5 0V31L10.5 41L0.5 51V82'
                      stroke='currentcolor'
                      vectorEffect='non-scaling-stroke'
                    />
                  </svg>
                </div>
              ) : null}
            </div>
          </li>
        )
      })}</> }
      
    </ol>
  )
}

export default Steps
