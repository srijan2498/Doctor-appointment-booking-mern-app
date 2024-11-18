import React from 'react'
import { services } from '../Data/servicesData'
import './services.css'

const Services = () => {
    return (
        <div className='service'>
            <p className="heading">Our Services</p>
            <div className="service-container">
                {services.map((item, index) => {
                    return <div key={index} className="service-item">
                        <div className="service-img" style={{ backgroundImage: `url(${item.img})` }}></div>
                        <div className="service-heading">{item.name}</div>
                        <div className="service-text"></div>
                    </div>
                })}
            </div>
        </div>
    )
}

export default Services
