'use client';
import React from 'react'
import Hero from './Hero/Hero';
import About from './About/About';
import Feature from './Feature/Feature';
import PricingPlans from './PricingPlans/PricingPlans';



const Home = () => {
  return (
    <div>
      <Hero/>
      <About/>
      <Feature />
      <PricingPlans/>
      
    
    </div>
  )
}

export default Home;