import axios from 'axios'
import React, { useEffect, useState } from 'react'

function CustomersListView() {

    const [customer, setCustomer] = useState([])
    const [message, setMessage] = useState('')


    useEffect(() => {
        axios
            .get('http://127.0.0.1:8000/user_list')
            .then((res) => setCustomer(res.data))
            .catch((err) => console.log(err));
    }, [])

    const blockUser = (id) => {
        axios
            .patch(`http://127.0.0.1:8000/block_user/${id}/`)
            .then((res) => {
                setMessage(res.data.message)
                setCustomer(customer.map((user) =>
                    user.id === id ? { ...user, is_blocked: !user.is_blocked } : user
                ));
            })
            .catch((err)=>{console.log(err);
                alert("failed to block the user")
            })
        }
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
                            <th>Block</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>

                        {customer.map((ele, index) => (
                            <tr key={index}>
                                <td>{ele.name}</td>
                                <td>{ele.phone}</td>
                                <td>{ele.email}</td>
                                <td>{ele.address}</td>
                                <td>
                                    <button onClick={() => blockUser(ele.id)}>
                                        <i className="fa-solid fa-ban"></i>
                                    </button>
                                </td>
                                <td>
                                    {ele.is_blocked ? ('blocked') : ('unblocked')}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {message && <p>{message}</p>}
        </>
    )
}
export default CustomersListView