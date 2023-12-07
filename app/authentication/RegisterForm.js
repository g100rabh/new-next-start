"use client";
import Link from "next/link";
import { useState } from "react";

const RegisterForm = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [conPassword, setConPassword] = useState();

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if(password === conPassword){
        const response = await fetch("/api/auth/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            password: password,
          }),
        });
        if (response.ok) {
          alert("User successfully registered.");
          // Reset form state
          setEmail("");
          setPassword("");
          setConPassword("");
        } else {
          alert("Registration failed. Please try again.");
        }
      } else {
        alert('Password does not match')
      }
  };

  return (
    <div className="flex items-center justify-center">
      <div className="bg-white p-8 rounded shadow-md w-96 flex flex-col items-center justify-center">
        <h2 className="text-2xl font-semibold mb-4">Register</h2>
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

          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-600"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="conPassword"
              name="conPassword"
              value={conPassword}
              onChange={(e) => setConPassword(e.target.value)}
              className="mt-1 p-2 w-full border rounded-md"
              required
            />
          </div>

          <div className="flex items-center justify-center mt-4">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
              Register
            </button>
          </div>
        </form>
        <p className="mt-4">
          Already have an account?
          <Link href="signin" className="text-blue-700">
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterForm;
