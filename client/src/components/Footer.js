import React from 'react'
import './footer.css'

const Footer = () => {
  const year = new Date().getFullYear()
  return (
    <div className='footer'>
      Cupping Studio © {year} | Srijan Tripathi
    </div>
  )
}

export default Footer
