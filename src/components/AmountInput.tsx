"use client";
import React from "react";
import Image from "next/image";

// Definisikan antarmuka untuk props
interface Props {
  amount: number;
  setAmount: React.Dispatch<React.SetStateAction<number>>;
}

const AmountInput: React.FC<Props> = ({ amount, setAmount }) => {
  const handleIncrease = () => {
    setAmount((prevAmount) => prevAmount + 1);
    console.log(amount);
  };

  const handleDecrease = () => {
    if (amount > 0) {
      setAmount((prevAmount) => prevAmount - 1);
      console.log(amount);
    }
  };

  return (
    <div className="flex items-center border-2 border-black rounded-badge mt-5">
      <button className="text-black px-2 py-1" onClick={handleDecrease}>
        <Image src="/minus.png" width={20} height={20} alt="icon-minus" />
      </button>
      <input
        type="text"
        className="w-16 h-5 bg-white rounded-lg text-center focus:border-white"
        value={amount}
        onChange={(e) => setAmount(parseInt(e.target.value))}
      />
      <button className="text-black px-2 py-1" onClick={handleIncrease}>
        <Image src="/plus.png" width={20} height={20} alt="icon-plus" />
      </button>
    </div>
  );
};

export default AmountInput;
