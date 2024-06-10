"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Carousel from "@/components/Carousel";
import Footer from "@/components/Footer";
import Image from "next/image";
import Navbar from "@/components/NavBar";
import { useRouter } from "next/navigation";

interface Book {
  book_id: number;
  title: string;
  price: number;
  img_url: string | null;
}

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [bookData, setBookData] = useState<Book[]>([]);
  const router = useRouter();

  const fetchData = async () => {
    try {
      const response = await fetch("/api/book");
      const data = await response.json();
      setBookData(data.data);
      console.log(data.data);
    } catch (error) {
      console.error("Error fetching book data:", error);
    }
  };

  useEffect(() => {
    fetchData();
    setIsLoading(false);
  }, []);

  return (
    <main className="bg-white w-full">
      <Navbar />
      <Carousel />

      <div className="container m-10 flex justify-center items-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-base-100 mb-3">Daftar Buku</h1>
          {isLoading ? (
            <p>Loading...</p>
          ) : bookData.length == 0 ? (
            <p>No books found.</p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 gap-10">
              {bookData.map((book) => (
                <Link
                  key={book.book_id}
                  href={`/dashboard/book/${book.book_id}`}
                >
                  <div className="card w-48 bg-white border-2 shadow-xl cursor-pointer max-h-80 hover:shadow-gray-400 hover:shadow-xl">
                    <figure className="px-5 pt-5 h-80">
                      <Image
                        src={book.img_url || "/book3.png"}
                        width={130}
                        height={100}
                        alt={book.title}
                      />
                    </figure>
                    <div className="card-body items-center text-center text-black">
                      <h2 className="card-title text-sm lg:text-sm line-clamp-1 max-w-40">
                        {book.title}
                      </h2>
                      <p>Rp{book.price}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>

      <Footer />
    </main>
  );
}
