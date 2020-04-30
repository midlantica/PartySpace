import React from 'react'

export const PartySpace = ({ partyspace, venue }) => (
  <section className='box partyspace flexColumn'>
    <div className='topFlexBox'>
      <h6>Title: {partyspace.title}</h6>
      <p className='fs-small'>Description: {partyspace.description}</p>
      <p className='fs-x-small'>Date: {partyspace.dateStart}</p>
      <p className='fs-x-small'>Time: {partyspace.timeStart}</p>
      {/* <p className='fs-small'>Map: {venue.geourl}</p> */}
    </div>
  </section>
)
