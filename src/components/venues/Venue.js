import React, { useContext, useState } from 'react'
import { PartySpaceContext } from '../partySpaces/PartySpaceProvider'
import { VenueContext } from './VenueProvider'
import { PartySpaceVenuesContext } from '../partySpaces/PartySpaceVenuesProvider'

export const Venue = ({
  partySpace, //
  setActiveList,
  PartySpaceClicked,
}) => {
  const { venues } = useContext(VenueContext)
  const { partySpaceVenues } = useContext(PartySpaceVenuesContext)

  const findPartySpaceVenues = partySpaceVenues.map(
    (venues) => PartySpaceClicked === partySpaceVenues.id
  )

  return (
    <section className='venue'>
      <div className='boxTop'>
        <i />
        <span className='time'>Time: 6:00pm</span>
        <span className='exxy fs-x-small'>×</span>
      </div>
      <div className='box'>
        <h6 className='venue__name marBQ'>Name: {findPartySpaceVenues.name}</h6>
        <p className='fs-x-small marBQ'>
          Duration: {findPartySpaceVenues.duration}hrs
        </p>
        <p className='fs-x-small'>Geo Url: {findPartySpaceVenues.geourl}</p>
      </div>
    </section>
  )
}
