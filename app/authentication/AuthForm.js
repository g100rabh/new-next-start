"use client";
import React, { useEffect, useRef, useState } from "react";
import "../../styles/global.css";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";



const AuthForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [conPassword, setConPassword] = useState("");
  const [isLoginPage, setIsLoginPage] = useState(true);
  const router = useRouter();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConPassChange = (e) => {
    setConPassword(e.target.value);
  };
  

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!isLoginPage) {
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
    } else {
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
    }
  };

  const switchHandler = () => {
    setIsLoginPage((prev) => !prev);
  };

  return (
   <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded shadow-md w-96 flex flex-col items-center justify-center">
        <h2 className="text-2xl font-semibold mb-4">
          {isLoginPage ? "Log In" : "Register"}
        </h2>
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
              onChange={handleEmailChange}
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
              onChange={handlePasswordChange}
              className="mt-1 p-2 w-full border rounded-md"
              required
            />
          </div>
          {!isLoginPage && (
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
                onChange={handleConPassChange}
                className="mt-1 p-2 w-full border rounded-md"
                required
              />
            </div>
          )}
          <div className="flex items-center justify-center mt-4">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
              {isLoginPage ? "Log In" : "Register"}
            </button>
          </div>
        </form>
        <p className="mt-4">
          {isLoginPage ? "Don't have an account?" : "Already have an account?"}{" "}
          <button onClick={switchHandler}>
            <a className="text-blue-500">
              {isLoginPage ? "Register" : "Log in"}
            </a>
          </button>
        </p>
      </div>
    </div>
  );
};

export default AuthForm;
