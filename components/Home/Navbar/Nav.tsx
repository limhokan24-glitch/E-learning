"use client";
import { navLinks } from '@/constants/constnt';
import Image from 'next/image'
import Link from 'next/link';
import React, { useEffect, useState } from 'react'

const Nav = () => {

    const [navBg, setNavBg]=useState(false);

    useEffect (()=>{
      const handler = () => {
        if(window.scrollY >= 90){
          setNavBg(true);
        }
        if(window.scrollY < 90){
          setNavBg(false);
        }
      };
      window.addEventListener('scroll', handler);
      return () => {
        window.removeEventListener('scroll', handler);
      }});

  return (
    <div className='fixed 
    ${navBg ? "bg-indigo-800 : "fixed"
    } w-full transition-all duration-200 h-[15vh] z-[1000] bg-red-600'
    >
      <div className='flex items-center h--full justify-between w-[90%] x1:w-[80%] mx-auto'>
        {/* Logo */}
        <Image
          src='/logo.jpg'
          alt='History e-learning logo'
          width={140}
          height={140}
          className='rounded-full object-cover'
        />
        {/*Nav Links */}
        <div className='hidden lg:flex items-center space-x-10'>
          {navLinks.map((link) => {
            return (
            <Link key={link.id} href={link.url}>
              <p className='nav__link'>{link.label}</p>
            </Link>
            );
          })}
        </div>
        {/* Button */}
        <div className='flex items-center space-x-4'>
          <button className='md:px-10 md:py-2 px-8 py-1.5 text-black font-semibold text-base bg-stone-100 hover:bg-pink-600 transition-all durarion-200 rounded-lg'>
            <Link href="/Login?type=login">Log In</Link>
          </button>
            <button className='md:px-10 md:py-2 px-8 py-1.5 text-black font-semibold text-base bg-stone-100 hover:bg-pink-600 transition-all durarion-200 rounded-lg'>
            <Link href="/Login?type=register">Sign Up</Link>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Nav;