import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { decrypt, updateSession } from '@/app/lib/session';
import { cookies } from 'next/headers';

// 1. Specify protected and public routes using regex
const protectedRoutes = [/^\/api/, /^\/dashboard\/cart/, /^\/dashboard\/book(\/\d+)?$/];
const publicRoutes = ['/api/login', '/api/register'];

export default async function middleware(req: NextRequest) {
  console.log("middleware berjalan");

  // 2. Check if the current route is protected or public
  const Rawpath = req.url.split('?')[0];
  const path = Rawpath.replace(`${process.env.BASE_URL}`, '');
  const isProtectedRoute = protectedRoutes.some(route => route.test(path));
  const isPublicRoute = publicRoutes.includes(path);
  const isAdminRoute = path.startsWith('/admin/');

  // 3. Decrypt the session from the cookie
  const cookie = cookies().get('session')?.value;
  const session = await decrypt(cookie);

  // 4. Parse the admin status from the cookie
  const isAdmin = session?.isAdmin == true;
  console.log(session);
  console.log(isAdmin);

  // 5. Redirect to /login if the user is not authenticated
  if (isProtectedRoute && (typeof session === 'undefined')) {
    // jika cookie kosong hapus session next auth

    const url = req.nextUrl.clone();
    url.pathname = '/login';
    console.log("diarahkan ke /login;");
    return NextResponse.rewrite(url);
  }

  // 6. Restrict access to admin routes if user is not an admin
  if (isAdminRoute && !isAdmin) {
    const url = req.nextUrl.clone();
    url.pathname = '/403'; // Redirect to a "403 Forbidden" page or any other page
    console.log("Access to admin route denied.");
    return NextResponse.rewrite(url);
  }


  // 7. Redirect to /dashboard if the user is authenticated
  if (
    isPublicRoute &&
    session?.userId &&
    !req.url.startsWith('/dashboard')
  ) {
    // update sesson
    updateSession();

    console.log("kena ini");
    return NextResponse.redirect(new URL('/', req.url));
  }

  console.log("lolos");
  return NextResponse.next();
}

// Routes Middleware should not run on
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}
