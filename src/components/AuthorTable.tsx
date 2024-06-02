"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

function AuthorTable() {
  const [authors, setAuthors] = useState<Author[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchAuthors = async () => {
    try {
      const response = await fetch("/api/author");
      const result = await response.json();
      if (response.ok) {
        setAuthors(result.data);
      } else {
        setError(result.message || "Failed to fetch authors");
      }
    } catch (error) {
      setError("Error fetching authors: " + error);
    } finally {
      setLoading(false);
    }
  };

  const deleteAuthor = async (id: number) => {
    try {
      const response = await fetch(`/api/author/${id}`, {
        method: "DELETE",
      });
      const result = await response.json();
      if (response.ok) {
        Swal.fire({
          title: "Success",
          text: result.message,
          icon: "success",
        });
        fetchAuthors();
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
        deleteAuthor(id);
      }
    });
  };

  useEffect(() => {
    fetchAuthors();
  }, []);

  return (
    <div className="overflow-x-auto m-5 min-w-[80%]">
      <h1 className="text-black text-3xl">Author List</h1>
      <Link
        href={"/admin/dashboard/addAuthor"}
        className="btn btn-md btn-primary text-white my-5"
      >
        Add New Author
      </Link>
      {loading ? (
        <div className="text-black">Loading...</div>
      ) : error ? (
        <div className="text-black">Error: {error}</div>
      ) : (
        <div className="rounded-md max-h-[450px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 scrollbar-rounded-full">
          <table className="table text-black">
            <thead className="sticky top-0 bg-[#424242] text-white text-lg">
              <tr>
                <th className="py-3">No</th>
                <th className="py-3 px-1">Name</th>
                <th className="py-3">Date of Birth</th>
                <th className="py-3">Bio</th>
                <th className="py-3">Created At</th>
                <th className="py-3">Updated At</th>
                <th className="py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {authors.map((author, index) => (
                <tr
                  key={author.author_id}
                  className="even:bg-[#535353] even:text-white odd:bg-white"
                >
                  <td className="py-2">{index + 1}</td>
                  <td className="py-2 px-1">{author.author_name}</td>
                  <td className="py-2">
                    {new Date(author.date_birth ?? "").toLocaleDateString(
                      "id-ID",
                      {
                        day: "2-digit",
                        month: "long",
                        year: "numeric",
                      }
                    )}
                  </td>
                  <td className="py-2 max-w-[450px] overflow-hidden whitespace-nowrap truncate">
                    {author.bio}
                  </td>
                  <td className="py-2">
                    {new Date(author.createdAt).toLocaleDateString("id-ID", {
                      day: "2-digit",
                      month: "long",
                      year: "numeric",
                    })}
                  </td>
                  <td className="py-2">
                    {new Date(author.updatedAt).toLocaleDateString("id-ID", {
                      day: "2-digit",
                      month: "long",
                      year: "numeric",
                    })}
                  </td>
                  <td>
                    <button
                      className="btn btn-error btn-xs w-14 rounded-badge text-white"
                      onClick={() => confirmDelete(author.author_id)}
                    >
                      Delete
                    </button>
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

export default AuthorTable;
