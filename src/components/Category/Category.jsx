import React from 'react'
import './Category.css'
import { useNavigate } from 'react-router-dom'

function Category() {
  const navigate = useNavigate()
  return (
    <>
    <div className='cat-wrapper1'>
    <div className='cat-wrapper'>
      <div className='logo-wrapper'  onClick={()=> navigate('homestaydestination')}>
      <img src="/images/homestayy.jpg" alt="" />
      <h4>HomeStays</h4>
      </div>
      {/* <div className='logo-wrapper' onClick={()=> navigate('holidaydestination')}>
        <img src="/images/holidayyy.png" alt="" />
        <h4>Holiday Packages</h4>
      </div> */}
      <div className='logo-wrapper' onClick={()=> navigate('hoteldestination')}>
          <img src="/images/hotel.jpeg" alt="" />
          <h4>Hotels</h4>
      </div>
    </div>
    </div>
    </>
  )
}

export default Category