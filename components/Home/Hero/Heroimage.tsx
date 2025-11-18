'use client';

import Image from 'next/image';
import React from 'react'
import Tilt from 'react-parallax-tilt';

const Heroimage = () => {
  return (
    <Tilt>
      <div className='hidden lg:flex items-center justify-center'>
        <div className='w-[500px] h-[500px] rounded-full overflow-hidden flex items-center justify-center shadow-lg'>
          <Image
            src='/f.jpg'
            width={1000}
            height={800}
            alt='Hero'
            className='object-cover w-full h-full'
            priority
          />
        </div>
      </div>
    </Tilt>
  );
}

export default Heroimage;