import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

function HotelPayment() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState("");
  const location = useLocation();
  const { hotel ,totalPrice} = location.state || {};
  const user = useSelector(state => state.user);
  
  const handleCheckout = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
  
      const bookingData = {
          hotel: hotel.id,
          payer_id: user.id, 
          amount: totalPrice
      };
  
      try {
          const response = await axios.post('http://127.0.0.1:8000/hotel_stripe_checkout', bookingData, {
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
          src={`http://127.0.0.1:8000${hotel.images?.[0]?.images}`}
          alt="The cover of Stubborn Attachments"
        />
        <div className="description">
          <h1>{hotel.name || 'Homestay Name Not Available'}</h1>
          <h4>AMOUNT PAYABLE:{totalPrice || 'Price Not Available'}</h4>
        </div>
      </div>
  
    {message && <div className="message">{message}</div>}
    <form onSubmit={handleCheckout}>
      <button className="hotelpayment-button" type="submit" disabled={loading}>
        {loading ? 'Processing...' : 'Checkout'}
      </button>
      {error && <div className="error">{error}</div>}
    </form></div>
    </section>
  </>
  )
}

export default HotelPayment