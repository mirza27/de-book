'use client';
import { useState } from "react";
import { FormEvent } from 'react'; // Import FormEvent
import { redirect, useRouter } from "next/navigation";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");


  const router = useRouter();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      console.log("Passwords do not match");
      return;
    }
    const response = await fetch('/api/register', {
      method: 'POST',
     
      body: JSON.stringify({
        name,
        email,
        password,
        address : '',
        phone : '',
      })
    });
    if (response.ok) {
      console.log('Success');
      router.push("/login");
    } else {
      console.log('Error');
    }
  };


  return (
    <div className="bg-white h-fit w-full">
      <div className="p-9">
        <h1 className="text-black text-4xl">De.Book</h1>
        <div className="flex justify-center items-center h-full">
          <div className="card bg-white shadow-2xl w-2/5">
            <div className="card-body text-black">
              <div className="flex flex-col items-center">
                <h2 className="card-title text-center text-3xl">Register</h2>
                <div className="divider"></div>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-black">Name</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your name"
                    className="input input-bordered bg-white border-black focus:border-black"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-black">Email</span>
                  </label>
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    className="input input-bordered bg-white border-black focus:border-black"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text text-black">Password</span>
                    </label>
                    <input
                      type="password"
                      placeholder="Enter your password"
                      className="input input-bordered bg-white border-black focus:border-black"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text text-black">Confirm Password</span>
                    </label>
                    <input
                      type="password"
                      placeholder="Confirm your password"
                      className="input input-bordered bg-white border-black focus:border-black"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </div>
                </div>
                {/* Additional fields */}
                <div className="form-control mt-6">
                  <button type="submit" className="btn bg-black text-white">Register</button>
                </div>
              </form>
              <div className="text-center mt-4">
                <span className="text-gray-600">Already have an account?</span>{' '}
                <a href="/login" className="text-blue-600 hover:text-blue-800 font-medium">
                  Login
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
