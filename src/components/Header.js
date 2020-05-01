import React from 'react'

export default ({ partyspace, venue, setActiveList }) => (
  <header>
    <img className='logo' src='partyspace-logo-white.svg' alt='logo' />
    <div className='masthead'>
      <a href='/'>
        <h2>PartySpace</h2>
        <p className='fs-x-small'>A space for party people</p>
      </a>
    </div>
  </header>
)
