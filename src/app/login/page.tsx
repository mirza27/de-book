"use client";
import { useState, FormEventHandler, useEffect } from "react";
import { NextPage } from "next";
import { useRouter, redirect } from "next/navigation";
import { signIn, useSession } from "next-auth/react";

const SignIn: NextPage = (props): JSX.Element => {
  const { data: session } = useSession();
  const [error, setError] = useState("");
  const [userInfo, setUserInfo] = useState({ email: "", password: "" });
  const router = useRouter();

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    try {
      const res = await signIn("credentials", {
        email: userInfo.email,
        password: userInfo.password,
        redirect: true,
        callbackUrl: "http://localhost:3000/",
      });
      console.log(res);
    } catch (error) {
      console.error("Login error:", error);
      setError("An unexpected error occurred. Please try again later.");
    }
  };

  useEffect(() => {
    if (session?.user) {
      router.push("/login")
    }
  }, []);

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
                <form
                  action={async (formData) => {
                    
                    await signIn("credentials", {
                      formData: formData,
                      callbackUrl: "/",
                    });
                  }}
                  onSubmit={handleSubmit}
                >
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text text-black">Email</span>
                    </label>
                    <input
                      name="email"
                      type="email"
                      placeholder="Email"
                      onChange={({ target }) =>
                        setUserInfo({ ...userInfo, email: target.value })
                      }
                      className="input input-bordered bg-white border-black focus:border-black"
                    />
                  </div>
                  <div className="form-control relative">
                    <label className="label">
                      <span className="label-text text-black">Password</span>
                    </label>
                    <input
                      name="password"
                      type="password"
                      placeholder="Password"
                      onChange={({ target }) =>
                        setUserInfo({ ...userInfo, password: target.value })
                      }
                      className="input input-bordered bg-white border-black focus:border-black"
                    />
                  </div>
                  {error && <p className="text-red-500">{error}</p>}
                  <div className="form-control mt-6">
                    <button className="btn bg-black text-white">Login</button>
                  </div>
                </form>
                <div className="text-center mt-4">
                  <span className="text-gray-600">
                    Don't have an account yet?
                  </span>{" "}
                  <a
                    href="/register"
                    className="text-blue-600 hover:text-blue-800 font-medium"
                  >
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

export default SignIn;