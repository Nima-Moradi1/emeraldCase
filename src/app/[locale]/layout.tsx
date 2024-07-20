import { Recursive } from 'next/font/google'
import '../globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { Toaster } from '@/components/ui/toaster'
import Providers from '@/components/Providers'
import { constructMetadata } from '@/lib/utils'
import {NextIntlClientProvider} from 'next-intl'
import { getMessages } from 'next-intl/server'
import { ThemeProvider } from "@/components/ui/themeProvider"

const recursive = Recursive({ subsets: ['latin'] })
export const metadata = constructMetadata()

export default async function RootLayout({
  children,
  params: {locale}
}: Readonly<{
  children: React.ReactNode
  params: {locale:string}
}>) {
  const messages = await getMessages()
  return (
    <html lang={locale} dir={locale == 'fa' ? 'rtl' : "ltr"}>
      <body className={`${locale === 'en' ? `${recursive.className}` : ''}`}>
        <NextIntlClientProvider messages={messages}>
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
        <Navbar />
        <main className='flex flex-col min-h-[calc(100vh-3.5rem-1px)] bg-slate-200 dark:bg-background'>
          <div className='flex-1 flex flex-col h-full rtl:tracking-wider '>
            <Providers>{children}</Providers>
          </div>
          <Footer />
        </main>
        <Toaster />
        </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
