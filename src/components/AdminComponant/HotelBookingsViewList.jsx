import axios from 'axios';
import React, { useEffect, useState } from 'react'

function HotelBookingsViewList() {

    const [hotelBookings,setHotelBookings] = useState([])
    

    useEffect(() => {
        axios
            .get('http://127.0.0.1:8000/hotel_bookings_list_view')
            .then((res) => setHotelBookings(res.data))
            .catch((err) => console.log(err));
    }, [])

  return (

  <>
  <div className='hotelview_div'>
    <table>
        <thead>
            <tr>
                <th>HOTEL</th>
                <th>CHECK-IN</th>
                <th>CHECK-OUT</th>
                <th>USER</th>
            </tr>
        </thead>
        <tbody>
            {hotelBookings.map((ele,index)=>(
        <tr key={index}>
            <td>{ele.hotel?.name}</td>
            <td>
                {ele.check_in_date}
            </td>
            <td>{ele.check_out_date}</td>
            <td>{ele.user?.name }</td>
            
        </tr>
    ))}
        </tbody>
    </table>
  </div>
  </>
  )
}

export default HotelBookingsViewList