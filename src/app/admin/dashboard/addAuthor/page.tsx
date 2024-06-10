"use client";
import React, { FormEvent, useState } from "react";
import Link from "next/link";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

function AddAuthor() {
  const [author_name, setAuthor_name] = useState("");
  const [author_bio, setAuthor_bio] = useState("");
  const [author_dob, setAuthor_dob] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
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
      const response = await fetch("/api/author", {
        method: "POST",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          author_name: author_name,
          bio: author_bio,
          date_birth: new Date(author_dob),
        }),
      });

      if (response.ok) {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Author added successfully!",
        });
        router.push("/admin/dashboard");
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to add author",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "An error occurred while adding author.",
      });
    }
  };

  return (
    <div className="lightMode w-full h-screen bg-white py-10">
      <div className="max-w-5xl mx-auto pt-5 text-black">
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-[0_3px_10px_rgb(0,0,0,0.2)] rounded px-8 pt-6 pb-8 my-5"
        >
          <h1 className="text-2xl font-bold mb-7">Add Author</h1>
          <div className="mb-4">
            <label htmlFor="name" className="block text-black font-bold mb-2">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={author_name}
              onChange={(e) => setAuthor_name(e.target.value)}
              className="input input-bordered input-md w-full max-w-full bg-white border-1 border-black focus:outline-none focus:border-black"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="bio" className="block text-black font-bold mb-2">
              Bio
            </label>
            <input
              type="text"
              id="bio"
              name="bio"
              value={author_bio}
              onChange={(e) => setAuthor_bio(e.target.value)}
              className="input input-bordered input-md w-full max-w-full bg-white border-black focus:outline-none focus:border-black"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="birthDate"
              className="block text-black font-bold mb-2"
            >
              Date of Birth
            </label>
            <input
              type="date"
              id="dob"
              name="dob"
              value={author_dob}
              onChange={(e) => setAuthor_dob(e.target.value)}
              className="input input-bordered input-md w-full max-w-full bg-white border-black focus:outline-none focus:border-black"
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

export default AddAuthor;
