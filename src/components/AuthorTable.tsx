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
    <div className="overflow-x-auto m-5">
      <h1 className="text-black text-3xl mb-5">Author List</h1>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>Error: {error}</div>
      ) : (
        <div className="max-h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 scrollbar-rounded-full">
          <table className="table text-black table-xs w-full">
            <thead className="sticky top-0 bg-[#424242] text-white">
              <tr>
                <th>No</th>
                <th className="py-5">Name</th>
                <th>Date of Birth</th>
                <th>Bio</th>
                <th>Created At</th>
                <th>Updated At</th>
              </tr>
            </thead>
            <tbody>
              {authors.map((author, index) => (
                <tr key={author.author_id}>
                  <td>{index + 1}</td>
                  <td>{author.author_name}</td>
                  <td>
                    {new Date(author.date_birth ?? "").toLocaleDateString()}
                  </td>
                  <td className="max-w-[450px] overflow-hidden whitespace-nowrap truncate">
                    {author.bio}
                  </td>
                  <td>{new Date(author.createdAt).toLocaleDateString()}</td>
                  <td>{new Date(author.updatedAt).toLocaleDateString()}</td>
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
