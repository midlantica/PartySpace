import React, { useContext } from 'react'
import { PartySpaceContext } from './PartySpaceProvider'

export const PartySpace = ({
  partySpace,
  setActiveList,
  setPartySpaceClicked,
}) => {
  return (
    <>
      <section
        className='box partyspace flexColumn'
        onClick={() => {
          setPartySpaceClicked(partySpace.id)
          setActiveList('PartySpaceCompose')
        }}
      >
        <div className='topFlexBox'>
          <h6>{partySpace.title}</h6>
          <p className='bold'>Date: {partySpace.dateStart}</p>
          <p className='bold'>Time: {partySpace.timeStart}</p>
          <p className='fs-small marTQ'>{partySpace.description}</p>
        </div>
      </section>
    </>
  )
}
