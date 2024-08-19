import axios from 'axios';
import React, { useEffect, useState } from 'react'
import {
    Bar,
    BarChart,
    CartesianGrid,
    Legend,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
  } from "recharts";
  

function UsersListview() {
    const [userCount,setUserCount]=useState("")
    const [managerCount,setManagerCount]= useState("")
    useEffect(() => {
        axios
            .get('http://127.0.0.1:8000/user_count_view')
            .then((res) => setUserCount(res.data.user_count1))
            .catch((err) => console.log(err));

        axios
            .get('http://127.0.0.1:8000/manager_count_view')
            .then((res) => setManagerCount(res.data.user_count2))
        
    }, [])
    const data = [
        {
          name: "User Count",
          count: userCount,
        },
        {
          name: "Manager Count",
          count: managerCount,
        },
        
      ];
    
  return (
    <>
         <div className='hotelview_div'>
            <table>
                <thead>
                    <tr>
                        <th>Users Count</th>
                        <th>Managers Count</th>
                    
                    </tr>
                </thead>
                <tbody>
                   
                        <tr >
                            <td>{userCount}</td>  
                            <td>{managerCount}</td>
                        </tr>
                
                </tbody>
            </table>
            <h2 className="title">Chart</h2>
      <div
        style={{
          width: "70%",
          height: 400,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ResponsiveContainer>
          <BarChart
            data={data}
            margin={{
              right: 30,
              left: 140,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray={"3 3"} />
            <XAxis dataKey={"name"} />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="	#98fb98" />
          </BarChart>
        </ResponsiveContainer>
      </div>

        </div>
    </>
  )
}

export default UsersListview