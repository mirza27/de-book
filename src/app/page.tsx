"use client";
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { redirect } from 'next/navigation';
interface Book {
  book_id: number;
  title: string;
  price: number;
  img_url: string | null;
}

export default function MyApp() {
    // const { push } = useRouter();

    useEffect(() => {
        redirect('/dashboard');
     }, []);
  return <>
    
  </>
}
