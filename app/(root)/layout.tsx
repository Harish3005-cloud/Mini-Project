import { type Metadata } from 'next'
import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs'
import { Geist, Geist_Mono } from 'next/font/google'
import '../globals.css'
import Topbar from '@/components/shared/Topbar'
import Leftsidebar from '@/components/shared/Leftsidebar'
import Rightsidebar from '@/components/shared/Rightsidebar'
import Bottombar from '@/components/shared/Bottombar'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})


export const metadata: Metadata = {
  title: "CampusConnect",
  description: "A Next.js 13 Meta Application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          <header className="flex justify-end items-center p-4 gap-4 h-16">
            <SignedOut>
              <UserButton />
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </header>
          <Topbar/>

          <main className="flex flex-row">
            <Leftsidebar/>
            
            <section className="main-container">
              <div className="w-full max-w-4xl">
                {children}
              </div>
            </section>
            
            <Rightsidebar/>
          </main>
          
          <Bottombar/>
        </body>
      </html>
    </ClerkProvider>
  )
}