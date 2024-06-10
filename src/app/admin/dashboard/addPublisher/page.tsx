"use client";
import React, { FormEvent, useState } from "react";
import Link from "next/link";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

export default function AddPublisherPage() {
  const [publisher, setPublisher] = useState("");

  const router = useRouter();
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    Swal.fire({
      title: "Please wait...",
      text: "Submitting your data",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    try {
      const response = await fetch("/api/publisher", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          publisher_name: publisher,
        }),
      });

      if (response.ok) {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Publisher has been added",
        });
        router.push("/admin/dashboard");
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: `Failed to add publisher`,
        });
      }
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error,
      });
    }
  };

  return (
    <div className="w-full h-screen bg-white py-10">
      <div className="max-w-5xl mx-auto pt-32 text-black">
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-[0_3px_10px_rgb(0,0,0,0.2)] rounded px-8 pt-6 pb-8 my-5"
        >
          <h1 className="text-2xl font-bold mb-7">Add new Publisher</h1>
          <div className="mb-4">
            <label htmlFor="name" className="block text-black font-bold mb-2">
              Publisher Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={publisher}
              onChange={(e) => setPublisher(e.target.value)}
              className="input input-bordered input-md w-full max-w-full bg-white border-1 border-black focus:outline-none focus:border-black"
              required
            />
          </div>

          <div className="flex items-center justify-end gap-4">
            <Link
              href={"/admin/dashboard"}
              className="btn btn-error btn-md text-white"
            >
              Back
            </Link>
            <button type="submit" className="btn btn-success btn-md text-white">
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
