"use client"
import React, { useState } from "react"
import Link from 'next/link'
import Datepicker from "react-tailwindcss-datepicker"

function AddAuthor() {
    const [value, setValue] = useState({
        startDate: null,
        endDate: null
    });

    const handleValueChange = (newValue: any) => {
        console.log("newValue:", newValue);
        setValue(newValue);
    }
    return (
        <div className="lightMode w-full h-screen bg-white py-10">
            <div className="max-w-5xl mx-auto pt-5 text-black">
                <form
                    // onSubmit= {}
                    className="bg-white shadow-[0_3px_10px_rgb(0,0,0,0.2)] rounded px-8 pt-6 pb-8 my-5"
                >
                    <h1 className="text-2xl font-bold mb-7">Add Author</h1>
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-black font-bold mb-2">
                            Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            // value={formData.title || ""}
                            // onChange={handleChange}
                            className="input input-bordered input-md w-full max-w-full bg-white border-1 border-black focus:outline-none focus:border-black"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label
                            htmlFor="bio"
                            className="block text-black font-bold mb-2"
                        >
                            Bio
                        </label>
                        <input
                            type="text"
                            id="bio"
                            name="bio"
                            // value={formData.bio || ""}
                            // onChange={handleChange}
                            className="input input-bordered input-md w-full max-w-full bg-white border-black focus:outline-none focus:border-black"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label
                            htmlFor="birthDate"
                            className="block text-black font-bold mb-2"
                        >
                            Date of Birth
                        </label>
                        <Datepicker
                            primaryColor={"red"}
                            asSingle={true}
                            value={value}
                            onChange={handleValueChange}
                        />
                    </div>

                    <div className="flex items-center justify-end gap-4">
                        <Link
                            href={"/admin/dashboard"}
                            className="btn btn-error btn-md text-white"
                        >
                            Back
                        </Link>
                        <button type="submit" className="btn btn-success btn-md text-white">
                            Create
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddAuthor