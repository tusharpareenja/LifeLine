'use server'

import { signIn } from '@/lib/auth'  // Import your signIn logic

export async function handleGoogleSignIn() {
  await signIn("google",{redirectTo: '/admin/dashboard'} )  // Perform GitHub sign-in on the server
}
