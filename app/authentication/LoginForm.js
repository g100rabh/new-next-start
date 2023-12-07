"use client";
import React, {useState } from "react";
import "../../styles/global.css";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const LoginForm = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const router = useRouter();

  const handleFormSubmit = async (e) => { 
    e.preventDefault();
    const result = await signIn('credentials', {
        email: email,
        password: password,
        redirect: false, 
      });
      if(!result.ok){
        alert("Invalid credentials. Please try again.");
      }
      console.log(result);
      if(!result.error){
        router.push('/');
        router.refresh()
      }
  };

  return (
    <div className="flex items-center justify-center">
      <div className="bg-white p-8 rounded shadow-md w-96 flex flex-col items-center justify-center">
        <h2 className="text-2xl font-semibold mb-4">Sign In</h2>
        <form onSubmit={handleFormSubmit}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-600"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 p-2 w-full border rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-600"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 p-2 w-full border rounded-md"
              required
            />
          </div>

          <div className="flex items-center justify-center mt-4">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
              Sign In
            </button>
          </div>
        </form>
        <p className="mt-4">
        Don't have an account?
          <Link href="/register" className="text-blue-700">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
