import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Sidebar from '@/components/Sidebar'

import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { Inter } from 'next/font/google'
import { cn } from '@/utils/style'
import { useState } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const inter = Inter({ subsets: ['latin'] })

const queryClient = new QueryClient()

export default function App({ Component, pageProps }: AppProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  return (
    <QueryClientProvider client={queryClient}>
      <div
        className={cn(
          'flex h-screen w-screen text-sm lg:text-base',
          inter.className,
        )}
      >
        <Sidebar close={() => setIsSidebarOpen(false)} isOpen={isSidebarOpen} />
        <div className="flex flex-1 flex-col">
          <Header
            isSidebarOpen={isSidebarOpen}
            setIsSidebarOpen={setIsSidebarOpen}
          />
          <div className="flex flex-1 flex-col overflow-y-auto">
            <main className="flex flex-1 flex-col">
              <Component {...pageProps} />
            </main>
            <Footer />
          </div>
        </div>
      </div>
    </QueryClientProvider>
  )
}
