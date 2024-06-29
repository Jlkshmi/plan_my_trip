import React, { useEffect, useState } from 'react'
import './HomeStay.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
function HomeStays() {
  const navigate = useNavigate()
  const [destinationPost, setDestinationPost] = useState([])
  useEffect(() => {
    axios
      .get('http://127.0.0.1:8000/homestay_destination_add')
      .then((res) => setDestinationPost(res.data))
      .catch(err => console.log(err))
  },[])

  return (
    <>
      <h1 className='des-head'>Destinations</h1>
      <div className='homestay-wrapper' onClick={()=>(navigate('/homestaylists'))}> 
        {destinationPost.map((ele,index) => {
        return (
          <><div className='homestay-wrapper1' key={index.id} >
            <div>
              <img className='des_image' src={ele.image} />
            </div>
            <div><h3>{ele.destination_name}</h3></div>
          </div></>)
      },[])}
      </div>
    </>
  )
}

export default HomeStays