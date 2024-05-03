'use client';
import Footer from '@/components/Footer'
import NavBar from '@/components/NavBar'
import React from 'react'
import Image from 'next/image'
import AmountInput from '@/components/AmountInput'

export default function BookDetailPage() {
    return (
        <>
            <NavBar />
            <div className="w-full h-fit bg-white flex justify-center items-center">
                <div className="card w-72 bg-base-100 my-16 shadow-xl">
                    <Image src="/book3.png" width={500} height={500} alt='Book3' />
                </div>
                <div className="text-black ml-24 max-w-5xl">
                    <h1 className="text-4xl py-3">The Mountain is You</h1>
                    <p className="text-2xl mb-3">Rp50.000</p>
                    <h1 className="text-xl font-medium">Description</h1>
                    <p className="text-md">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nisi, pariatur praesentium dolores error perspiciatis laboriosam ducimus repudiandae molestias ea labore, magnam adipisci eligendi, consequuntur placeat repellendus. Reiciendis alias deserunt expedita?
                        Cum debitis id incidunt assumenda mollitia pariatur provident aspernatur nobis corrupti! Reiciendis enim atque iusto illum nam velit nulla excepturi amet aperiam harum sapiente, dolorem laboriosam molestiae ducimus maxime voluptate.</p>
                    <h1 className="text-xl mt-3 font-medium">Detail</h1>
                    <div className="flex pt-2 gap-5">
                        <div>
                            <h1 className="text-md">Number of Pages</h1>
                            <p className="text-lg">280</p>
                        </div>
                        <div>
                            <h1 className="text-md">Publication Date</h1>
                            <p className="text-lg">7 Des 2024</p>
                        </div>
                        <div>
                            <h1 className="text-md">Publisher</h1>
                            <p className="text-lg">Renebook</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-5">
                        <h1 className="text-xl mt-5">Amount: </h1>
                        <AmountInput />
                    </div>
                    <div className="flex mt-3 gap-5">
                        <button className="btn w-36 bg-success hover:bg-success border-none text-white btn-sm rounded-badge">Buy Now</button>
                        <button className="btn w-36 btn-outline text-black border-black btn-sm rounded-badge">
                            <Image src="/shopping-cart.png" width={20} height={20} alt="shopping-cart-icon"/>
                            Add to Cart
                            </button>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}
