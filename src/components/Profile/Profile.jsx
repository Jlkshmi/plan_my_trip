import React from 'react'
import './Profile.css'

function Profile() {
    return (
        <>
            <div className='profile-wrapper'>
                <div className='profile-wrapper1'>
                    <div className='sub-wrapper'>
                        <i className="fa-solid fa-camera "></i>
                    </div>
                    <div className='sub-wrapper1'>
                        <h3>UserName</h3>
                        <h5>Personal Profile</h5>
                    </div>
                    <div className='con-sub-wrapper'>
                        <div className='sub-wrapper2'>
                            <i class="fa-regular fa-user"></i>
                            <h3>Profile</h3>
                        </div>
                        <div className='sub-wrapper2'>
                            <i class="fa-solid fa-power-off"></i>
                            <h3>Logout</h3>
                        </div>
                    </div>
                    </div>
                <div className='profile-wrapper2'>
                    <div className='sub-wrapper3'>
                        <h2>Profile</h2>
                        <p>Basic info for a faster booking experience</p>
                        <hr/>
                        <h3>NAME</h3>
                        <h3>BIRTHDAY</h3>
                        <h3>GENDER</h3>
                        <h3>ADDRESS</h3>
                        <h3>PHONE</h3>
                        <h3>PINCODE</h3>
                        <h3>STATE</h3>
                    </div>
                </div>
            </div>
        </>

    )
}

export default Profile