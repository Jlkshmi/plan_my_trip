import React, { useEffect, useState } from 'react'
import './HomeStay.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { FaSearch } from 'react-icons/fa'

function HomeStays() {
  const navigate = useNavigate()
  const [homestays, sethomestays] = useState([])
    const [searchQuery,setSearchQuery]=useState('')
    useEffect(() =>{
        axios
            .get("http://127.0.0.1:8000/homestay_destination_add")
            .then((res)=>sethomestays(res.data))
            .catch(err=>console.log(err))
    },[])

    const filteredHomestays =homestays.filter(homestay=>homestay.destination_name.toLowerCase().includes(searchQuery.toLowerCase()))
    return (
        <>
        
            <div className='searchbar-container'>
                <div className='search_div'>
                  <div >
                    <FaSearch id='search-icon' /></div>
                    <div><input 
                    placeholder='location to search' 
                    value={searchQuery} 
                    onChange={(e) => setSearchQuery(e.target.value)} 
                    /> </div></div>
                    <div className='homestay-wrapper' >
                    {filteredHomestays.map((ele,index) => (
                        <div className='homestay-wrapper1' key={index}  onClick={()=>navigate('/homestaylists')}>
                        <div>
                          <img className='des_image' src={ele.image} />
                        </div>
                        <div><h3>{ele.destination_name}</h3></div>
                      </div>
                    ))}
                    </div>
                </div>
           
        </>
    )
}

export default HomeStays