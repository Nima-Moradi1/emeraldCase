"use client"

import * as React from "react"
import { MoonIcon, SunIcon } from "@radix-ui/react-icons"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useTranslations } from "next-intl"
import { ChevronUp } from "lucide-react"

const DarkModeToggle = () => {
  const { setTheme } = useTheme()
  const t = useTranslations('DarkToggle')
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="bg-transparent hover:bg-slate-300/30 border border-zinc-300 dark:border-zinc-700">
        <Button variant="outline" size="icon">
          <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">{t('toggle')}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-slate-100/50 backdrop-blur-sm dark:bg-background mt-3">
      <div className="absolute -mt-5 ml-24">
          <ChevronUp className="text-slate-300 dark:text-slate-600"/>
        </div>
        <DropdownMenuItem onClick={() => setTheme("light")}>
          {t('light')}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
        {t('dark')}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default DarkModeToggle