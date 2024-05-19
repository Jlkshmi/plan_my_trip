import React from 'react'
import './Nav.css'
import { useNavigate } from 'react-router-dom'



function Navbar() {
  const navigate= useNavigate()
  return (
    <>
      
        <nav >
          <div className='nav-wrapper'>
         
          <ul className='nav-ul'>
            <div className='nav-logo' onClick={()=>navigate('/')}>
              <li><h3>Plan</h3></li>
              <img src='/images/logo.png' className='nav-logo1' />
              <li><h3>Trip</h3></li>
            </div>
          </ul>
          <ul className='nav-ul'>
            <div className='nav-text'>
              <li ><h3 onClick={()=> navigate('/login')}>Login</h3></li>
              <li><h3 onClick={()=>navigate('/signin')}>Signup</h3></li>
            </div>
          </ul>
        </div>

        

        </nav>
   

    </>

  )
}

export default Navbar