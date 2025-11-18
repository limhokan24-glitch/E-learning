import Image from "next/image";
import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa6";

const Footer = () => {
  return (
    <div className="pt-20 pb-12 bg-red-950">
      {/* Define grid */}
      <div
        className="w-[85%] mx-auto grid items-start grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-8   
        border-b border-white border-opacity-20">
    
        
        {/* 1st footer part */}
        <div>
          <Image src="/logo-icon.png" alt="Logo" height={100} width={100} />
          <p className="text-white text-opacity-80 mt-2">Ready to start learning?</p>
          {/* social links */}
          <div className="flex items-center space-x-4 mt-6">
            <FaFacebookF className="w-6 h-6 text-blue-600 cursor-pointer hover:scale-110 transition" />
            <FaTwitter className="w-6 h-6 text-sky-500 cursor-pointer hover:scale-110 transition" />
            <FaYoutube className="w-6 h-6 text-red-700 cursor-pointer hover:scale-110 transition" />
            <FaInstagram className="w-6 h-6 text-pink-600 cursor-pointer hover:scale-110 transition" />
          </div>
        </div>

        {/* 2nd part */}
        <div>
          <h1 className="footer__heading font-semibold text-white text-lg mb-4">
            Popular Feature
          </h1>
          <p className="footer__link text-gray-300 hover:text-white">Quiz</p>
          <p className="footer__link text-gray-300 hover:text-white">Mocktest</p>
          <p className="footer__link text-gray-300 hover:text-white">Progress chart</p>
          <p className="footer__link text-gray-300 hover:text-white">Unlimited Access</p>
          <p className="footer__link text-gray-300 hover:text-white">Downloadable documents</p>
        </div>

        {/* 3rd part */}
        <div>
          <h1 className="footer__heading font-semibold text-white text-lg mb-4">
            Quick Link
          </h1>
          <p className="footer__link text-gray-300 hover:text-white">Home</p>
          <p className="footer__link text-gray-300 hover:text-white">Features</p>
          <p className="footer__link text-gray-300 hover:text-white">Pricing</p>
          <p className="footer__link text-gray-300 hover:text-white">About us</p>
          <p className="footer__link text-gray-300 hover:text-white">Profile</p>
        </div>

        {/* 4th part (Newsletter) */}
        <div className="lg:-ml-8"> {/* Moves section slightly left */}
          <h1 className="footer__heading font-semibold text-white text-lg mb-4">
            Subscribe to our Newsletter
          </h1>
          <input
            type="text"
            placeholder="Enter your email"
            className="px-6 py-2 rounded-lg outline-none bg-gray-700 w-full text-white placeholder-gray-400"
          />
          <button className="px-6 py-2 mt-4 rounded-lg bg-rose-700 w-full text-white hover:bg-rose-600 transition">
            Subscribe
          </button>
        </div>
      </div>

      <p className="text-center mt-6 text-sm text-white opacity-70">
        © Copyright 2025 by <span className="font-semibold">Lim Hokan</span> &{" "}
        <span className="font-semibold">Chan Sophanyrauth</span>
      </p>
    </div>
  );
};

export default Footer;
