import axios from 'axios';
import React, { useEffect, useState } from 'react'
import './Destination.css'

function Homestayviewlist() {
    const [homestays, setHomestays] = useState([]);

    useEffect(() => {
        axios
            .get('http://127.0.0.1:8000/get_homestays')
            .then((res) => setHomestays(res.data))
            .catch(err => console.log(err));
    }, []);

    const handleDelete = (id)=>{
        axios
            .delete(`http://127.0.0.1:8000/delete_homestay/${id}`)
            .then(() => {setHomestays(homestays.filter(homestay => homestay.id !== id))})
            .catch(err => console.log(err));
    }

  return (
    
    <>
    <div className='hotelview_div'>
            <table>
                <thead>
                    <tr>
                        <th>HOTEL NAME</th>
                        <th>IMAGES</th>
                        <th>ADDRESS</th>
                        <th>CITY</th>
                    </tr>
                </thead>
                <tbody>
                    {homestays.map((ele, index) => (
                        <tr key={index}>
                            <td>{ele.name}</td>
                            <td>
                                {ele.images.length > 0 && (
                                    <img 
                                        className='hotel_thumb'
                                        src={`http://127.0.0.1:8000${ele.images[0].images}`}
                                        alt={`Image of ${ele.name}`}
                                    />
                                )}
                            </td>
                            <td>{ele.address}</td>
                            <td>{ele.city}</td>
                            <td className='del_border'> 
                                <button onClick={() => handleDelete(ele.id)}><i className="fa-solid fa-trash"></i></button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </>
  )
}

export default Homestayviewlist