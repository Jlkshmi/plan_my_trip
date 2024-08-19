import React from 'react'
import './Footer.css'

function Footer() {
  return (
    <> 
    
    <div className='footer-container'>
      <div className='footer-wrapper'><h1 className='footer-head'>Plan My Trip App: Your Ultimate Travel Companion</h1></div>
      
     <div className='footer-wrapper'>
      <div>
        <h3>Affordable Accommodations</h3>
        <p> Best Deals: Discover the best deals on rooms,<br/> ensuring you get value for your money.<br/>
        Diverse Options: From budget-friendly rooms to luxurious stays,<br/> find a variety of options to suit your preferences and budget.</p>
      </div>
      {/* <div>
        <h3>Tailored Holiday Packages</h3>
        <p>Customizable Packages: Choose from a range of holiday<br/> packages that can be tailored to your specific needs and interests.<br/>
        Discounts and Offers: Take advantage of exclusive discounts <br/>and special offers to make your trip more affordable.</p>
      </div> */}
      <div>
        <h3>Homestays</h3>
        <p>Easy Search: Quickly search for accommodations and packages<br/> using filters such as price, location, and amenities.<br/>
        Detailed Listings: Access comprehensive details about each listing,<br/> including photos, descriptions, reviews, and ratings.</p>
      </div>
      <div>
        <h3>User-Friendly Interface</h3>
        <p>Easy Search: Quickly search for accommodations and <br/>packages using filters such as price, location, and amenities.<br/>
        Detailed Listings: Access comprehensive details about each<br/> listing, including photos, descriptions, reviews, and ratings.</p>
      </div>
      </div> 
      <div className='footer-wrapper1'>
      <div >
      <h2>Why Choose Plan My Trip?</h2>
      <p><b>"Plan My Trip" is your ultimate travel companion, meticulously designed to help you book the most affordable hotels and cozy homestays.With our user-friendly interface and powerful search engine, finding the perfect accommodation or getaway deal is just a few clicks away. Whether you're looking for a luxurious stay or budget-friendly options, "Plan My Trip" ensures you get the best value for your money, making every journey memorable and stress-free.</b></p>
      </div>
      </div>
        <div className='footer'>
        <div className='footer1'>
        <img className='footer2' src="/images/twitter1.png" alt="" />
        <img  className='footer3'src='/images/facebook.webp'/>
        </div>
        <div>
          <h5>© 2024 PLANMYTRIP PVT. LTD.</h5>
        </div>
        
        
      </div>
      
    </div>
    </>
   
    
  )
}

export default Footer