import React from 'react'
import './Category.css'
import { useNavigate } from 'react-router-dom'

function Category() {
  const navigate = useNavigate()
  return (
    <>
    <div className='cat-wrapper1'>
    <div className='cat-wrapper'>
      <div className='logo-wrapper'  onClick={()=> navigate('homestaylist')}>
      <img src="/images/homestays.png" alt="" />
      <h4>HomeStays</h4>
      </div>
      <div className='logo-wrapper' onClick={()=> navigate('holidaypackages')}>
        <img src="/images/holidaypackages.jpeg" alt="" />
        <h4>Holiday<br/>Packages</h4>
      </div>
      <div className='logo-wrapper' onClick={()=> navigate('hotellist')}>
          <img src="/images/hotel.jpeg" alt="" />
          <h4>Hotels</h4>
      </div>
    </div>
    </div>
    </>
  )
}

export default Category