import React, { useState } from 'react'
import Dashboard from './Dashboard'
import Auth from './auth/Auth'
import Header from './Header'
import Footer from './Footer'

export default () => {
  const [check, update] = useState(false)
  const toggle = () => update(!check)

  return localStorage.getItem('partySpace_customer') ? (
    <>
      <Header />
      <div className='dh-container'>
        <Dashboard />
      </div>
      <Footer />
    </>
  ) : (
    <>
      <Header />
      <div className='dh-container'>
        <Auth toggle={toggle} />
      </div>
      <Footer />
    </>
  )
}
