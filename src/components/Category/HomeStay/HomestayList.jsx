import React, { useEffect, useState } from 'react'
import './HomeStay.css'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { FaSearch } from 'react-icons/fa'

function HomestayList() {
    const navigate = useNavigate()

    const [homestays, setHomestays] = useState([]);
    const [districtSearch, setDistrictSearch] = useState('');
    const [rateSearch, setRateSearch] = useState('');

    useEffect(() => {
        axios
            .get('http://127.0.0.1:8000/get_homestays')
            .then((res) => setHomestays(res.data))
            .catch(err => console.log(err));
    }, []);

    const filteredHomestays = homestays.filter(homestay => {
        const matchesDistrict = districtSearch === '' || homestay.city?.toLowerCase().includes(districtSearch.toLowerCase());
        const matchesRate = rateSearch === '' || homestay.cash <= parseFloat(rateSearch);
        return matchesDistrict && matchesRate;
    });

    const handleClearFilters = () => {
        setDistrictSearch('');
        setRateSearch('');
    };

    console.log(homestays);

    return (
        <>
            <div className='catlist-wrapper'>
                <div className='catlist-wrapper1'>
                    <div className='homestaylist-wrapper2'>
                        <div className='search_div'>
                            <FaSearch />
                            <h4 >City</h4>
                            <input
                                className='homestay-input'
                                type='text'
                                placeholder='Search by district'
                                value={districtSearch}
                                onChange={(e) => setDistrictSearch(e.target.value)}
                            />
                        </div>
                        <div className='search_div'>
                            <FaSearch />
                            <h4>Rate</h4>
                            <input
                                className='homestay-input'
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
                    <div className='homestaylist-wrapper' >
                        {filteredHomestays.length > 0 ? (filteredHomestays.map((ele) => (<div className='homestaylist-wrapper1' key={ele.id} onClick={() => (navigate('/homestaydetails/' + ele.id))}>
                            <div className='homestaylist-images'>
                                {ele.images.length > 0 && (
                                    <div>
                                        <img className='homestaylist-image' src={`http://127.0.0.1:8000${ele.images[0].images}`} alt="" />
                                    </div>
                                )}
                            </div>
                            <div className='homestaylistdetails-wrapper'>
                                <div className='homestaylistdetails-wrapper1'>
                                    <div><h4>{ele.name}</h4></div>

                                </div>
                                <div className='homestaylistdetails-wrapper1'>
                                    <div className='homestaylistfacilities'>
                                        <h5>{ele.facilities}</h5>
                                    </div>
                                </div>
                                <div className='homestaylistdetails-wrapper1'>
                                    <div><h4>{ele.city}</h4></div>
                                    <div><h4 className='homestaylistrate'>{ele.cash}/-</h4></div>
                                </div>
                            </div>
                        </div>))
                        ) :
                            (
                                <div className='no-results'>No homestay found.</div>
                            )}
                    </div>
                </div>
            </div>
        </>
    );
}

export default HomestayList