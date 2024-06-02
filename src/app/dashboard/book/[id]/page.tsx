"use client";
import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";
import React from "react";
import Image from "next/image";
import AmountInput from "@/components/AmountInput";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Swal from "sweetalert2";

export default function BookDetailPage() {
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const params = useParams<{ id: string }>();
  const [book, setBook] = useState<Book | null>();
  const router = useRouter();

  const getBookData = async () => {
    try {
      const response = await fetch(`/api/book/${params.id}`);
      const result = await response.json();
      if (response.ok) {
        setBook(result.data);
      } else {
        setError(result.message || "Failed to fetch books");
      }
    } catch (error: any) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const addtoCart = async (quantity: number) => {
    try {
      const response = await fetch("/api/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          book_id: book!.book_id,
          quantity: quantity,
        }),
      });
      const result = await response.json();
      if (response.ok) {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: result.message,
        });
        router.push("/dashboard/cart");
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to add book to cart",
        });
        setError(result.message || "Failed to fetch books");
      }
    } catch (error: any) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getBookData();
  }, []);

  return (
    <>
      <NavBar />
      <div className="w-full p-10 h-fit bg-white flex justify-center items-center">
        <div className="card w-72 bg-base-100 my-16 shadow-xl">
          <Image
            src={book?.img_url ?? "/book3.png"}
            width={500}
            height={500}
            alt="Book3"
          />
        </div>
        {isLoading ? (
          <>
            {" "}
            <div className="w-full h-fit bg-white py-10">
              <div className="max-w-5xl mx-auto pt-5 text-black">
                <h1 className="text-2xl font-bold mb-7">Loading...</h1>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="text-black ml-24 max-w-3xl">
              <h1 className="text-4xl py-3">{book?.title}</h1>
              <p className="text-2xl mb-3">Rp {book?.price} -</p>
              <h1 className="text-xl font-medium">Description</h1>
              <p className="text-md">
                {book?.desc ?? ""}
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nisi,
                pariatur praesentium dolores error perspiciatis laboriosam
                ducimus repudiandae molestias ea labore, magnam adipisci
                eligendi, consequuntur placeat repellendus. Reiciendis alias
                deserunt expedita? Cum debitis id incidunt assumenda mollitia
                pariatur provident aspernatur nobis corrupti! Reiciendis enim
                atque iusto illum nam velit nulla excepturi amet aperiam harum
                sapiente, dolorem laboriosam molestiae ducimus maxime voluptate.
              </p>
              <h1 className="text-xl mt-3 font-medium">Detail</h1>
              <div className="flex pt-2 gap-5">
                <div>
                  <h1 className="text-md">Author</h1>
                  <p className="text-lg">{book?.author.author_name ?? ""}</p>
                </div>
                <div>
                  <h1 className="text-md">Year Release</h1>
                  <p className="text-lg">{book?.year_release}</p>
                </div>
                <div>
                  <h1 className="text-md">Publisher</h1>
                  <p className="text-lg">
                    {" "}
                    {book?.publisher.publisher_name ?? ""}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-5">
                <h1 className="text-xl mt-5">Amount: </h1>
                <AmountInput amount={quantity} setAmount={setQuantity} />
              </div>
              <div className="flex mt-3 gap-5">
                <button
                  className="btn w-36 bg-success hover:bg-success border-none text-white btn-sm rounded-badge"
                  onClick={() => addtoCart(1)}
                >
                  Buy Now
                </button>
                <button
                  className="btn w-36 btn-outline text-black border-black btn-sm rounded-badge"
                  onClick={() => addtoCart(quantity)}
                >
                  <Image
                    src="/shopping-cart.png"
                    width={20}
                    height={20}
                    alt="shopping-cart-icon"
                  />
                  Add to Cart
                </button>
              </div>
            </div>
          </>
        )}
      </div>
      <Footer />
    </>
  );
}
