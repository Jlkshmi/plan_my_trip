import React from 'react'
import './Profile.css'
import { useDispatch, useSelector } from 'react-redux'
import { initialState, updateUser } from '../../redux/slices/userSlice'
import { Link, useNavigate } from 'react-router-dom'

function Profile() {
    const user = useSelector(state => state.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    return (
        <>
            <div className='profile-wrapper'>
                <div className='profile-wrapper1'>
                    <div className='sub-wrapper'>
                        <i className="fa-solid fa-camera "></i>
                    </div>
                    <div className='sub-wrapper1'>
                        <h3>{user.username}</h3>
                        <h4>Personal Profile</h4>
                    </div>
                    {user ? (<div className='con-sub-wrapper'>
                        <div className='sub-wrapper2'>
                            <i className="fa-regular fa-user"></i>
                            <h3>Profile</h3>
                        </div>
                        <div className='sub-wrapper2'>
                            <i className="fa-solid fa-power-off" onClick={() => dispatch(updateUser(initialState))}></i>
                            <h3>Logout</h3>
                        </div>
                    </div>) : (<Link to="/">
                    </Link>)}
                </div>
                
                <div className='profile-wrapper2'>
                    <div className='sub-wrapper3'>
                        <h2>Profile</h2>
                        <p>Basic info for a faster booking experience</p>
                        <hr />
                        <h3>NAME : {user.name}</h3>
                        <h3>EMAIL : {user.email}</h3>
                        <h3>PHONE : {user.phone}</h3>
                        <h3>ADDRESS : {user.address}</h3>
                    </div>
                </div>
            </div>
        </>

    )
}

export default Profile