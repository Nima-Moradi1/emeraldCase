import { type ClassValue, clsx } from 'clsx'
import { Metadata } from 'next'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatPrice = (price: number) => {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  })

  return formatter.format(price)
}

// export function constructMetadata({
//   title = 'EmeraldCase - custom high-quality phone cases',
//   description = 'Create custom high-quality phone cases in seconds',
//   image = '/thumbnail.png',
//   icons = '/favicon.ico',
// }: {
//   title?: string
//   description?: string
//   image?: string
//   icons?: string
// } = {}): Metadata {
//   return {
//     title,
//     description,
//     openGraph: {
//       title,
//       description,
//       images: [{ url: image }],
//     },
//     icons,
//     metadataBase: new URL("https://emerald-case.vercel.app/")
//   }
// }

const APP_NAME = "EmeraldCase";
const APP_DEFAULT_TITLE = "EmeraldCase";
const APP_TITLE_TEMPLATE = "%s - PWA App";
const APP_DESCRIPTION = "Customize your Case to your own Interest!";

export const constructMetadata: Metadata = {
  applicationName: APP_NAME,
  title: {
    default: APP_DEFAULT_TITLE,
    template: APP_TITLE_TEMPLATE,
  },
  description: APP_DESCRIPTION,
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: APP_DEFAULT_TITLE,
    // startUpImage: [],
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: "website",
    siteName: APP_NAME,
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
  twitter: {
    card: "summary",
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
};
