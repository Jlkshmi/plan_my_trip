import axios from 'axios'
import React, { useEffect, useState } from 'react'

function HotelBookingsManage() {
  const [bookedHotels,setBookedHotels] = useState([])

  useEffect(()=>{
    axios
      .get('http://127.0.0.1:8000/HotelBookingListCreateView')
      .then((res) => setBookedHotels(res.data))
      .catch(err => console.log(err));
  },[])

  const handleDelete = (id)=>{
    axios
        .delete(`http://127.0.0.1:8000/HotelBookingsDelete/${id}`)
        .then(() => {setBookedHotels(Bookings.filter(Bookings => Bookings.id !== id))})
        .catch(err => console.log(err));
}

  return (
    <>
    <table>
        <thead>
            <tr>
                <th>
                    HOTEL
                </th>
                <th>
                  CHECK-IN
                </th>
                <th>
                  CHECK-OUT
                </th>
                <th>
                  CITY
                </th>
            </tr>
        </thead>
        <tbody>
          {bookedHotels.map((ele,index)=>(
             <tr key={index}>
            <td>
              {ele.hotel?.name}
            </td>
            <td>{ele.check_in_date}</td>
            <td>{ele.check_out_date}</td>
            <td>{ele.user?.name}</td>
            <td><button onClick={() => handleDelete(ele.id)}>delete</button></td>
          </tr>
          ))}
         
        </tbody>
    </table>
    </>
  )
}

export default HotelBookingsManage