import React, { useCallback, useEffect, useRef, useState } from 'react'
import "./banner.css";

const image = ['https://images2.alphacoders.com/677/677605.jpg',
    'https://images.pexels.com/photos/1603650/pexels-photo-1603650.jpeg?cs=srgb&dl=pexels-sudipta-1603650.jpg&fm=jpg',
    'https://images.unsplash.com/photo-1602643163983-ed0babc39797?q=80&w=1965&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1523544261025-3159599b1fc3?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1592548890095-cd2a7aeca5ac?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1593693411515-c20261bcad6e?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
]

function Banner() {
    const [slideLeft, setSlideLeft] = useState(0)
    const timeRef = useRef(null)
  
    const prevImage = () => {
      slideLeft <= 0
        ? setSlideLeft((image.length - 1) * 100)
        : setSlideLeft((slideLeft - 100))
    }
    
    const nextImage = useCallback(() => {
      slideLeft >= (image.length - 1) * 100
        ? setSlideLeft(0)
        : setSlideLeft((slideLeft + 100))
    },[slideLeft,image]);
  
    useEffect(()=>{
      if(timeRef.current){
        clearTimeout(timeRef.current)
      }
      timeRef.current = setTimeout(()=>{
        nextImage()
      },4000)
      return()=> clearInterval(timeRef.current)
    },[nextImage])
  return (
    <>
    <div className='display'>
    <div className='slide-image' style={{ marginLeft: `-${slideLeft}%` }}>
        {image.map((ele,i) =>(
            <img 
            src={ele}
            key={i}
          
            />
    
        ))}
    </div>
    {/* <button className='left_btn' onClick={prevImage}><i className="fa-solid fa-arrow-left"></i></button> */}
    {/* <button className='right_btn' onClick={nextImage}><i className="fa-solid fa-arrow-right"></i></button> */}
    <div className='image-text'>
      <p>FIND YOUR DESTINEY</p>
    </div>
    </div>
   </>
    
  )
}

export default Banner