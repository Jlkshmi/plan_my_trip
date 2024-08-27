import axios from 'axios'
import React, { useEffect, useState } from 'react'

function HomestayBookingsManage() {

    const [bookedHomestays,setBookedHomestays]=useState([])
    useEffect(()=>{
        axios
            .get('http://127.0.0.1:8000/HomestayBookingListCreateView')
            .then((res) => setBookedHomestays(res.data))
            .catch(err => console.log(err));
    },[])
   

  return (
    <>
        <div>
            <table>
                <thead>
                    <tr>
                        <th>HOMESTAY</th>
                        <th>CHECK IN</th>
                        <th>CHECK OUT</th>
                        <th>USER</th>
                    </tr>
                </thead>
                <tbody>
                    {bookedHomestays.map((ele,index)=>(
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

export default HomestayBookingsManage