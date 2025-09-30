import React, { useState } from "react";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loggedIn, setLoggedIn] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login submitted:", form);
    setLoggedIn(true);
  };

  if (loggedIn) {
    return (
      <div className="max-w-md mx-auto text-center py-10">
        <h1 className="text-2xl font-bold text-green-600">🎉 Welcome Back!</h1>
        <p className="mt-2 text-gray-700">
          You are now logged in as{" "}
          <span className="font-semibold">{form.email}</span>.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6 text-blue-600 text-center">
        Login
      </h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow rounded-lg p-6 space-y-4"
      >
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
        >
          Login
        </button>
      </form>
      <p className="text-center text-sm text-gray-600 mt-4">
        Don’t have an account?{" "}
        <span className="text-blue-600 cursor-pointer hover:underline">
          Sign up
        </span>
      </p>
    </div>
  );
}
