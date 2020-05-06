import React, { useContext } from 'react'
import { VenueContext } from './VenueProvider'
import Venue from './Venue'

export const VenueList = () => {
  const { venues } = useContext(VenueContext)

  return (
    <>
      <h5 className='inline-block marLH'>Venues</h5>
      <div className='venues'>
        {venues.map((ven) => (
          <Venue key={ven.id} venue={ven} />
        ))}
      </div>
    </>
  )
}
