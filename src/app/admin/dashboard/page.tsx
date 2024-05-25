"use client"
import React, { useState } from 'react';
import AuthorTable from '@/components/AuthorTable';
import BookTable from '@/components/BookTable';
import PublisherTable from '@/components/PublisherTable';

export default function Page() {
  const [showAuthorTable, setShowAuthorTable] = useState(false);
  const [showPublisherTable, setShowPublisherTable] = useState(false);

  return (
    <div className="flex flex-row bg-white w-full">
      <div className="bg-black text-white w-fit h-screen">
        {/* Konten sidebar */}
        <div className="m-4 mx-12 text-center">
          <h2 className="text-4xl font-bold">De.Book</h2>
        </div>
        <ul>
          <li className={`mb-2 w-full h-10 flex items-center ${!showAuthorTable && !showPublisherTable ? 'bg-[#424242]' : 'focus:bg-slate-500'}`}>
            <a href="#" className={`hover:text-gray-300 m-5`} onClick={() => { setShowAuthorTable(false); setShowPublisherTable(false); }}>Book List</a>
          </li>
          <li className={`mb-2 w-full h-10 flex items-center ${showAuthorTable ? 'bg-[#424242]' : 'focus:bg-slate-500'}`}>
            <a href="#" className={`hover:text-gray-300 px-5`} onClick={() => { setShowAuthorTable(true); setShowPublisherTable(false); }}>Author List</a>
          </li>
          <li className={`mb-2 w-full h-10 flex items-center ${showPublisherTable ? 'bg-[#424242]' : 'focus:bg-slate-500'}`}>
            <a href="#" className={`hover:text-gray-300 px-5`} onClick={() => { setShowAuthorTable(false); setShowPublisherTable(true); }}>Publisher List</a>
          </li>
        </ul>
      </div>
      {!showAuthorTable && !showPublisherTable && <BookTable />}
      {showAuthorTable && <AuthorTable />}
      {showPublisherTable && <PublisherTable />}
    </div>
  );
}
