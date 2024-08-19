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
import HomestayDestinationPage from '../pages/HomestayDestinationPage'
import HomestayAddPage from '../pages/HomestayAddPage'
import HotelsAddPage from '../pages/HotelsAddPage'
import HotelDestinationAddPage from '../pages/HotelDestinationAddPage'
import HomestayDestinationAddPage from '../pages/HomestayDestinationAddPage'
import HotelDetailsPage from '../pages/HotelDetailsPage'
import HotelBookPage from '../pages/HotelBookPage'
import HomestayBookPage from '../pages/HomestayBookPage'
import HotelViewListPage from '../pages/AdminPage/HotelViewListPage'
import HomestayViewListPage from '../pages/AdminPage/HomestayViewListPage'
import UserCountViewListPage from '../pages/AdminPage/UserCountViewListPage'
import HotelBookingsViewListPage from '../pages/AdminPage/HotelBookingsViewListPage'
import CustomersListViewPage from '../pages/AdminPage/CustomersListViewPage'
import HomestayBookingsViewListPage from '../pages/AdminPage/HomestayBookingsViewListPage'
import ManagerListViewPage from '../pages/AdminPage/ManagerListViewPage'

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
        <Route path='hoteldestination' element={<HotelDestinationPage/>}/>
        <Route path='homestaydestination' element={<HomestayDestinationPage/>}/>
        <Route path='homestayadd' element={<HomestayAddPage/>}/>
        <Route path='hoteladd' element={<HotelsAddPage/>}/>
        <Route path='homestaylists' element={<HomeStayListsPage/>}/>
        <Route path='hotellist' element={<HotelListPage/>}/>
        <Route path='hoteldetails/:id' element={<HotelDetailsPage/>}/>
        <Route path='homestaydetails/:id' element={<HomeStayDetailedPage/>}/>
        <Route path='paymentform' element={<PaymentFormPage/>}/>  
        <Route path='hotelbook' element={<HotelBookPage/>}/>
        <Route path='homestaybook' element={<HomestayBookPage/>}/>
        <Route path='hotelviewlist' element={<HotelViewListPage/>}/>
        <Route path='homestayviewlist' element={<HomestayViewListPage/>}/>
        <Route path='userlistsview' element={<UserCountViewListPage/>}/>
        <Route path='hotelbookingviewlist' element={<HotelBookingsViewListPage/>}/>
        <Route path='homestaybookingviewlist' element={<HomestayBookingsViewListPage/>}/>
        <Route path='customerviewlist' element={<CustomersListViewPage/>}/>
        <Route path='managerviewlist' element={<ManagerListViewPage/>}/>
    </Routes> 
    </>
  )
}

export default UserRoutes