import React from 'react'
import './Nav.css'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { initialState, updateUser } from '../../redux/slices/userSlice'



function Navbar() {
  const navigate = useNavigate()
  const {username} = useSelector(state => state.user)
  const dispatch=useDispatch()

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
          {username ? (<div>
            <ul className='nav-ul'>
            <li><i className="fa-solid fa-power-off" onClick={()=>dispatch(updateUser(initialState))}></i></li>
            <li><i className="fa-regular fa-user" onClick={() => navigate('/profile')}></i></li>
            <li>Hello {username}</li>
            </ul></div>) :
            (<ul className='nav-ul'>
              <div className='nav-text'>
                <li><h3 onClick={() => navigate('/login')}>Login</h3></li>
                <li><h3 onClick={() => navigate('/signin')}>Signup</h3></li>
                <li><h3 onClick={() => navigate('/manager_reg')}>Manager Registration</h3></li>
              </div>
            </ul>)}
        </div>
      </nav>
    </>
  )
}

export default Navbar