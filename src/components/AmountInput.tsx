'use client'

import React, { useState } from 'react';
import Image from 'next/image';

const AmountInput = () => {
    // State untuk menyimpan nilai amount
    const [amount, setAmount] = useState(0);

    // Fungsi untuk menambah amount
    const handleIncrease = () => {
        setAmount((prevAmount) => prevAmount + 1);
    };

    // Fungsi untuk mengurangi amount
    const handleDecrease = () => {
        // Menghindari nilai negatif
        if (amount > 0) {
            setAmount((prevAmount) => prevAmount - 1);
        }
    };

    return (
        <div className="flex items-center border-2 border-black rounded-badge mt-5">
            <button
                className="text-black px-2 py-1"
                onClick={handleDecrease}
            >
                <Image src="/minus.png" width={20} height={20} alt="icon-plus" />
            </button>
            <input
                type="text"
                className="w-16 h-5 bg-white rounded-lg text-center focus:border-white"
                value={amount}
                onChange={(e) => setAmount(parseInt(e.target.value) || 0)}
            />
            <button
                className="text-black px-2 py-1"
                onClick={handleIncrease}
            >
                <Image src="/plus.png" width={20} height={20} alt="icon-plus" />
            </button>
        </div>
    );
};

export default AmountInput;
