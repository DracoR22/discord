import './globals.css'
import type { Metadata } from 'next'
import { Open_Sans } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'
import { dark } from '@clerk/themes'
import { ThemeProvider } from '@/components/providers/ThemeProvider'
import { cn } from '@/lib/utils'
import ModalProvider from '@/components/providers/ModalProvider'

const font = Open_Sans({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Discord',
  description: 'discord.com',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider appearance={{ baseTheme: dark }}>
    <html lang="en" suppressHydrationWarning>
      <body className={cn(font.className, 'bg-white dark:bg-[#313338]')}>
        <ThemeProvider attribute='class' defaultTheme='dark' enableSystem={false} storageKey='discord-theme'>
          <ModalProvider/>
            {children}
        </ThemeProvider>
      </body>
    </html>
    </ClerkProvider>
  )
}
