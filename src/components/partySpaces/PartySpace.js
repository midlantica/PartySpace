import React, { useContext, useState } from 'react'
import { PartySpaceContext } from './PartySpaceProvider'

export const PartySpace = ({ partyspace, venue, setActiveList }) => {
  const { partyspaces } = useContext(PartySpaceContext)

  return (
    <>
      <section
        className='box partyspace flexColumn'
        onClick={(partyspaces) => setActiveList('PartySpaceCompose')}
      >
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
