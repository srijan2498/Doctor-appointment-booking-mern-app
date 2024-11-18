import React from 'react'
import './Banner.css'
import bannerimg from '../img/bannerimg.jpg'

const Banner = () => {
    const bookService = () => {
        document.getElementById('bookAppointment').scrollIntoView()
    }
    return (
        <div className='banner-container' style={{ backgroundImage: `url(${bannerimg})` }}>
            <div className="banner-center">
                <div className="benner-text">
                    <div className="banner-text-heading">Welcome to Cupping Studio</div>
                    <div className="banner-text-small">We are here for your care</div>
                    <button className="book" onClick={bookService}>Book an appointment</button>
                </div>
            </div>
        </div>
    )
}

export default Banner
