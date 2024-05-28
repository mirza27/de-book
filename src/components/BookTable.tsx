"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";

function BookTable() {
  const [books, setBooks] = useState<Book[]>([]);
  const [error, setError] = useState("");

  const [loading, setLoading] = useState(true);
  useEffect(() => {
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

    fetchBooks();
  }, []);

  return (
    <div className="overflow-x-auto m-5">
      <h1 className="text-black text-3xl">Book List</h1>
      <Link
        href={"/admin/dashboard/create"}
        className="btn btn-md btn-primary text-white my-5"
      >
        Add book
      </Link>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>Error: {error}</div>
      ) : (
        <div className="max-h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 scrollbar-rounded-full">
          <table className="table text-black table-xs w-full">
            <thead className="sticky top-0 bg-[#424242] text-white">
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
            <tbody>
              {books.map((book) => (
                <tr key={book.book_id}>
                  <td></td>
                  <td>{book.title}</td>
                  <td>{book.desc}</td>
                  <td>{book.year_release}</td>
                  <td>{book.stock}</td>
                  <td>{book.price}</td>
                  <td>
                    <a
                      href={book.img_url ?? ""}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View Image
                    </a>
                  </td>
                  <td>{book.author.author_name}</td>
                  <td>{book.publisher.publisher_name}</td>
                  <td>{book.category.category_name}</td>
                  <td>{book.admin_id}</td>
                  <td>{new Date(book.createdAt).toLocaleDateString()}</td>
                  <td>{new Date(book.updatedAt).toLocaleDateString()}</td>
                  <td>
                    <div className="">
                      <button className="btn btn-warning btn-xs w-14 rounded-badge text-white mb-1">
                        Edit
                      </button>
                      <button className="btn btn-error btn-xs w-14 rounded-badge text-white">
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
