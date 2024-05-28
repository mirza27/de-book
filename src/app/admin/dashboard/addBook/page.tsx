"use client";
import React, { useState } from "react";
import Link from "next/link";

function Create() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    yearRelease: "",
    stock: "",
    price: "",
    imageUrl: "",
    author: "",
    publisher: "",
    category: "",
    admin: "",
    createdAt: "",
    updatedAt: "",
  });

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="w-full h-fit bg-white py-10">
      <div className="max-w-5xl mx-auto pt-5 text-black">
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-[0_3px_10px_rgb(0,0,0,0.2)] rounded px-8 pt-6 pb-8 my-5"
        >
          <h1 className="text-2xl font-bold mb-7">Create New Book</h1>
          <div className="mb-4">
            <label htmlFor="title" className="block text-black font-bold mb-2">
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="input input-bordered input-md w-full max-w-full bg-white border-1 border-black focus:outline-none focus:border-black"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-black font-bold mb-2"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="textarea textarea-bordered textarea-md w-full max-w-full bg-white min-h-32 border-black focus:outline-none focus:border-black"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="yearRelease"
              className="block text-black font-bold mb-2"
            >
              Year Release
            </label>
            <input
              type="number"
              id="yearRelease"
              name="yearRelease"
              value={formData.yearRelease}
              onChange={handleChange}
              className="input input-bordered input-md w-full max-w-full bg-white border-black focus:outline-none focus:border-black"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="stock" className="block text-black font-bold mb-2">
              Stock
            </label>
            <input
              type="number"
              id="stock"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              className="input input-bordered input-md w-full max-w-full bg-white border-black focus:outline-none focus:border-black"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="price" className="block text-black font-bold mb-2">
              Price
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="input input-bordered input-md w-full max-w-full bg-white border-black focus:outline-none focus:border-black"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="image" className="block text-black font-bold mb-2">
              Image
            </label>
            <input
              type="file"
              className="file-input file-input-bordered file-input-md w-full max-w-full bg-white border-black focus:outline-none focus:border-black"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="price" className="block text-black font-bold mb-2">
              Author
            </label>
            <select className="select select-bordered w-full max-w-full bg-white border-black focus:outline-none focus:border-black">
              <option disabled selected>
                Author
              </option>
              <option>Normal Apple</option>
              <option>Normal Orange</option>
              <option>Normal Tomato</option>
            </select>
          </div>

          <div className="mb-4">
            <label htmlFor="price" className="block text-black font-bold mb-2">
              Publisher
            </label>
            <select className="select select-bordered w-full max-w-full bg-white border-black focus:outline-none focus:border-black">
              <option disabled selected>
                Publisher
              </option>
              <option>Normal Apple</option>
              <option>Normal Orange</option>
              <option>Normal Tomato</option>
            </select>
          </div>

          <div className="mb-4">
            <label htmlFor="price" className="block text-black font-bold mb-2">
              Category
            </label>
            <select className="select select-bordered w-full max-w-full bg-white border-black focus:outline-none focus:border-black">
              <option disabled selected>
                Category
              </option>
              <option>Normal Apple</option>
              <option>Normal Orange</option>
              <option>Normal Tomato</option>
            </select>
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

export default Create;
