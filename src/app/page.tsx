import Link from 'next/link';
import Carousel from "@/components/Carousel";
import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";
import Image from "next/image";

// Data untuk daftar buku
const bookData = [
  {
    id: 1,
    title: "ALONE",
    price: 50000,
    image: "/book3.png",
  },
  {
    id: 2,
    title: "TOGETHER",
    price: 60000,
    image: "/book3.png",
  },
  {
    id: 3,
    title: "ALONE 2",
    price: 55000,
    image: "/book3.png",
  },
];

export default function Home() {
  return (
    <main className="bg-white">
      <NavBar />

      <Carousel />

      <div className="container m-10 flex justify-center items-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-base-100 mb-3">Daftar Buku</h1>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 gap-10">
            {bookData.map((book) => (
              <Link key={book.id} href={`/detail/${book.id}`}>
                <div className="card w-48 bg-white border-2 shadow-xl cursor-pointer">
                  <figure className="px-5 pt-5">
                    <Image
                      src={book.image}
                      width={130}
                      height={100}
                      alt={book.title}
                    />
                  </figure>
                  <div className="card-body items-center text-center text-black">
                    <h2 className="card-title text-xl lg:text-2xl">{book.title}</h2>
                    <p>Rp{book.price}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
