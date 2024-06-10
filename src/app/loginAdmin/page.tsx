"use client";
import { useState } from "react";
import { FormEvent } from "react"; // Import FormEvent
import { redirect, useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

export default function LoginPage() {
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await fetch("/api/admin/login", {
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
        await signIn("credentials", {
          email: email,
          password: password,
          redirect: true,
          callbackUrl: "http://localhost:3000/admin/dashboard",
        });
        router.push("/admin/dashboard");
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("An unexpected error occurred. Please try again later.");
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
                  <h2 className="card-title text-center text-3xl">
                    Admin Login
                  </h2>
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
                    <button type="submit" className="btn bg-black text-white">
                      Login
                    </button>
                  </div>
                </form>
                <div className="text-center mt-4">
                  <span className="text-gray-600">Not a Admin</span>{" "}
                  <a
                    href="/login"
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
