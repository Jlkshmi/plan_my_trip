import React, { useState } from 'react'
import './Nav.css'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { initialState, updateUser } from '../../redux/slices/userSlice'

function Navbar() {
  const navigate = useNavigate()
  const user = useSelector(state => state.user)
  const { username } = useSelector(state => state.user)
  const dispatch = useDispatch()

  const [isOpen, setIsOpen] = useState(false)
  const handleToggle = () => {
    setIsOpen(!isOpen)
  }
  return (
    <>
      <nav >
        <div className='nav-wrapper'>

          <ul className='nav-ul'>
            <div className='nav-logo' onClick={() => navigate('/')}>
              <li><h3>Plan</h3></li>
              <img src='/images/logomy.jpg' className='nav-logo1' />
              <li><h3>Trip</h3></li>
            </div>
          </ul>
          {(user.type == "user") ?
            (<div>
              <ul className='nav-ul'>
                <li><i className="fa-solid fa-power-off" onClick={() => dispatch(updateUser(initialState))}></i></li>
                <li><i className="fa-regular fa-user" onClick={() => navigate('/profile')}></i></li>
                <li>Hello {username}</li>
              </ul></div>)
            : (user.type == "manager") ?
              (<>
                <ul className='nav-ul'>
                  <li><i className="fa-solid fa-power-off" onClick={() => dispatch(updateUser(initialState))}></i></li>
                  <div className='dropdown'>
                    <li><i className="fa-regular fa-user" onClick={handleToggle}>
                    </i>{username}</li>
                    {isOpen && (
                      <div className='dropdown-menu'>
                        <button className='dropdown-item' onClick={() => navigate('/homestayadd')}>Add Homestays</button>
              
                        <button className='dropdown-item' onClick={() => navigate('/hoteladd')}>Add Hotels</button>
                      </div>
                    )}
                  </div>
                </ul>
              </>)
              : (user.type == "admin") ? (<ul className='nav-ul'>
                <li><i className="fa-solid fa-power-off" onClick={() => dispatch(updateUser(initialState))}></i></li>
                <div className='dropdown'>
                  <li onClick={handleToggle}><i className="fa-regular fa-user"
                  ></i>{username}
                  </li>
                  {isOpen && (
                    <div className='dropdown-menu'>
                      <button className='dropdown-item' onClick={() => navigate('/homestaydestinationadd')}>Add Homestay</button>
                      <button className='dropdown-item' onClick={() => navigate('/hoteldestinationadd')} >Add Hotel</button>
                      <button className='dropdown-item' onClick={() => navigate('/hotelviewlist')}>Hotel List</button>
                      <button className='dropdown-item' onClick={() => navigate('/homestayviewlist')}>Homestay List</button>
                      <button className='dropdown-item' onClick={() => navigate('/userlistsview')}>User lists</button>
                      <button className='dropdown-item' onClick={() => navigate('/hotelbookingviewlist')}>Booked Hotels</button>
                      <button className='dropdown-item' onClick={()=>navigate('/homestaybookingviewlist')}>Booked Homestays</button>
                      <button className='dropdown-item' onClick={()=>navigate('/customerviewlist')}>Customets List</button>
                      <button className='dropdown-item' onClick={()=>navigate('/managerviewlist')}>Managers List</button>

                      
                      
                    
                    </div>
                  )}
                </div></ul>)
                : (<ul className='nav-ul'>
                  <div className='nav-text'>
                    <li><h3 onClick={() => navigate('/login')}>Login</h3></li>
                    <li><h3 onClick={() => navigate('/signin')}>Signup</h3></li>
                    <li><h3 onClick={() => navigate('/manager_reg')}>Manager Registration</h3></li>
                  </div>
                </ul>)}
        </div>
      </nav >
    </>
  )
}

export default Navbar