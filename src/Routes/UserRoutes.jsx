import React from 'react'
import { Route,  Routes } from 'react-router-dom'
import HomePage from '../pages/HomePage'
import LoginPage from '../pages/LoginPage'
import SigninPage from '../pages/SigninPage'
import ProfilePage from '../pages/ProfilePage'
import HotelListPage from '../pages/HotelListPage'
import HomeStayListPage from '../pages/HomeStayListPage'
import HolidayPackagesList from '../pages/HolidayPackagesList'
import ManagerSignupPage from '../pages/ManagerSignupPage'

function UserRoutes() {
  return (
    <>
    <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='login' element={<LoginPage/>}/>
        <Route path='signin' element={<SigninPage/>}/>
        <Route path='manager_reg' element={<ManagerSignupPage/>}/>
        <Route path='profile' element={<ProfilePage/>}/>
        <Route path='hotellist' element={<HotelListPage/>}/>
        <Route path='homestaylist' element={<HomeStayListPage/>}/>
        <Route path='holidaypackages' element={<HolidayPackagesList/>}/>
    </Routes>
    </>
  )
}

export default UserRoutes