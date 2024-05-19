import React from 'react'
import './Hotel.css'

function HotelList() {
  return (
    <>
     <div className='catlist-wrapper'>
                <div className='catlist-wrapper1'>
                    <div className='cat-images'>
                        <div >
                            <img className='cat-image' src="" alt="" />
                        </div>
                        <div className='cat-image-list' >
                            <div>hh</div>
                            <div>dd</div>
                            <div>ss</div>

                        </div>
                    </div>
                    <div className='catdetails-wrapper'>
                        <div className='catdetails-wrapper1'>
                            <div><h4>Name</h4></div>
                            <div className='star'>
                                <i class="fa-regular fa-star" ></i>
                                <i class="fa-regular fa-star" ></i>
                                <i class="fa-regular fa-star" ></i>
                                <i class="fa-regular fa-star" ></i>
                                <i class="fa-regular fa-star" ></i>
                            </div>
                        </div>
                        <div className='catdetails-wrapper1'>
                            <div className='fecilities'>
                                <h5>ff</h5>
                                <h5>ff</h5>
                                <h5>ff</h5>
                            </div>
                            <div className='rating'>
                                <h4>Excellent </h4>
                            </div>
                        </div>
                        <div className='catdetails-wrapper1'>
                            <div><h4>Book with 0 payment</h4></div>
                            <div><h4 className='rate'>7000/-</h4></div>
                        </div>
                    </div>
                    
                </div>
            </div>
    </>
  )
}

export default HotelList