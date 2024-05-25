import React from 'react'
import Link from 'next/link';

const bookData = [
    {
        title: "The Great Gatsby",
        description: "A novel by F. Scott Fitzgerald",
        yearRelease: 1925,
        stock: 50,
        price: 25000,
        imageUrl: "https://example.com/book-cover.jpg",
        author: "F. Scott Fitzgerald",
        publisher: "Scribner",
        category: "Fiction",
        admin: "John Doe",
        createdAt: "2023-04-30T12:34:56Z",
        updatedAt: "2023-04-30T12:34:56Z",
    },
    {
        title: "To Kill a Mockingbird",
        description: "A novel by Harper Lee",
        yearRelease: 1960,
        stock: 30,
        price: 35000,
        imageUrl: "https://example.com/book-cover2.jpg",
        author: "Harper Lee",
        publisher: "J. B. Lippincott & Co.",
        category: "Fiction",
        admin: "Jane Smith",
        createdAt: "2023-04-29T09:15:27Z",
        updatedAt: "2023-04-30T10:20:15Z",
    },
    {
        title: "The Great Gatsby",
        description: "A novel by F. Scott Fitzgerald",
        yearRelease: 1925,
        stock: 50,
        price: 25000,
        imageUrl: "https://example.com/book-cover.jpg",
        author: "F. Scott Fitzgerald",
        publisher: "Scribner",
        category: "Fiction",
        admin: "John Doe",
        createdAt: "2023-04-30T12:34:56Z",
        updatedAt: "2023-04-30T12:34:56Z",
    },
    {
        title: "To Kill a Mockingbird",
        description: "A novel by Harper Lee",
        yearRelease: 1960,
        stock: 30,
        price: 35000,
        imageUrl: "https://example.com/book-cover2.jpg",
        author: "Harper Lee",
        publisher: "J. B. Lippincott & Co.",
        category: "Fiction",
        admin: "Jane Smith",
        createdAt: "2023-04-29T09:15:27Z",
        updatedAt: "2023-04-30T10:20:15Z",
    },
    {
        title: "The Great Gatsby",
        description: "A novel by F. Scott Fitzgerald",
        yearRelease: 1925,
        stock: 50,
        price: 25000,
        imageUrl: "https://example.com/book-cover.jpg",
        author: "F. Scott Fitzgerald",
        publisher: "Scribner",
        category: "Fiction",
        admin: "John Doe",
        createdAt: "2023-04-30T12:34:56Z",
        updatedAt: "2023-04-30T12:34:56Z",
    },
    {
        title: "To Kill a Mockingbird",
        description: "A novel by Harper Lee",
        yearRelease: 1960,
        stock: 30,
        price: 35000,
        imageUrl: "https://example.com/book-cover2.jpg",
        author: "Harper Lee",
        publisher: "J. B. Lippincott & Co.",
        category: "Fiction",
        admin: "Jane Smith",
        createdAt: "2023-04-29T09:15:27Z",
        updatedAt: "2023-04-30T10:20:15Z",
    },
    {
        title: "To Kill a Mockingbird",
        description: "A novel by Harper Lee",
        yearRelease: 1960,
        stock: 30,
        price: 35000,
        imageUrl: "https://example.com/book-cover2.jpg",
        author: "Harper Lee",
        publisher: "J. B. Lippincott & Co.",
        category: "Fiction",
        admin: "Jane Smith",
        createdAt: "2023-04-29T09:15:27Z",
        updatedAt: "2023-04-30T10:20:15Z",
    },
    {
        title: "To Kill a Mockingbird",
        description: "A novel by Harper Lee",
        yearRelease: 1960,
        stock: 30,
        price: 35000,
        imageUrl: "https://example.com/book-cover2.jpg",
        author: "Harper Lee",
        publisher: "J. B. Lippincott & Co.",
        category: "Fiction",
        admin: "Jane Smith",
        createdAt: "2023-04-29T09:15:27Z",
        updatedAt: "2023-04-30T10:20:15Z",
    },
    {
        title: "To Kill a Mockingbird",
        description: "A novel by Harper Lee",
        yearRelease: 1960,
        stock: 30,
        price: 35000,
        imageUrl: "https://example.com/book-cover2.jpg",
        author: "Harper Lee",
        publisher: "J. B. Lippincott & Co.",
        category: "Fiction",
        admin: "Jane Smith",
        createdAt: "2023-04-29T09:15:27Z",
        updatedAt: "2023-04-30T10:20:15Z",
    },
    {
        title: "To Kill a Mockingbird",
        description: "A novel by Harper Lee",
        yearRelease: 1960,
        stock: 30,
        price: 35000,
        imageUrl: "https://example.com/book-cover2.jpg",
        author: "Harper Lee",
        publisher: "J. B. Lippincott & Co.",
        category: "Fiction",
        admin: "Jane Smith",
        createdAt: "2023-04-29T09:15:27Z",
        updatedAt: "2023-04-30T10:20:15Z",
    },
    {
        title: "To Kill a Mockingbird",
        description: "A novel by Harper Lee",
        yearRelease: 1960,
        stock: 30,
        price: 35000,
        imageUrl: "https://example.com/book-cover2.jpg",
        author: "Harper Lee",
        publisher: "J. B. Lippincott & Co.",
        category: "Fiction",
        admin: "Jane Smith",
        createdAt: "2023-04-29T09:15:27Z",
        updatedAt: "2023-04-30T10:20:15Z",
    },
    {
        title: "To Kill a Mockingbird",
        description: "A novel by Harper Lee",
        yearRelease: 1960,
        stock: 30,
        price: 35000,
        imageUrl: "https://example.com/book-cover2.jpg",
        author: "Harper Lee",
        publisher: "J. B. Lippincott & Co.",
        category: "Fiction",
        admin: "Jane Smith",
        createdAt: "2023-04-29T09:15:27Z",
        updatedAt: "2023-04-30T10:20:15Z",
    },
    {
        title: "To Kill a Mockingbird",
        description: "A novel by Harper Lee",
        yearRelease: 1960,
        stock: 30,
        price: 35000,
        imageUrl: "https://example.com/book-cover2.jpg",
        author: "Harper Lee",
        publisher: "J. B. Lippincott & Co.",
        category: "Fiction",
        admin: "Jane Smith",
        createdAt: "2023-04-29T09:15:27Z",
        updatedAt: "2023-04-30T10:20:15Z",
    },
    // Tambahkan data lainnya
];

