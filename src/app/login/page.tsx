import React from 'react';

export default function Page() {
  return (
    <>
      <div className="bg-white h-screen w-full">
        <div className="p-9">
          <h1 className="text-black text-4xl">De.Book</h1>
          {/* Login Card */}
          <div className="flex justify-center items-center h-full">
            <div className="card bg-white shadow-2xl w-1/3">
              <div className="card-body text-black">
                <div className="flex flex-col items-center">
                  <h2 className="card-title text-center text-3xl">Login</h2>
                  <div className="divider"></div>
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-black">Email</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Email"
                    className="input input-bordered bg-white border-black focus:border-black"
                  />
                </div>
                <div className="form-control relative">
                  <label className="label">
                    <span className="label-text text-black">Password</span>
                  </label>
                  <input
                    type="password"
                    placeholder="Password"
                    className="input input-bordered bg-white border-black focus:border-black"
                  />
                </div>
                <div className='flex justify-end'>
                  <a href="#" className="text-xs font-medium text-gray-600 hover:text-black">
                    Forget Password
                  </a>
                </div>
                <div className="form-control mt-6">
                  <button className="btn bg-black text-white">Login</button>
                </div>
                <div className="text-center mt-4">
                  <span className="text-gray-600">Don't have an account yet?</span>{' '}
                  <a href="/register" className="text-blue-600 hover:text-blue-800 font-medium">
                    Register
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}