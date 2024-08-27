import React, { useEffect, useState } from 'react';
import './HomeStay.css';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';

function HomestayDetails() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [homestays, setHomestays] = useState(null);
    const [loading, setLoading] = useState(true);
    const [review, setReview] = useState([]);
    const [error, setError] = useState(null);
    const [rating, setRating] = useState('');
    const [comment, setComment] = useState('');
    const [response, setResponse] = useState(null);
    const [numberOfRooms, setNumberOfRooms] = useState(1);
    const [checkInDate, setCheckInDate] = useState('');
    const [checkOutDate, setCheckOutDate] = useState('');
    const [roomType, setRoomType] = useState('Guest Room');
    const user = useSelector(state => state.user);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const homestayResponse = await axios.get(`http://127.0.0.1:8000/get_homestays/${id}`);
                setHomestays(homestayResponse.data);

                const reviewResponse = await axios.get(`http://127.0.0.1:8000/homestay_review_get/${id}`);
                setReview(reviewResponse.data);
            } catch (err) {
                console.error('Error fetching data:', err);
                setError('Failed to fetch homestay details.');
            } finally {
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
            const result = await axios.post('http://127.0.0.1:8000/homestay_reviews', {
                homestays: id,
                rating: parseInt(rating, 10),
                comment: comment,
                user_name: user.name
            }, {
                headers: { "Content-Type": "application/json" }
            });

            setResponse(result.data);
            setError(null);
            setRating('');
            setComment('');
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
        else {
            navigate('/homestaybook', { state: { checkInDate, checkOutDate, numberOfRooms, roomType, homestays ,
                pricePerNight: homestays.cash,
            } })
            return;
        }
    };


    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;
    if (!homestays) return <div>No data available</div>;
    

    return (
        <>
            <div className='homestaydetailed-wholewrapper'>
                <div className='homestaydetailed-wrapper'>
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

                    <div className='homestaydetailed-image-wrapper'>
                        {homestays.images && homestays.images.length > 0 ? (
                            <>

                                <div className='homestay_img'>
                                 <img 
                                        src={`http://127.0.0.1:8000${homestays.images[0].images}`}
                                        alt={homestays.name} /></div>

                                    <div className='homestays_det_img'>
                                        {homestays.images.slice(1, 3).map((image, index) => (
                                            <div key={index} className='homestays_det_img1'>
                                                <img src={`http://127.0.0.1:8000${image.images}`} alt={`Image of ${homestays.name}`}  />
                                            </div>
                                        ))}
                                    </div> 
                            </>


                        ) : (
                            <p>No images available</p>
                        )}

                    </div>
                    <div className='homestay-name'>
                        <h1>{homestays.name}</h1>
                        <h1><i className="fa-solid fa-indian-rupee-sign"></i>{calculateTotalPrice(homestays.cash,numberOfRooms)}</h1>
                    </div>
                    <div>
                        <h3>FACILITIES</h3>
                        <p>{homestays.facilities}</p>
                    </div>

                    <div>
                        <h3>DETAILS</h3>
                        <div className='homestay-footer'>
                            <p>{homestays.details}</p>
                            <div>
                                <button className='payment-button' onClick={handleBooking}>BOOK NOW</button>
                            </div>
                        </div>
                        <div></div>
                    </div>
                    <div className='review-wrapper'>
                        <h2>REVIEWS</h2>
                        <div className='review_view_wrapper'>
                            {review.length ? (
                                review.map((ele) => (
                                    <div className='review_view_wrapper1' key={ele.id}>
                                        <i className="fa-solid fa-user"></i>
                                        <h4>{ele.user_name}</h4>
                                        <p>{ele.comment}</p>
                                    </div>
                                ))
                            ) : (
                                <p>No reviews yet.</p>
                            )}
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
        </>
    );
}

export default HomestayDetails;
