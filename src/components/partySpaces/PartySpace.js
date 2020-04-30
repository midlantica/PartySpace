import React from 'react'

export const PartySpace = ({ partyspace, venue }) => (
  <section className='box partyspace flexColumn'>
    <div className='topFlexBox'>
      <h6>{partyspace.title}</h6>
      <p className='fs-small'>Date: {partyspace.dateStart}</p>
      <p className='fs-small'>Time: {partyspace.timeStart}</p>
      <p className='fs-small'>{partyspace.description}</p>
      {/* <p className='fs-small'>Map: {venue.geourl}</p> */}
    </div>
  </section>
)
