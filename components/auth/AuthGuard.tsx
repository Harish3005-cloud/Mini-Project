"use client"

import { SignedIn, SignedOut } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export function AuthRedirect() {
  const router = useRouter()
  
  useEffect(() => {
    router.replace('/')
  }, [router])
  
  return null
}

export function AuthGuard({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SignedIn>
        <AuthRedirect />
      </SignedIn>
      <SignedOut>
        {children}
      </SignedOut>
    </>
  )
}

