import axios from 'axios'
import React, { useEffect, useState } from 'react'

function ManagerListView() {
    const [managerList, setManagerList] = useState([])
    useEffect(() => {
        axios
            .get('http://127.0.0.1:8000/manager_list')
            .then((res) => setManagerList(res.data))
            .catch((err) => console.log(err));
    }, [])
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
                        </tr>
                        ))}
                       
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default ManagerListView