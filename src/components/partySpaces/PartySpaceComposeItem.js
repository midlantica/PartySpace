import React from 'react'
import './PartySpace.css'
export const PartySpaceComposeItem = ({ partyspace, venue, setActiveList }) => {
  return (
    <>
      <section className='box partyspace flexColumn'>
        <div className='topFlexBox'>
          <h6>{partyspace.title}</h6>
          <p className='fs-small'>Date: {partyspace.dateStart}</p>
          <p className='fs-small'>Time: {partyspace.timeStart}</p>
          <p className='fs-small'>{partyspace.description}</p>
          {/* <p className='fs-small'>Map: {venue.geourl}</p> */}
        </div>
      </section>
    </>
  )
}
