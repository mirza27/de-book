"use client";
import React, { useEffect, useState } from "react";

// Definisikan tipe Publisher
interface Publisher {
  publisher_id: number;
  publisher_name: string;
  admin_id: number;
  createdAt: string;
  updatedAt: string;
}

function PublisherTable() {
  const [publishers, setPublishers] = useState<Publisher[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPublishers = async () => {
      try {
        const response = await fetch("/api/publisher");
        const result = await response.json();
        if (response.ok) {
          setPublishers(result.data);
        } else {
          setError(result.message || "Failed to fetch publishers");
        }
      } catch (error) {
        setError("Error fetching publishers: " + error);
      } finally {
        setLoading(false);
      }
    };

    fetchPublishers();
  }, []);

  return (
    <div className="overflow-x-auto m-5 w-screen">
      <h1 className="text-black text-3xl mb-5">Publisher List</h1>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>Error: {error}</div>
      ) : (
        <div className="max-h-97 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 scrollbar-rounded-full">
          <table className="rounded-xl table text-black table-xs w-full">
            <thead className=" sticky top-0 bg-[#424242] text-white text-lg">
              <tr>
                <th>No</th>
                <th className="py-2">Name</th>
                <th>Created At</th>
                <th>Updated At</th>
              </tr>
            </thead>
            <tbody>
              {publishers.map((publisher, index) => (
                <tr key={publisher.publisher_id} className="hover:bg-gray-100">
                  <td>{index + 1}</td>
                  <td className="py-3">{publisher.publisher_name}</td>
                  <td>{new Date(publisher.createdAt).toLocaleDateString('id-ID')}</td>
                  <td>{new Date(publisher.updatedAt).toLocaleDateString('id-ID')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default PublisherTable;
