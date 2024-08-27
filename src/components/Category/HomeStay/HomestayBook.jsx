import axios from 'axios';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import './HomeStay.css'

function HomestayBook() {
    const location = useLocation();
    const {checkInDate, checkOutDate, numberOfRooms, roomType, homestays , pricePerNight } = location.state || {};
    const user = useSelector(state => state.user);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate()


    const calculateTotalPrice = (pricePerNight, numberOfRooms) => {
        const checkIn = new Date(checkInDate);
        const checkOut = new Date(checkOutDate);
        const nights = (checkOut - checkIn) / (1000 * 60 * 60 * 24);
        return nights > 0 ? pricePerNight * numberOfRooms * nights : 0;
    };
    
    const totalPrice = homestays && homestays.cash && numberOfRooms
    ? calculateTotalPrice(homestays.cash, numberOfRooms)
    : 'Calculating...';

    const handleBooking = async () => {
        setLoading(true);
        setError(null);
        navigate('/paymentform', { state: { homestays,totalPrice} });
       

        const bookingData = {
            homestay: homestays.id,
            user: user.id,
            check_in_date: checkInDate,
            check_out_date: checkOutDate,
            number_of_rooms: numberOfRooms,
            room_type: roomType,
            total_price:totalPrice,
        };

        try {
            const response = await axios.post('http://127.0.0.1:8000/homestay_bookings', bookingData, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            console.log('Booking successful:', response.data);
            
        } catch (error) {
            console.error('Error booking:', error.response?.data || error.message);
            setError('Booking failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className='homestay_book_wrapper'>
                <div className='homestay_book_subwrapper'>
                    <div className='homestay_bookwrapper'>
                        <div className='homestay_bookwrapper1'>
                            <img className='homestaybook_img' src={`http://127.0.0.1:8000${homestays.images?.[0]?.images}`} alt={`Image of ${homestays.name}`} />
                            <h2>{homestays.name}</h2>
                        </div>
                        <div>
                            <p>{homestays.address}</p>
                        </div>
                        <div className='homestay_bookwrapper2'>
                            <h3>ROOMS</h3>
                            <p>{numberOfRooms}</p>
                        </div>
                        <div className='homestay_bookwrapper3'>
                            <h3>CHECK-IN</h3>
                            <p>{checkInDate}</p>
                        </div>
                        <div className='homestay_bookwrapper4'>
                            <h3>CHECK-OUT</h3>
                            <p>{checkOutDate}</p>
                        </div>
                        <div className='homestay_bookwrapper4'>
                            <h3>ROOM TYPE</h3>
                            <p>{roomType}</p>
                        </div>
                        <div className='homestay_bookwrapper4'>
                            <h3>Total Amount</h3>
                            <p>{totalPrice}</p>
                        </div>
                        <div className='homestay-book-wrapper5'>
                            <h3>Contact Info</h3>
                            <p>{user.name}<br />{user.phone}<br />{user.address}</p>
                        </div>
                    </div>
                </div>
                <div className='homestay_payment-btn-wrapper'>
                    <button
                        className='homestay-payment-btn'
                        onClick={handleBooking}
                        disabled={loading}
                        
                    >
                        {loading ? 'Processing...' : 'PAYMENT'}
                    </button>
                </div>
                {error && <div className='error-message'>{error}</div>}
            </div>
        </>
    );
}

export default HomestayBook;
