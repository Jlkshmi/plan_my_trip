import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaSearch } from 'react-icons/fa'
import './Hotel.css'

function HotelDestination() {
  
   
  // const navigate=useNavigate()
  // const [hotels,setHotels]=useState([])
  // const [searchQuery,setSearchQuery]=useState('')
  // useEffect(()=>{
  //   axios
  //     .get("http://127.0.0.1:8000/hotel_destination_add")
  //     .then((res)=>setHotels(res.data))
  //     .catch(err=>console.log(err))
  // },[])
  // const filteredHotels =hotels.filter(hotel=>hotel.destination_name.toLowerCase().includes(searchQuery.toLowerCase()))

  // return (
  //   <>
  //     <div className='searchbar-container'>
  //               <div className='search_div'>
  //                 <div >
  //                   <FaSearch id='search-icon' /></div>
  //                   <div><input 
  //                   placeholder='location to search' 
  //                   value={searchQuery} 
  //                   onChange={(e) => setSearchQuery(e.target.value)} 
  //                   /> </div></div>
  //                   <div className='hotel-wrapper' >
  //                   {filteredHotels.map((ele,index) => (
  //                       <div className='hotel-wrapper1' key={index}  onClick={()=>navigate('/hotellist')}>
  //                       <div>
  //                         <img className='des_image' src={ele.image} />
  //                       </div>
  //                       <div><h3>{ele.destination_name}</h3></div>
  //                     </div>
  //                   ))}
  //                   </div>
  //               </div>
  //   </>
  // )
  const navigate = useNavigate();
  const [destinations, setDestinations] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/hotel_destination_add")
      .then((res) => setDestinations(res.data))
      .catch(err => console.log(err));
  }, []);

  const filteredDestinations = destinations.filter(destination =>
    destination.destination_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className='searchbar-container'>
      <div className='search_div'>
        <FaSearch id='search-icon' />
        <input
          placeholder='Location to search'
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <div className='hotel-wrapper'>
        {filteredDestinations.map((destination, index) => (
          <div className='hotel-wrapper1' key={index}
            onClick={() => navigate(`/hotellist/${destination.destination_name}`)}>
            <img className='des_image' src={destination.image} alt={destination.destination_name} />
            <h3>{destination.destination_name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HotelDestination