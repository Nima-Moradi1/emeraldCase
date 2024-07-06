import { db } from '@/db'
import { notFound } from 'next/navigation'
import DesignPreview from './DesignPreview'

interface PageProps {
  searchParams: {
    // since we're passing query params into this page , we have to define it as a string or array of string
    // or even undefined if the query is not passed to the page
    [key: string]: string | string[] | undefined
  }
}

const Page = async ({ searchParams }: PageProps) => {
  const { id } = searchParams

  if (!id || typeof id !== 'string') {
    return notFound()
  }

  const configuration = await db.configuration.findUnique({
    where: { id },
  })

  if(!configuration) {
    return notFound()
  }

  return <DesignPreview configuration={configuration} />
}

export default Page
