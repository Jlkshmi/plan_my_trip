import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import './Payment.css'
import { useSelector } from 'react-redux';


function Paymentform() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [message, setMessage] = useState("");
    const location = useLocation();
    const { homestays ,totalPrice} = location.state || {};
    const user = useSelector(state => state.user);
    
    const handleCheckout = async (e) => {
      e.preventDefault();
      setLoading(true);
      setError(null);
    
        const bookingData = {
            homestay: homestays.id,
            payer_id: user.id, 
            amount: totalPrice
        };
    
        try {
            const response = await axios.post('http://127.0.0.1:8000/stripe_checkout', bookingData, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            const { id } = response.data;
    
            const stripe = window.Stripe(import.meta.env.VITE_STRIPE_PUBLICKEY);
            await stripe.redirectToCheckout({ sessionId: id });
        } catch (err) {
            setError('Something went wrong. Please try again.');
            console.error('Error during checkout:', err);
        } finally {
            setLoading(false);
        }
  
    
  };
  return (
    <>
      {message && <div className="message">{message}</div>}
      <section>
        <div className='product-wrapper'>
        <div className="product">
          <img 
            src={`http://127.0.0.1:8000${homestays.images?.[0]?.images}`}
            alt="The cover of Stubborn Attachments"
          />
          <div className="description">
            <h1>{homestays.name || 'Homestay Name Not Available'}</h1>
            <h4>AMOUNT PAYABLE:{totalPrice || 'Price Not Available'}</h4>
          </div>
        </div>
      {message && <div className="message">{message}</div>}
      <form onSubmit={handleCheckout}>
        <button  className='homestaypayment-button' type="submit" disabled={loading}>
          {loading ? 'Processing...' : 'Checkout'}
        </button>
        {error && <div className="error">{error}</div>}
      </form></div>
      </section>
    </>
  );
}

export default Paymentform;
