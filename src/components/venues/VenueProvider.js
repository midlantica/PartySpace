import React, { useState, useEffect } from 'react'

/*
    The context is imported and used by individual components
    that need data
*/
export const VenueContext = React.createContext()

/*
 This component establishes what data can be used.
 */
export const VenueProvider = (props) => {
  const [venues, setVenues] = useState([])

  const getVenues = () => {
    return fetch('http://localhost:8088/venues')
      .then((res) => res.json())
      .then(setVenues)
  }

  const addVenue = (venue) => {
    return fetch('http://localhost:8088/venues', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(venue),
    }).then(getVenues)
  }

  const removeVenue = (venueId) => {
    return fetch(`http://localhost:8088/venues/${venueId}`, {
      method: 'DELETE',
    }).then(getVenues)
  }

  /*
        Load all animals when the component is mounted. Ensure that
        an empty array is the second argument to avoid infinite loop.
    */
  useEffect(() => {
    getVenues()
  }, [])

  useEffect(() => {
    console.log('****  LOCATION APPLICATION STATE CHANGED  ****')
  }, [venues])

  return (
    <VenueContext.Provider
      value={{
        venues,
        addVenue,
        removeVenue,
      }}
    >
      {props.children}
    </VenueContext.Provider>
  )
}
