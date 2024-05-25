import React from 'react';

// Dummy data for publishers
const publisherData = [
    {
        id: 1,
        name: "Penguin Random House",
        country: "United States",
        bio: "One of the largest English-language trade book publishers in the world.",
        createdAt: "2001-05-20T08:00:00Z",
        updatedAt: "2022-03-10T11:45:00Z"
    },
    {
        id: 2,
        name: "HarperCollins",
        country: "United States",
        bio: "One of the world's largest publishing companies and is one of the Big Five English-language publishing companies.",
        createdAt: "2002-09-15T10:30:00Z",
        updatedAt: "2023-07-05T09:20:00Z"
    },
    // Add more publishers as needed
];

function PublisherTable() {
    return (
        <div className="overflow-x-auto m-5">
            <h1 className="text-black text-3xl mb-5">Publisher List</h1>
            <div className="max-h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 scrollbar-rounded-full">
                <table className="table text-black table-xs w-full">
                    <thead className='sticky top-0 bg-[#424242] text-white'>
                        <tr>
                            <th>No</th>
                            <th className='py-5'>Name</th>
                            <th>Created At</th>
                            <th>Updated At</th>
                        </tr>
                    </thead>
                    <tbody>
                        {publisherData.map((publisher, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{publisher.name}</td>
                                <td>{publisher.createdAt}</td>
                                <td>{publisher.updatedAt}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default PublisherTable;
