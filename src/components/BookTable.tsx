"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import "../app/globals.css";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

function BookTable() {
  const [books, setBooks] = useState<Book[]>([]);
  const [error, setError] = useState("");
  const router = useRouter();

  const [loading, setLoading] = useState(true);

  const fetchBooks = async () => {
    try {
      const response = await fetch("/api/book");
      const result = await response.json();
      if (response.ok) {
        setBooks(result.data);
      } else {
        setError(result.message || "Failed to fetch books");
      }
    } catch (error) {
      setError("Error fetching books: " + error);
    } finally {
      setLoading(false);
    }
  };

  const deleteBook = async (id: number) => {
    try {
      const response = await fetch(`/api/book/${id}`, {
        method: "DELETE",
      });
      const result = await response.json();
      if (response.ok) {
        Swal.fire({
          title: "Success",
          text: result.message,
          icon: "success",
        });
        fetchBooks();
      } else {
        Swal.fire({
          title: "Error",
          text: result.message,
          icon: "error",
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "Internal server error",
        icon: "error",
      });
    }
  };

  const confirmDelete = (id: number) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteBook(id);
      }
    });
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <div className="overflow-x-hidden m-5">
      <h1 className="text-black text-3xl">Book List</h1>
      <Link
        href={"/admin/dashboard/addBook"}
        className="btn btn-md btn-primary text-white my-5"
      >
        Add book
      </Link>
      {loading ? (
        <div className="text-black">Loading...</div>
      ) : error ? (
        <div className="text-black">Error: {error}</div>
      ) : (
        <div className="rounded-md max-h-[450px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 scrollbar-rounded-full">
          <table className="table text-black table-xs w-full">
            <thead className="sticky top-0 bg-[#424242] text-white text-lg">
              <tr>
                <th></th>
                <th className="py-5">Title</th>
                <th>Description</th>
                <th>Year Release</th>
                <th>Stock</th>
                <th>Price</th>
                <th>Image URL</th>
                <th>Author</th>
                <th>Publisher</th>
                <th>Category</th>
                <th>Admin</th>
                <th>Created At</th>
                <th>Updated At</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody className="border-t border-gray-300">
              {books?.map((book) => (
                <tr key={book.book_id} className="even:bg-[#535353] even:text-white odd:bg-white">
                  <td></td>
                  <td>{book.title}</td>
                  <td className="truncate max-w-[200px]">{book.desc}</td>
                  <td>{book.year_release}</td>
                  <td>{book.stock}</td>
                  <td>{book.price}</td>
                  <td>
                    <a
                      href={book.img_url ?? ""}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:text-blue-700"
                    >
                      View Image
                    </a>
                  </td>
                  <td className="whitespace-normal break-words break-every-10-chars">
                    {book.author.author_name}
                  </td>
                  <td>{book.publisher.publisher_name}</td>
                  <td>{book.category.category_name}</td>
                  <td>{book.admin_id}</td>
                  <td>{new Date(book.createdAt).toLocaleDateString()}</td>
                  <td>{new Date(book.updatedAt).toLocaleDateString()}</td>
                  <td>
                    <div className="">
                      <button
                        className="btn btn-warning btn-xs w-14 rounded-badge text-white mb-1"
                        onClick={() =>
                          router.push(
                            `/admin/dashboard/editBook/${book.book_id}`
                          )
                        }
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-error btn-xs w-14 rounded-badge text-white"
                        onClick={() => confirmDelete(book.book_id)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default BookTable;
