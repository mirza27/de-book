"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

function PublisherTable() {
  const [publishers, setPublishers] = useState<Publisher[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

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

  const deletePublisher = async (id: number) => {
    try {
      const response = await fetch(`/api/publisher/${id}`, {
        method: "DELETE",
      });
      const result = await response.json();
      if (response.ok) {
        Swal.fire({
          title: "Success",
          text: result.message,
          icon: "success",
        });
        fetchPublishers();
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
        deletePublisher(id);
      }
    });
  };

  useEffect(() => {
    fetchPublishers();
  }, []);

  return (
    <div className="overflow-x-auto m-5 w-screen">
      <h1 className="text-black text-3xl">Publisher List</h1>
      <Link
        href={"/admin/dashboard/addPublisher"}
        className="btn btn-md btn-primary text-white my-5"
      >
        Add New Publisher
      </Link>
      {loading ? (
        <div className="text-black">Loading...</div>
      ) : error ? (
        <div className="text-black">Error: {error}</div>
      ) : (
        <div className="rounded-md max-h-[450px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 scrollbar-rounded-full">
          <table className="rounded-xl table text-black table-xs w-full">
            <thead className=" sticky top-0 bg-[#424242] text-white text-lg">
              <tr>
                <th>No</th>
                <th className="py-2">Name</th>
                <th>Created At</th>
                <th>Updated At</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {publishers.map((publisher, index) => (
                <tr key={publisher.publisher_id} className="even:bg-[#535353] even:text-white odd:bg-white">
                  <td>{index + 1}</td>
                  <td className="py-3">{publisher.publisher_name}</td>
                  <td>
                    {new Date(publisher.createdAt).toLocaleDateString("id-ID")}
                  </td>
                  <td>
                    {new Date(publisher.updatedAt).toLocaleDateString("id-ID")}
                  </td>
                  <td>
                    <button
                      className="btn btn-error btn-xs w-14 rounded-badge text-white"
                      onClick={() => confirmDelete(publisher.publisher_id)}
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

export default PublisherTable;
