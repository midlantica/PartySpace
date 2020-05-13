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
          <p className='fs-small'>Date: {partySpace.dateStart}</p>
          <p className='fs-small'>Time: {partySpace.timeStart}</p>
          <p className='fs-small'>{partySpace.description}</p>
        </div>
      </section>
    </>
  )
}
