"use client";
import React, { useEffect, useState } from "react";

function AuthorTable() {
  const [authors, setAuthors] = useState<Author[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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

    fetchAuthors();
  }, []);

  return (
    <div className="overflow-x-auto m-5 min-w-[80%]">
      <h1 className="text-black text-3xl mb-5">Author List</h1>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>Error: {error}</div>
      ) : ( 
        <div className="rounded-md h-104 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 scrollbar-rounded-full">
          <table className=" table text-black ">
            <thead className="sticky top-0 bg-[#424242] text-white text-lg">
              <tr>
                <th className="py-3">No</th>
                <th className="py-3 px-1">Name</th>
                <th className="py-3">Date of Birth</th>
                <th className="py-3">Bio</th>
                <th className="py-3">Created At</th>
                <th className="py-3">Updated At</th>
              </tr>
            </thead>
            <tbody>
              {authors.map((author, index) => (
                <tr key={author.author_id} className=" even:bg-[#535353] even:text-white odd:bg-white">
                  <td className="py-2">{index + 1}</td>
                  <td className="py-2 px-1">{author.author_name}</td>
                  <td className="py-2">
                    {new Date(author.date_birth ?? "").toLocaleDateString('id-ID', {
                      day: '2-digit',
                      month: 'long',
                      year: 'numeric'
                    })}
                  </td>
                  <td className="py-2 max-w-[450px] overflow-hidden whitespace-nowrap truncate">
                    {author.bio}
                  </td>
                  <td className="py-2">
                    {new Date(author.createdAt).toLocaleDateString('id-ID', {
                      day: '2-digit',
                      month: 'long',
                      year: 'numeric'
                    })}
                  </td>
                  <td className="py-2">
                    {new Date(author.updatedAt).toLocaleDateString('id-ID', {
                      day: '2-digit',
                      month: 'long',
                      year: 'numeric'
                    })}
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
