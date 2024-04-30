// Mengambil data user dari cookies session saat melakukan request API server

import 'server-only'
 
import { cookies } from 'next/headers'
import { decrypt } from '@/app/lib/session'
import { cache } from 'react'
import { redirect } from 'next/navigation'
import prisma from '../../../prisma'
 
export const verifySession = cache(async () => {
  const cookie = cookies().get('session')?.value
  const session = await decrypt(cookie)
 
  if (!session?.userId) {
    redirect('/login')
  }
 
  return { isAuth: true, userId: parseInt(session.userId as string) } 
})

export const getUser = cache(async () => {
    const session = await verifySession()
    if (!session) return null
   
    try {
      const data = await prisma.user.findFirst({
        where: {
            user_id: session.userId
        },
      })
   
      const user = data
  //  console.log(user)
      return user

    } catch (error) {
      console.log('Failed to fetch user, ', error)
      return null
    }
  })