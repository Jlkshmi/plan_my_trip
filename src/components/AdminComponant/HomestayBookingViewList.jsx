import axios from 'axios'
import React, { useEffect, useState } from 'react'

function HomestayBookingViewList() {
    const [homestayBookings,setHomestayBookings]=useState([])
    useEffect(()=>{
        axios
            .get('http://127.0.0.1:8000/homestay_booking_list_view')
            .then((res) => setHomestayBookings(res.data))
            .catch((err) => console.log(err));
    },[])
  return (
    <>
    <div className='hotelview_div'>
        <table>
            <thead>
                <tr>
                    <th>
                        HOMESTAY
                    </th>
                    <th>CHECK-IN</th>
                    <th>CHECK-OUT</th>
                    <th>USER</th>
                </tr>
            </thead>
            <tbody>
                {homestayBookings.map((ele,index)=>(
                <tr>
                    <td>{ele.homestay.name}</td>
                    <td>{ele.check_in_date}</td>
                    <td>{ele.check_out_date}</td>
                    <td>{ele.user.name}</td>
                </tr>
                ))}
                
            </tbody>
        </table>
    </div>
    </>
  )
}

export default HomestayBookingViewList