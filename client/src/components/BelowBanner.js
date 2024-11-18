import React from 'react'
import './BelowBanner.css'
import { FiPhoneCall } from 'react-icons/fi';
import { GoLocation } from 'react-icons/go';

const BelowBanner = () => {
    return (
        <div className='below-banner-container'>
            <div className="below-banner-box">
                <div className="below-banner-item">
                    <div className="icon"><i className="fa-regular fa-clock"></i></div>
                    <div className="text">Working Hours</div>
                    <div className="info time">
                        <span>Mon - Sun</span>  <span>7:00 am - 8:00 pm</span>
                    </div>
                </div>
                <div className="below-banner-item" onClick={() => window.open("https://goo.gl/maps/aRpaWb2MTfmrLUb2A", "_blank")}>
                    <div className="icon"><GoLocation /></div>
                    <div className="text">Address</div>
                    <div className="info">Uttorda Beach, Salcette, Goa 403713, India</div>
                </div>
                <div className="below-banner-item">
                    <div className="icon"><FiPhoneCall /></div>
                    <div className="text">Contact Us</div>
                    <div className="info">+91 8888888888</div>
                </div>
            </div>
        </div>
    )
}

export default BelowBanner
