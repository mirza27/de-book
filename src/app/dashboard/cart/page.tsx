"use client";
import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Swal from "sweetalert2";

export default function Cart() {
  const [isLoading, setIsLoading] = useState(true);
  const [carts, setCarts] = useState<Cart[]>([]);
  const [total, setTotal] = useState(0);

  const getCartData = async () => {
    try {
      const response = await fetch("/api/cart");
      const data = await response.json();
      setCarts(data.data);
      calculateTotal(data.data); // Calculate total price after fetching data
    } catch (error) {
      console.error("Error fetching cart data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const calculateTotal = (cartItems: Cart[]) => {
    let totalPrice = 0;
    cartItems.forEach((item) => {
      totalPrice += item.book.price * item.quantity;
    });
    setTotal(totalPrice);
  };

  const checkout = async () => {
    try {
      const response = await fetch("/api/cart/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error("Error fetching cart data:", error);
    }
  };

  const deleteCart = async (cartId: number) => {
    try {
      const response = await fetch(`/api/cart/${cartId}`, {
        method: "DELETE",
      });
      const data = await response.json();
      if (response.ok) {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: data.message,
        });
        getCartData();
        console.log(data);
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: data.message,
        });
      }
    } catch (error) {
      console.error("Error deleting cart:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "internal server error",
      });
    }
  };

  useEffect(() => {
    getCartData();
  }, []);

  return (
    <>
      <NavBar />
      <div className="w-full h-screen bg-white text-black p-16">
        <h1 className="text-4xl font-semibold">Shopping Cart</h1>
        <div className="flex gap-7 py-5">
          <div className="bg-white shadow-xl border-2 rounded-badge text-black w-8/12 h-fit">
            {isLoading ? (
              <p>Loading...</p>
            ) : (
              carts?.map((cart) => (
                <div key={cart.cart_id} className="flex justify-between">
                  <div className="flex items-center gap-9 p-9">
                    <Image
                      src={cart.book.img_url ?? "/default-book.png"}
                      width={100}
                      height={150}
                      alt={cart.book.title}
                    />
                    <div className="text-xl">
                      <h1 className="font-semibold">{cart.book.title}</h1>
                      <p>Rp{cart.book.price.toLocaleString()}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-9 p-9">
                    <div className="flex items-center border-2 border-black rounded-badge mt-5">
                      <input
                        type="text"
                        className="w-16 h-5 bg-white rounded-lg text-center focus:border-white"
                        value={cart.quantity}
                        disabled
                      />
                    </div>
                    <p className="pt-5">
                      Rp{(cart.book.price * cart.quantity).toLocaleString()}
                    </p>
                    <button
                      onClick={() => deleteCart(cart.cart_id)}
                      className="btn w-36 btn-error mt-5 hover:btn-error border-none text-white hover:text-white btn-sm rounded-badge"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
          <div className="card bg-white shadow-xl border-2 w-4/12 h-fit">
            <h1 className="text-4xl pt-6 px-9 font-semibold">
              Expenditure Details
            </h1>
            <div className="divider divide-neutral-950"></div>
            <div className="flex px-9 justify-between text-xl font-medium">
              <p>Payment summary</p>
              <p>Rp{total.toLocaleString()}</p>
            </div>
            <div className="flex justify-center m-9 items-center">
              <button
                className="btn mt-2 w-full text-lg h-10 bg-success hover:bg-success border-none text-white btn-sm rounded-badge"
                onClick={checkout}
              >
                Pay now
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
