import React from 'react'
import { Route,  Routes } from 'react-router-dom'
import HomePage from '../pages/HomePage'
import LoginPage from '../pages/LoginPage'
import SigninPage from '../pages/SigninPage'
import ProfilePage from '../pages/ProfilePage'
import HotelListPage from '../pages/HotelListPage'
import ManagerSignupPage from '../pages/ManagerSignupPage'
import HomeStayListsPage from '../pages/HomeStayListsPage'
import HomeStayDetailedPage from '../pages/HomeStayDetailedPage'
import PaymentFormPage from '../pages/PaymentFormPage'
import HotelDestinationPage from '../pages/HotelDestinationPage'
import HolidayPackagesListPage from '../pages/HolidayPackagesListPage'
import HolidayPackageDestinationPage from '../pages/HolidayPackageDestinationPage'
import HomestayDestinationPage from '../pages/HomestayDestinationPage'
import HomestayAddPage from '../pages/HomestayAddPage'
import HotelsAddPage from '../pages/HotelsAddPage'
import HolidayPackagesAddPage from '../pages/HolidayPackagesAddPage'
import HotelDestinationAddPage from '../pages/HotelDestinationAddPage'
import HomestayDestinationAdd from '../components/AdminComponant/HomestayDestinationAdd'
import HomestayDestinationAddPage from '../pages/HomestayDestinationAddPage'
import HolidayPackagesDestinationAddPage from '../pages/HolidayPackagesDestinationAddPage'

function UserRoutes() {
  return (
    <>
    <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='login' element={<LoginPage/>}/>
        <Route path='signin' element={<SigninPage/>}/>
        <Route path='manager_reg' element={<ManagerSignupPage/>}/>
        <Route path='profile' element={<ProfilePage/>}/>
        <Route path='hoteldestinationadd' element={<HotelDestinationAddPage/>}/>
        <Route path='homestaydestinationadd' element={<HomestayDestinationAddPage/>}/>
        <Route path='holidaypackagesdestinationadd' element={<HolidayPackagesDestinationAddPage/>}/>
        <Route path='hoteldestination' element={<HotelDestinationPage/>}/>
        <Route path='homestaydestination' element={<HomestayDestinationPage/>}/>
        <Route path='holidaydestination' element={<HolidayPackageDestinationPage/>}/>
        <Route path='homestayadd' element={<HomestayAddPage/>}/>
        <Route path='hoteladd' element={<HotelsAddPage/>}/>
        <Route path='holidayadd' element={<HolidayPackagesAddPage/>}/>
        <Route path='homestaylists' element={<HomeStayListsPage/>}/>
        <Route path='hotellist' element={<HotelListPage/>}/>
        <Route path='holidaypackagelist' element={<HolidayPackagesListPage/>}/>
        <Route path='homestaydetails/:id' element={<HomeStayDetailedPage/>}/>
        <Route path='paymentform' element={<PaymentFormPage/>}/>  
    </Routes> 
    </>
  )
}

export default UserRoutes