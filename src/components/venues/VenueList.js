import React, { useContext } from 'react'
import { VenueContext } from './VenueProvider'
import { PartySpaceVenuesContext } from '../partySpaces/PartySpaceVenuesProvider'
import Venue from './Venue'

export const VenueList = () => {
  const { venues } = useContext(VenueContext)

  return (
    <>
      <div className='venues'>
        {venues.map((ven) => (
          <Venue key={ven.id} venue={ven} />
        ))}
      </div>
    </>
  )
}
