import axios from 'axios'
import React, { useEffect, useState } from 'react'

function ManagerListView() {
    const [managerList, setManagerList] = useState([])
    const [message,setMessage]=useState('')
    useEffect(() => {
        axios
            .get('http://127.0.0.1:8000/manager_list')
            .then((res) => setManagerList(res.data))
            .catch((err) => console.log(err));
    }, [])

    const blockManager = (id) => {
        axios
            .patch(`http://127.0.0.1:8000/block_manager/${id}/`)
            .then((res) => {
                setMessage(res.data.message)
                setManagerList(managerList.map((manager) =>
                    manager.id === id ? { ...manager, is_blocked: !manager.is_blocked } : manager
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
                            <th>COMPANY NAME</th>
                            <th>PHONE</th>
                            <th>EMAIL</th>
                            <th>COMPANY ADDRESS</th>
                        </tr>
                    </thead>
                    <tbody>
                        {managerList.map((ele,index)=>(
                             <tr key={index}>
                            <td>{ele.company_name}</td>
                            <td>{ele.phone}</td>
                            <td>{ele.email}</td>
                            <td>{ele.company_address}</td>
                            <td>
                                    <button onClick={() => blockManager(ele.id)}>
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

export default ManagerListView