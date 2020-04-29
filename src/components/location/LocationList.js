import React, { useContext } from 'react'
import { LocationContext } from './LocationProvider'
import Location from './Location'

export default () => {
  const { locations } = useContext(LocationContext)

  return (
    <>
      <h4>Locations</h4>
      <div className='gridSection locations'>
        {locations.map((loc) => (
          <Location key={loc.id} location={loc} />
        ))}
      </div>
    </>
  )
}