function BookTable() {
    return (
        <div className="overflow-x-auto m-5">
            <h1 className="text-black text-3xl">Book List</h1>
            <Link href={"/admin/dashboard/create"} className="btn btn-md btn-primary text-white my-5">Add book</Link>
            <div
                className="max-h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 scrollbar-rounded-full"
            >
                <table className="table text-black table-xs w-full">
                    <thead className='sticky top-0 bg-[#424242] text-white'>
                        <tr>
                            <th></th>
                            <th className='py-5'>Title</th>
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
                        {bookData.map((book, index) => (
                            <tr key={index}>
                                <td></td>
                                <td>{book.title}</td>
                                <td>{book.description}</td>
                                <td>{book.yearRelease}</td>
                                <td>{book.stock}</td>
                                <td>{book.price}</td>
                                <td>
                                    <a href={book.imageUrl}>View Image</a>
                                </td>
                                <td>{book.author}</td>
                                <td>{book.publisher}</td>
                                <td>{book.category}</td>
                                <td>{book.admin}</td>
                                <td>{book.createdAt}</td>
                                <td>{book.updatedAt}</td>
                                <td>
                                    <div className="">
                                        <button className="btn btn-warning btn-xs w-14 rounded-badge text-white mb-1">Edit</button>
                                        <button className="btn btn-error btn-xs w-14 rounded-badge text-white">Delete</button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>)
}

export default BookTable