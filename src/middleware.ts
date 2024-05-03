import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { decrypt } from '@/app/lib/session'
import { cookies } from 'next/headers'
import dotenv from 'dotenv';
 
// 1. Specify protected and public routes
const protectedRoutes = ['/api', '/cart']
const publicRoutes = ['/api/login', '/api/register',]
 
export default async function middleware(req: NextRequest) {
  console.log("middleware berjalan");
  // 2. Check if the current route is protected or public
  const Rawpath =  req.url.split('?')[0];
  const path = Rawpath.replace(`${process.env.BASE_URL}`, '');
  const isProtectedRoute = protectedRoutes.includes(path)
  const isPublicRoute = publicRoutes.includes(path)

  // 3. Decrypt the session from the cookie
  const cookie = cookies().get('session')?.value
  const session = await decrypt(cookie)
  
  // 5. Redirect to /login if the user is not authenticated
  if (isProtectedRoute && (typeof(session) == 'undefined')) {
    const url = req.nextUrl.clone()
    url.pathname = '/login'
    console.log("diarahkan ke /login;")
    return NextResponse.rewrite(url)
  }
 
  // 6. Redirect to /dashboard if the user is authenticated
  if (
    isPublicRoute &&
    session?.userId &&
    !req.url.startsWith('/dashboard')
  ) {
    console.log("kena ini")
    return NextResponse.redirect(new URL('/', req.url))
  }
  console.log("lolos")
  return NextResponse.next()
}
 
// Routes Middleware should not run on
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}