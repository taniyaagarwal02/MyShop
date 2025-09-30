import React, { useState } from "react";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Contact form submitted:", form);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="max-w-xl mx-auto text-center py-10">
        <h1 className="text-2xl font-bold text-green-600">✅ Message Sent</h1>
        <p className="text-gray-700 mt-2">
          Thank you <span className="font-semibold">{form.name}</span>, we’ll
          get back to you at <span className="font-semibold">{form.email}</span>
          .
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6 text-blue-600 text-center">
        Contact Us
      </h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow rounded-lg p-6 space-y-4"
      >
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={form.name}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={form.email}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
          required
        />
        <textarea
          name="message"
          placeholder="Your Message"
          value={form.message}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
          rows="4"
          required
        ></textarea>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
        >
          Send Message
        </button>
      </form>
    </div>
  );
}
