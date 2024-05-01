"use client";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter, redirect } from "next/navigation";
import React, { useState } from "react";

function Navbar() {
  const router = useRouter();
  const { data: session } = useSession();

  return (
    <div className="navbar sticky top-0 z-50 shadow-md bg-white px-10">
      <div className="flex-1">
        <a className="text-xl text-black">De.Book</a>
      </div>
      <div className="flex-none gap-5">
        {/* Dropdown tambahan di sebelah kiri search bar */}
        <div className="dropdown dropdown-bottom dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-md m-1 bg-white rounded-badge text-black  hover:bg-white"
          >
            Kategori{" "}
            <i>
              <Image
                src="/icons8-arrow-down-48.png"
                width={15}
                height={15}
                alt="arrow down item"
              />
            </i>
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content z-[1] menu p-2 shadow bg-black rounded-box w-52"
          >
            <li>
              <a>Kategori 1</a>
            </li>
            <li>
              <a>Kategori 2</a>
            </li>
          </ul>
        </div>

        {/* Search bar di sebelah kanan dropdown tambahan */}
        <label className="input input-md border-black rounded-badge bg-white flex items-center text-black gap-2">
          <input
            type="text"
            className="grow border-none w-72"
            placeholder="Search"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="black"
            className="w-4 h-4 opacity-70"
          >
            <path
              fillRule="evenodd"
              d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
              clipRule="evenodd"
            />
          </svg>
        </label>

        {/* Tombol 'Masuk' hanya muncul jika belum login */}
        {session?.user?.name ? (
          <>
            {/* Profil dan Keranjang hanya muncul jika sudah login */}
            <div className="dropdown dropdown-end mx-2">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle"
              >
                <div className="indicator">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-black"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2 a2 2 0 11-4 0 a2 2 0 04 0"
                    />
                  </svg>
                  <span className="badge badge-sm indicator-item">8</span>
                </div>
              </div>
              <div
                tabIndex={0}
                className="mt-3 z-[1] card card-compact dropdown-content w-52 bg-white shadow"
              >
                <div className="card-body text-black">
                  <span className="font-bold text-lg">8 Items</span>
                  <span className="font-normal">Subtotal: $999</span>
                  <div className="card-actions">
                    <button className="btn btn-primary btn-block">
                      View cart
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Avatar Profil */}
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <img
                    alt="Profil"
                    src={session?.user?.image || "/person.png"}
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-white rounded-box w-52 text-black"
              >
                <li>
                  <a className="justify-between">
                    {session?.user?.name}
                    <span className="badge">New</span>
                  </a>
                </li>
                <li>
                  <a>Settings</a>
                </li>
                <li>
                  <a
                    onClick={() => {
                      signOut();
                      router.push("/login");
                    }}
                  >
                    Logout
                  </a>
                </li>
              </ul>
            </div>
          </>
        ) : (
          <button
            className="btn btn-outline btn-md text-black rounded-badge hover:bg-black hover:text-white mx-2"
            onClick={() => router.push("/login")}
          >
            Masuk
          </button>
        )}
      </div>
    </div>
  );
}

export default Navbar;
