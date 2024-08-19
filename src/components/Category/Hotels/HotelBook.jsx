import axios from 'axios';
import { useSelector } from 'react-redux'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import './Hotel.css'
import { useState } from 'react';

function HotelBook() {
    const location = useLocation();
    const { checkInDate, checkOutDate, numberOfRooms, roomType, hotel } = location.state || {};
    const user = useSelector(state => state.user);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate()
    

    const handleBooking = async () => {
        setLoading(true);
        setError(null);
        navigate('/paymentform', { state: { hotel} });


        const bookingData = {
            hotel: hotel.id,
            user: user.id,
            check_in_date: checkInDate,
            check_out_date: checkOutDate,
            number_of_rooms: numberOfRooms,
            room_type: roomType,
        };

        try {
            const response = await axios.post('http://127.0.0.1:8000/hotel_bookings', bookingData, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            console.log('Booking successful:', response.data);
        } catch (error) {
            console.error('Error booking:', error.response?.data || error.message);
        }
    };

    return (
        <>
            <div className='book-all-wrapper'>
                <div className='book-subwrapper'>
                    <div className='book-wrapper'>
                        <div className='book-wrapper1'>
                            <img className='book-img' src={`http://127.0.0.1:8000${hotel.images?.[0]?.images}`} alt={`Image of ${hotel.name}`} />
                            <h2>{hotel.name}</h2>
                        </div>
                        <div>
                            <p>{hotel.address}</p>
                        </div>
                        <div className='book-wrapper2'>
                            <h3>ROOMS</h3>
                            <p>{numberOfRooms}</p>
                        </div>
                        <div className='book-wrapper3'>
                            <h3>CHECK-IN</h3>
                            <p>{checkInDate}</p>
                        </div>
                        <div className='book-wrapper4'>
                            <h3>CHECK-OUT</h3>
                            <p>{checkOutDate}</p>
                        </div>
                        <div className='book-wrapper4'>
                            <h3>ROOM TYPE</h3>
                            <p>{roomType}</p>
                        </div>
                    </div>
                    <div className='book-wrapper5'>
                        <h3>Contact Info</h3>
                        <p>{user.name}<br />{user.phone}<br />{user.address}</p>
                    </div>
                </div>
            </div>
            <div className='payment-btn-wrapper'>
                <button className='payment-btn' onClick={handleBooking}>PAYMENT</button>
            </div>
        </>
    );
}

export default HotelBook