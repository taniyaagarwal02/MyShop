import React from "react";

export default function About() {
  return (
    <div className="max-w-3xl mx-auto text-center py-10">
      <h1 className="text-3xl font-bold mb-4 text-blue-600">About Us</h1>
      <p className="text-gray-700 leading-relaxed">
        Welcome to <span className="font-semibold">MyShop</span> – your one-stop
        online destination for fashion, accessories, and electronics.
        <br />
        <br />
        We are passionate about delivering quality products at affordable
        prices. Our mission is to provide a seamless shopping experience with
        secure checkout and fast delivery.
      </p>
      <div className="mt-6 text-sm text-gray-500">
        © {new Date().getFullYear()} MyShop. All Rights Reserved.
      </div>
    </div>
  );
}
