import React from 'react'
import Slider1 from '../../assets/images/slider1.png'
import Slider2 from '../../assets/images/slider2.png'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';

export default function Home() {
  const navigate = useNavigate()
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };
  
  return (
    <>
    <Helmet>
    <title>Home</title>
  </Helmet> 
   <div className='text-center container p-10'> 
    <h1 className=' font-medium text-2xl mb-4'>Our Most Popular Deals</h1>
    <Slider {...settings}>
      <div>
        <img src={Slider1} className='w-full md:w-2/3 mx-auto' alt={Slider1.alt} />
      </div>
      <div>
      <img src={Slider2} className='w-full md:w-2/3 mx-auto' alt={Slider2.alt} />
      </div>
    </Slider>
    <button onClick={() => navigate('/menu')} className='btn bg-[#ee3d40] hover:bg-red-800 text-white px-3 py-2 font-medium rounded-sm mt-8'>View Our Menu</button>
   </div>
   </>
  )
}
