import React, { useEffect, useState } from 'react'
import './HomeStay.css'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function HomestayList() {
    const navigate= useNavigate()

    const [homestays, setHomestays] = useState([]);

    useEffect(() => {
        axios
            .get('http://127.0.0.1:8000/get_homestays')
            .then((res) => setHomestays(res.data))
            .catch(err => console.log(err));
    }, []);

    console.log(homestays);

    return (
        <div className='homestaylist-wrapper' >
        {homestays.map((ele) => {
            return (
                <div className='homestaylist-wrapper1' key={ele.id} onClick={()=>(navigate('/homestaydetails/'+ele.id))}>
                    <div className='homestaylist-images'>
                        {ele.images.length > 0 && (
                            <div  >
                                <img className='homestaylist-image' src={`http://127.0.0.1:8000${ele.images[0].images}`} alt="" />
                            </div>
                        )}
                        <div className='homestaylist-image-list'>
                            {ele.images.slice(1, 4).map((img, idx) => (
                                <div key={idx}>
                                    <img src={`http://127.0.0.1:8000${img.images}`} alt="" />
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className='homestaylistdetails-wrapper'>
                        <div className='homestaylistdetails-wrapper1'>
                            <div><h4>{ele.name}</h4></div>
                            <div className='homestayliststar'>
                                <i className="fa-regular fa-star"></i>
                                <i className="fa-regular fa-star"></i>
                                <i className="fa-regular fa-star"></i>
                                <i className="fa-regular fa-star"></i>
                                <i className="fa-regular fa-star"></i>
                            </div>
                        </div>
                        <div className='homestaylistdetails-wrapper1'>
                            <div className='homestaylistfacilities'>
                                <h5>{ele.facilities}</h5>
                            </div>
                            <div className='homestaylistrating'>
                                <h4>Excellent</h4>
                            </div>
                        </div>
                        <div className='homestaylistdetails-wrapper1'>
                            <div><h4>Book with 0 payment</h4></div>
                            <div><h4 className='homestaylistrate'>{ele.cash}/-</h4></div>
                        </div>
                    </div>
                </div>
            );
        },[])}
        </div>
    );
}

export default HomestayList