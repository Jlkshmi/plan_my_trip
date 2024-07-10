import React, { useEffect, useState } from 'react'
import './HolidayPackages.css'
import { FaSearch } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function HolidayPackages() {
    const navigate=useNavigate()
    const [holidayPackages,setHolidayPackages]= useState([])
    const [searchQuery,setSearchQuery]=useState('')
    useEffect(()=>{
        axios
            .get("http://127.0.0.1:8000/holiday_destination_add")
            .then((res)=>setHolidayPackages(res.data))
            .catch(err=>console.log(err))
    },[])

    const filteredHolidayPackages = holidayPackages.filter(holidayPackage=>holidayPackage.destination_name.toLowerCase().includes(searchQuery.toLowerCase()))
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
                    <div className='holiday-wrapper' >
                    {filteredHolidayPackages.map((ele,index) => (
                        <div className='holiday-wrapper1' key={index}  onClick={()=>navigate('/holidaypackagelist')}>
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

export default HolidayPackages