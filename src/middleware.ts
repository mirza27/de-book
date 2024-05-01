import { NextRequest, NextResponse } from 'next/server'
import { decrypt } from '@/app/lib/session'
import { cookies } from 'next/headers'
 
// 1. Specify protected and public routes
const protectedRoutes = ['/api/book']
const publicRoutes = ['/api/login', '/api/register',]
 
export default async function middleware(req: Request) {
  // 2. Check if the current route is protected or public
  const path = req.url
  const isProtectedRoute = protectedRoutes.includes(path)
  const isPublicRoute = publicRoutes.includes(path)
  console.log(path);

  if (path == '/'){
    return NextResponse.redirect('/dashboard')
  }
 
  // 3. Decrypt the session from the cookie
  const cookie = cookies().get('session')?.value
  const session = await decrypt(cookie)
 
  // 5. Redirect to /login if the user is not authenticated
  if (isProtectedRoute && !session?.userId) {
    return NextResponse.redirect(new URL('/login', req.url))
  }
 
  // 6. Redirect to /dashboard if the user is authenticated
  if (
    isPublicRoute &&
    session?.userId &&
    !req.url.startsWith('/dashboard')
  ) {
    return NextResponse.redirect(new URL('/', req.url))
  }
 
  return NextResponse.next()
}
 
// Routes Middleware should not run on
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}