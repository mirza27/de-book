"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { FormEvent } from "react";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { v4 as uuidv4 } from "uuid";
import "dotenv/config";

const s3Client = new S3Client({
  region: `ap-southeast-1`,
  credentials: {
    accessKeyId: `AKIA6GBMCFKBWMKJN7TY`,
    secretAccessKey: `${process.env.AWS_SECRET_KEY}`,
  },
});

export default function AddBookPage() {
  const [error, setError] = useState("");
  const [formData, setFormData] = useState<Partial<Book>>({});
  const [bookCategory, setBookCategory] = useState<BookCategory[]>([]);
  const [publisher, setPublisher] = useState<Publisher[]>([]);
  const [author, setAuthor] = useState<Author[]>([]);
  const [file, setFile] = useState<File | null>(null); // State to handle file

  const router = useRouter();

  const getBookCategory = async () => {
    try {
      const response = await fetch("/api/category");
      const data = await response.json();
      setBookCategory(data.data);
      console.log(data.data);
    } catch (error) {
      console.error("Error fetching book category data:", error);
    }
  };

  const getPublishers = async () => {
    try {
      const response = await fetch("/api/publisher");
      const data = await response.json();
      setPublisher(data.data);
      console.log(data.data);
    } catch (error) {
      console.error("Error fetching publisher data:", error);
    }
  };

  const getAuthors = async () => {
    try {
      const response = await fetch("/api/author");
      const data = await response.json();
      setAuthor(data.data);
      console.log(data.data);
    } catch (error) {
      console.error("Error fetching author data:", error);
    }
  };

  const uploadToS3 = async (file: File) => {
    const fileName = `${uuidv4()}-${file.name}`;
    const params = {
      Bucket: `debook-bucket`,
      Key: fileName,
      Body: file,
      ContentType: file.type,
    };

    try {
      const command = new PutObjectCommand(params);
      console.log("Uploading file to S3:", fileName);
      await s3Client.send(command);
      console.log("File uploaded to S3:", fileName);
      const publicUrl = `https://debook-bucket.s3.ap-southeast-1.amazonaws.com/${fileName}`;
      return publicUrl;
    } catch (error) {
      console.error("Error uploading file to S3:", error);
      throw new Error("Failed to upload file");
    }
  };

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
      let img_url = "";

      if (file) {
        img_url = await uploadToS3(file);
      }

      const response = await fetch("/api/book", {
        method: "POST",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formData, img_url }),
      });

      if (response.ok) {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Book created successfully!",
        });

        router.push("/admin/dashboard");
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to create book.",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "An error occurred while creating the book.",
      });
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  useEffect(() => {
    getBookCategory();
    getPublishers();
    getAuthors();
  }, []);

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
              value={formData.title || ""}
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
              name="desc"
              value={formData.desc || ""}
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
              min={2000}
              type="number"
              id="year_release"
              name="year_release"
              max={2024}
              value={formData.year_release || ""}
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
              min={0}
              id="stock"
              name="stock"
              value={formData.stock || ""}
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
              min={0}
              value={formData.price || ""}
              onChange={handleChange}
              className="input input-bordered input-md w-full max-w-full bg-white border-black focus:outline-none focus:border-black"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="img_url"
              className="block text-black font-bold mb-2"
            >
              Image Cover
            </label>
            <input
              type="file"
              id="img_url"
              name="img_url"
              onChange={handleFileChange}
              className="input input-bordered input-md w-full max-w-full bg-white border-black focus:outline-none focus:border-black"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="author_id"
              className="block text-black font-bold mb-2"
            >
              Author
            </label>
            <select
              id="author_id"
              name="author_id"
              value={formData.author_id || ""}
              onChange={handleChange}
              className="select select-bordered w-full max-w-full bg-white border-black focus:outline-none focus:border-black"
              required
            >
              <option disabled selected>
                Select Author
              </option>
              {author.map((auth) => (
                <option key={auth.author_id} value={auth.author_id}>
                  {auth.author_name}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label
              htmlFor="publisher_id"
              className="block text-black font-bold mb-2"
            >
              Publisher
            </label>
            <select
              id="publisher_id"
              name="publisher_id"
              value={formData.publisher_id || ""}
              onChange={handleChange}
              className="select select-bordered w-full max-w-full bg-white border-black focus:outline-none focus:border-black"
              required
            >
              <option disabled selected>
                Select Publisher
              </option>
              {publisher.map((pub) => (
                <option key={pub.publisher_id} value={pub.publisher_id}>
                  {pub.publisher_name}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label
              htmlFor="book_category_id"
              className="block text-black font-bold mb-2"
            >
              Category
            </label>
            <select
              id="book_category_id"
              name="book_category_id"
              value={formData.book_category_id || ""}
              onChange={handleChange}
              className="select select-bordered w-full max-w-full bg-white border-black focus:outline-none focus:border-black"
              required
            >
              <option disabled selected>
                Select Category
              </option>
              {bookCategory.map((cat) => (
                <option key={cat.book_category_id} value={cat.book_category_id}>
                  {cat.category_name}
                </option>
              ))}
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
