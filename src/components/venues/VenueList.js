import React, { useContext } from 'react'
import { VenueContext } from './VenueProvider'
import Venue from './Venue'

export const VenueList = () => {
  const { venues } = useContext(VenueContext)

  return (
    <>
      <h5>Venues</h5>
      <div className='gridSection venues'>
        {venues.map((loc) => (
          <Venue key={loc.id} venue={loc} />
        ))}
      </div>
    </>
  )
}
