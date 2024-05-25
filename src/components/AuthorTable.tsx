import React from 'react';

// Dummy data for authors
const authorData = [
    {
        id: 1,
        name: "J.K. Rowling",
        dateOfBirth: "31 July 1965",
        bio: "British author best known for her Harry Potter series.",
        createdAt: "2005-02-03T07:00:00Z",
        updatedAt: "2022-04-15T10:30:00Z"
    },
    {
        id: 2,
        name: "Stephen King",
        dateOfBirth: "21 September 1947",
        bio: "American author known for his horror and supernatural fiction. asddddddddddddddddddddddddddddddddddasdsdadsadasasdasda",
        createdAt: "2008-11-12T09:15:00Z",
        updatedAt: "2023-06-28T14:20:00Z"
    },
    // Add more authors as needed
];

function AuthorTable() {
    return (
        <div className="overflow-x-auto m-5">
            <h1 className="text-black text-3xl mb-5">Author List</h1>
            <div className="max-h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 scrollbar-rounded-full">
                <table className="table text-black table-xs w-full">
                    <thead className='sticky top-0 bg-[#424242] text-white'>
                        <tr>
                            <th>No</th>
                            <th className='py-5'>Name</th>
                            <th>Date of Birth</th>
                            <th>Bio</th>
                            <th>Created At</th>
                            <th>Updated At</th>
                        </tr>
                    </thead>
                    <tbody>
                        {authorData.map((author, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{author.name}</td>
                                <td>{author.dateOfBirth}</td>
                                <td className="max-w-[450px] overflow-hidden whitespace-nowrap truncate">{author.bio}</td>
                                <td>{author.createdAt}</td>
                                <td>{author.updatedAt}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default AuthorTable;
