import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import './Hotel.css'

function HotelDetails() {
    const { id } = useParams();
    const [hotel, setHotel] = useState(null);
    const [rating, setRating] = useState('');
    const [comment, setComment] = useState('');
    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);
    const [review, setReview] = useState([]);
    const [numberOfRooms, setNumberOfRooms] = useState(1);
    const [checkInDate, setCheckInDate] = useState('');
    const [checkOutDate, setCheckOutDate] = useState('');
    const [roomType, setRoomType] = useState('Guest Room'); 
    const user = useSelector(state => state.user);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const hotelResponse = await axios.get(`http://127.0.0.1:8000/get_hotels/${id}`);
                setHotel(hotelResponse.data);

                const reviewResponse = await axios.get(`http://127.0.0.1:8000/hotel_review_get/${id}`);
                setReview(reviewResponse.data);
            } catch (err) {
                console.error('Error fetching data:', err);
                setError('Failed to fetch hotel details.');
            }
            finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (!rating || !comment) {
            setError("Rating and comment are required.");
            return;
        }

        try {
            const result = await axios.post('http://127.0.0.1:8000/hotel_reviews', {
                hotel: id,
                rating: parseInt(rating, 10),
                comment: comment,
                user: user.name
            }, { 
                headers: { "Content-Type": "application/json" }
            });
         
            setResponse(result.data);
            setError(null);
        } catch (error) {
            console.error('Error submitting review:', error);
            setError('Something went wrong. Please try again.');
            setResponse(null);
        }
    };

    const handleNumberOfRoomsChange = (e) => {
        const value = parseInt(e.target.value, 10);
        if (!isNaN(value) && value > 0) {
            setNumberOfRooms(value);
        }
    };

    const handleRoomTypeChange = (e) => {
        setRoomType(e.target.value);
    };

    const calculateTotalPrice = (pricePerNight, numberOfRooms) => {
        const checkIn = new Date(checkInDate);
        const checkOut = new Date(checkOutDate);
        const nights = (checkOut - checkIn) / (1000 * 60 * 60 * 24);
        return nights > 0 ? pricePerNight * numberOfRooms * nights : 0;
    };

    const handleBooking = async () => {
        if (!checkInDate || !checkOutDate || !roomType) {
            setError("Please select check-in and check-out dates.");  
        }
        else{
            navigate('/hotelbook',{state:{checkInDate,checkOutDate,numberOfRooms,roomType,hotel}} )
            return;
        }
    };
    
    if (error) return <div>{error}</div>;
    if (!hotel) return <div>Loading...</div>;

    return (
        <div className='hoteldet-wrapper'>
            <div className='hoteldet-wrapper1'>
                <div className='hoteldet-wrapper2'>
                    <div className='in-div'>
                        <button>CHECK IN</button>
                        <input 
                            type='date' 
                            value={checkInDate}
                            onChange={(e) => setCheckInDate(e.target.value)}
                        />
                    </div>
                    <div className='in-div'>
                        <button>CHECK OUT</button>
                        <input 
                            type='date' 
                            value={checkOutDate}
                            onChange={(e) => setCheckOutDate(e.target.value)}
                        />
                    </div>
                    <div className='in-div'>
                        <button>ROOMS</button>
                        <input 
                            type='number' 
                            value={numberOfRooms} 
                            onChange={handleNumberOfRoomsChange}
                            min="1" 
                        />
                    </div>
                    <div className='in-div'>
                        <button>ROOM TYPE</button>
                        <select value={roomType} onChange={handleRoomTypeChange}>
                            <option value="Guest Room">Guest Room</option>
                            <option value="Single Room">Single Room</option>
                        </select>
                    </div>
                </div>
                <div className='hoteldet-wrapper3'>
                    <div className='subwrapper-wrapper3'>
                        <div><h2>{hotel.name}</h2></div>
                        <div className='subwrapper1-wrapper3'>
                            {hotel.images && hotel.images.length > 0 ? (
                                <>
                                    <div className='subw1-img'>
                                        <img src={`http://127.0.0.1:8000${hotel.images[0].images}`} alt={`Image of ${hotel.name}`} />
                                    </div>
                                    <div className='subwrapper2-wrapper3'>
                                        {hotel.images.slice(1, 3).map((image, index) => (
                                            <div key={index}>
                                                <img src={`http://127.0.0.1:8000${image.images}`} alt={`Image of ${hotel.name}`} />
                                            </div>
                                        ))}
                                    </div>
                                </>
                            ) : (
                                <p>No images available</p>
                            )}
                        </div>
                    </div>
                    <div className='subwrapper3-wrapper3'>
                        <div className='rate_wrapper'>
                            <i className="fa-solid fa-indian-rupee-sign"></i>
                            <h1>{calculateTotalPrice(hotel.price_per_night, numberOfRooms)}</h1>
                        </div>
                        <div>
                            <div>
                                {[...Array(5)].map((_, index) => (
                                    <i key={index} className="fa-regular fa-star"></i>
                                ))}
                            </div>
                        </div>
                        <button className='book-button' onClick= {handleBooking} >
                            BOOK NOW
                        </button>
                    </div>
                </div>
                <div className='hoteldet-wrapper4'>
                    {hotel.description}
                    <div>
                        <h3>FACILITIES</h3>
                        <h4>{hotel.facilities}</h4>
                    </div>
                </div>
                <div className='hoteldet-wrapper5'>
                    <h2>REVIEWS</h2>
                    <div className='review_view_wrapper'>
                        {review.map((ele) => (
                            <div className='review_view_wrapper1' key={ele.id}>
                                <i className="fa-solid fa-user"></i>
                                <h4>{ele.user}</h4>
                                <p>{ele.comment}</p>
                            </div>
                        ))}
                    </div>
                    {user.type === "user" && (
                        <form onSubmit={handleSubmit}>
                            {error && <p style={{ color: 'red' }}>{error}</p>}
                            {response && <p style={{ color: 'green' }}>Review submitted successfully!</p>}
                            <div className='comment-input-wrapper'>
                                <label>
                                    Rating:
                                    <input 
                                        className='comment-input'
                                        type='number' 
                                        value={rating} 
                                        onChange={(e) => setRating(e.target.value)}
                                        min="1" 
                                        max="5"
                                        placeholder='Rate Here'
                                        required 
                                    />
                                </label>
                                <label>
                                    Comment:
                                    <input 
                                        className='comment-input'
                                        value={comment} 
                                        onChange={(e) => setComment(e.target.value)}
                                        placeholder='Add Comment Here'
                                        required
                                    />
                                </label>
                                <button className='review_submit_button' type='submit'>
                                    <i className="fa-solid fa-arrow-up-from-bracket"></i>
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}

export default HotelDetails;
