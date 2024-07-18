"use client"

import { usePathname } from "next/navigation"

export const useFetchLocale = () => {
    const path = usePathname()
    const locale = path.split('/')[1]
    return locale as string
  }