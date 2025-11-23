import { SignUp } from '@clerk/nextjs'
import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { AuthGuard } from '@/components/auth/AuthGuard'

export default async function Page() {
  const user = await currentUser()
  
  // Redirect signed-in users to home page on server side
  if (user) {
    redirect('/')
  }
  
  return (
    <AuthGuard>
      <SignUp 
        afterSignUpUrl="/onboarding"
        afterSignInUrl="/"
      />
    </AuthGuard>
  )
}   