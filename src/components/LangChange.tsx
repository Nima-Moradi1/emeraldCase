"use client"

import * as React from "react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ChevronDown, Globe2, GlobeIcon, Router } from "lucide-react"
import { useRouter } from "next/navigation"
import Cookies from "js-cookie"
import { useTranslations } from "next-intl"


export function LangChange() {
  const t = useTranslations('LangChange')
        const router = useRouter()
         // Initialize the selected language from the cookie or default to "en"
  const [selectedLanguage, setSelectedLanguage] = React.useState(() => {
    if (typeof window !== 'undefined') {
      return Cookies.get('NEXT_LOCALE') || 'en';
    }
    return 'en';
  });

  const handleLanguageChange = (value : string) => {
    setSelectedLanguage(value);
    Cookies.set('NEXT_LOCALE', value, { expires: 365 });
    router.push(`/${value}`);
    router.refresh();
  };


  return (
    <DropdownMenu >
    <DropdownMenuTrigger  className="bg-transparent border-slate-300 dark:border-zinc-700 hover:bg-transparent" asChild>
      <Button variant="outline">
        <GlobeIcon className="w-4"/>
        <ChevronDown className="w-4"/>
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent className="w-32 mt-2 bg-slate-200 dark:bg-zinc-900">
      <DropdownMenuLabel className="text-center">{t('language')}</DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuRadioGroup value={selectedLanguage} onValueChange={handleLanguageChange}>
        <DropdownMenuRadioItem value="en" className="flex rtl:flex-row-reverse gap-5 rtl:gap-2 items-center justify-start mx-1">
          <Globe2 />
          <span>{t('en')}</span>
        </DropdownMenuRadioItem>
        <DropdownMenuRadioItem value="fa" className="flex rtl:flex-row-reverse gap-5 rtl:gap-2 items-center justify-start mx-1">
          <Globe2 />
          <span>{t('fa')}</span>
        </DropdownMenuRadioItem>
      </DropdownMenuRadioGroup>
    </DropdownMenuContent>
  </DropdownMenu>
 
  )
}
