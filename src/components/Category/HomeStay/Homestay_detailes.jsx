import React, { useEffect, useState } from 'react'
import './HomeStay.css'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios';

function Homestay_detailes() {
    const navigate=useNavigate()
    const {id}=useParams()
    
    const [homestays, setHomestays] = useState({});

    useEffect(() => {
        
        axios
            .get(`http://127.0.0.1:8000/get_homestays/${id}`)
            .then((res) => setHomestays(res.data))
            .catch(err => console.log(err));
    },[id]);

    return (
        <>
        
        <div className='homestaydetailed-wholewrapper'>
         <div className='homestaydetailed-wrapper'>
            
                <div className='homestaydetailed-image-wrapper'>
                    <img src={`http://127.0.0.1:8000${homestays.images}`} />
                </div>
                
                <div className='homestay-name'><h1>{homestays.name}</h1></div>
                <div className='options-homestay'>
                    <div className='room-wrapper'>Rooms
                        <div className='detld-icon'>
                        <i class="fa-solid fa-angle-left"></i>
                        <p>0</p>
                        <i class="fa-solid fa-angle-right"></i>
                        </div>
                    </div>
                    <div className='room-wrapper'>number of people
                        <div className='detld-icon'>
                        <i class="fa-solid fa-angle-left"></i>
                        <p>0</p>
                        <i class="fa-solid fa-angle-right"></i>
                        </div>
                    </div>
                </div>
                <div> <h3>Details</h3>
                <div className='homestay-footer'>
                <p>{homestays.details}</p>
                <div><button className='payment-button' onClick={()=>(navigate('/paymentform'))}>PAYMENT</button></div>
                </div>
                </div>
                


            </div>
            </div>
        </>

    )
}

export default Homestay_detailes