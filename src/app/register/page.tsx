import React from 'react';

export default function Page() {
  return (
    <>
      <div className="bg-white h-fit w-full">
        <div className="p-9">
          <h1 className="text-black text-4xl">De.Book</h1>
          {/* Login Card */}
          <div className="flex justify-center items-center h-full">
            <div className="card bg-white shadow-2xl w-2/5">
              <div className="card-body text-black">
                <div className="flex flex-col items-center">
                  <h2 className="card-title text-center text-3xl">Register</h2>
                  <div className="divider"></div>
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-black">Name</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your name"
                    className="input input-bordered bg-white border-black focus:border-black"
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-black">Email</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your email address"
                    className="input input-bordered bg-white border-black focus:border-black"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text text-black border-black focus:border-black">Password</span>
                    </label>
                    <input
                      type="password"
                      placeholder="Enter your password"
                      className="input input-bordered bg-white border-black focus:border-black"
                    />
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text text-black">Confirm Password</span>
                    </label>
                    <input
                      type="password"
                      placeholder="Enter your password"
                      className="input input-bordered bg-white border-black focus:border-black"
                    />
                  </div>
                </div>
                <div className="form-control mt-6">
                  <button className="btn bg-black text-white">Register</button>
                </div>
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
    </>
  );
}