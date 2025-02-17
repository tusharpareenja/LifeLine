'use server'

import { signIn } from '@/auth'  // Import your signIn logic
import { redirect } from 'next/navigation'  // Correct Next.js redirect

export async function handleGoogleSignIn() {
  await signIn("google", {redirectTo: '/doctor/dashboard'})  // Perform Google sign-in on the server
 // Redirect after sign-in
}
