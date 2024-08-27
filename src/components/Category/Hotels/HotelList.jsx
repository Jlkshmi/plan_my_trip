import React, { useEffect, useState } from 'react'
import './Hotel.css'
import { FaSearch } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function HotelList() {
    const navigate = useNavigate();
    const [hotels, setHotels] = useState([]);
    const [districtSearch, setDistrictSearch] = useState('');
    const [rateSearch, setRateSearch] = useState('');

    useEffect(() => {
        axios
            .get('http://127.0.0.1:8000/get_hotels')
            .then((res) => setHotels(res.data))
            .catch((err) => console.log(err));
    }, []);

    const filteredHotels = hotels.filter(hotel => {
        const matchesDistrict = districtSearch === '' || hotel.city?.toLowerCase().includes(districtSearch.toLowerCase());
        const matchesRate = rateSearch === '' || hotel.price_per_night <= parseFloat(rateSearch);
        return matchesDistrict && matchesRate;
    });

    const handleClearFilters = () => {
        setDistrictSearch('');
        setRateSearch('');
    };

    return (
        <>
            <div className='catlist-wrapper'>
                <div className='catlist-wrapper1'>
                    <div className='hotellist-wrapper2'>
                        <div className='search_div'>
                            <FaSearch />
                            <h4 className='hotellist-button'>City</h4>
                            <input
                                className='hotel-input'
                                type='text'
                                placeholder='Search by district'
                                value={districtSearch}
                                onChange={(e) => setDistrictSearch(e.target.value)}
                            />
                        </div>
                        <div className='search_div'>
                            <FaSearch />
                            <h4 className='hotellist-button'>Rate</h4>
                            <input
                                className='hotel-input'
                                type='number'
                                placeholder='Max rate'
                                value={rateSearch}
                                onChange={(e) => setRateSearch(e.target.value)}
                                
                            />
                        </div>
                        <button onClick={handleClearFilters} className='clear-filters-button'>
                            Clear Filters
                        </button>
                    </div>
                    <div className='hotel-wrapper3'>
                        {filteredHotels.length > 0 ? (
                            filteredHotels.map((ele) => (
                                <div
                                    className='sub-hotel-wrapper3'
                                    key={ele.id}
                                    onClick={() => navigate('/hoteldetails/' + ele.id)}
                                >
                                    <div className='sub-hotel-wrapper3-img'>
                                        {ele.images.length > 0 && (
                                            <img 
                                                src={`http://127.0.0.1:8000${ele.images[0].images}`}
                                                alt={`Image of ${ele.name}`}
                                            />
                                        )}
                                    </div>
                                    <div className='head-hotel-wrapper3'>
                                        <div><h1>{ele.name}</h1></div>
                                        <div><h3>{ele.city}</h3></div>
                                    </div>
                                    <div className='cat-hotel-wrapper3'>
                                        <div><h2>{ele.price_per_night}/-</h2></div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className='no-results'>No hotels found.</div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

export default HotelList