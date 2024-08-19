import axios from 'axios'
import React, { useEffect, useState } from 'react'

function CustomersListView() {

    const [customer,setCustomer]=useState([])

    useEffect(()=>{
        axios
            .get('http://127.0.0.1:8000/user_list')
            .then((res) => setCustomer(res.data))
            .catch((err) => console.log(err));
    },[])

  return (
    <>
    <div className='hotelview_div'>
    <table>
        <thead>
            <tr>
                <th>Name</th>
                <th>Phone No</th>
                <th>Email</th>
                <th>Address</th>
            </tr>
        </thead>
        <tbody>
            {customer.map((ele,index)=>(
                <tr key={index}>
                <td>{ele.name}</td>
                <td>{ele.phone}</td>
                <td>{ele.email}</td>
                <td>{ele.address}</td>
            </tr>
            ))}
            
        </tbody>
    </table></div>
    </>
  )
}

export default CustomersListView