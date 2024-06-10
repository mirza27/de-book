"use client";
import { useState } from "react";
import { FormEvent } from "react"; // Import FormEvent
import { signIn } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";

export default function LoginPage() {
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    setIsLoading(true);
    event.preventDefault();

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (response.ok) {
        // membuat kredensial di next auth
        console.log("Success");
        // await signIn("credentials", {
        //   email: email,
        //   password: password,
        //   redirect: false,
        //   callbackUrl: process.env.BASE_URL,
        // });
        setIsLoading(false);
        router.push("/dashboard");
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("An unexpected error occurred. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };
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
                <form onSubmit={handleLogin}>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text text-black">Email</span>
                    </label>
                    <input
                      name="email"
                      type="email"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
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
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="input input-bordered bg-white border-black focus:border-black"
                    />
                  </div>
                  {error && <p className="text-red-500">{error}</p>}
                  <div className="form-control mt-6">
                    <button
                      type="submit"
                      className="btn bg-black text-white"
                      disabled={isLoading}
                    >
                      {isLoading ? "Loading..." : "Login"}
                    </button>
                  </div>
                </form>
                <div className="text-center mt-4">
                  <span className="text-gray-600">
                    Dont have an account yet?
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
