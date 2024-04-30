import Footer from '@/components/Footer'
import NavBar from '@/components/NavBar'
import React from 'react'
import Image from 'next/image'
import AmountInput from '@/components/AmountInput'

export default function page() {
    return (
        <>
            <NavBar />

            <div className='w-full h-screen bg-white text-black p-16'>
                <h1 className='text-4xl font-semibold'>Shopping Cart</h1>
                <div className="flex gap-7 py-5">
                    <div className='bg-white shadow-xl border-2 rounded-badge text-black w-8/12 h-fit'>
                        <div className='flex justify-between'>
                            <div className='flex items-center gap-9 p-9'>
                                <Image src="/book3.png" width={100} height={150} alt="buku-3" />
                                <div className='text-xl'>
                                    <h1 className='font-semibold'>The Mountain is You</h1>
                                    <p>Rp50.000,00</p>
                                </div>
                            </div>
                            <div className='flex items-center gap-9 p-9'>
                                <AmountInput />
                                <p className='pt-5'>Rp50.000,00</p>
                                <button className="btn w-36 btn-error mt-5 hover:btn-error border-none text-white hover:text-white btn-sm rounded-badge">Delete</button>
                            </div>
                        </div>
                        <div className="divider divide-neutral-950 mx-9"></div>
                        <div className='flex justify-between'>
                            <div className='flex items-center gap-9 p-9'>
                                <Image src="/book3.png" width={100} height={150} alt="buku-3" />
                                <div className='text-xl'>
                                    <h1 className='font-semibold'>The Mountain is You</h1>
                                    <p>Rp50.000,00</p>
                                </div>
                            </div>
                            <div className='flex items-center gap-9 p-9'>
                                <AmountInput />
                                <p className='pt-5'>Rp50.000,00</p>
                                <button className="btn w-36 btn-error mt-5 hover:btn-error border-none text-white hover:text-white btn-sm rounded-badge">Delete</button>
                            </div>
                        </div>
                    </div>
                    <div className='card bg-white shadow-xl border-2 w-4/12 h-fit'>
                        <h1 className='text-4xl pt-6 px-9 font-semibold'>Expenditure Details</h1>
                        <div className="divider divide-neutral-950"></div>
                        <div className="flex px-9 justify-between text-xl font-medium">
                            <p>Payment summary</p>
                            <p>Rp157.000,00</p>
                        </div>
                        <div className="flex justify-center m-9 items-center">
                            <button className="btn mt-2 w-full text-lg h-10 bg-success hover:bg-success border-none text-white btn-sm rounded-badge">Pay now</button>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </>
    )
}
