import React from 'react'

export const PartySpace = ({ partyspace, venue }) => (
  <section className='box partyspace flexColumn'>
    <div className='topFlexBox'>
      <h6>{partyspace.title}</h6>
      <p className='fs-small'>{partyspace.description}</p>
      <p className='fs-small'>{venue.geourl}</p>
      <p className='fs-x-small'>Venue: {venue.name}</p>
    </div>
  </section>
)
