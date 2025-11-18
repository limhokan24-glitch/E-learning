import React from 'react'
import HeroContent from './HeroContent'
import Heroimage from './Heroimage'

const Hero = () => {
  return (
    <div className='w-full pt-[4vh] md:pt-[12vh] h-screen bg-red-500 overflow-hidden'>
        <div className='flex justify-center flex-col w-4/5 h-full mx-auto'>
         <div className='grid gird-cols-1 lg:grid-cols-2 items-center gap-12'>
           
            <HeroContent/>
            <Heroimage/>
            </div>    
        </div>
    </div>
  )
}

export default Hero