import React, { useEffect, useState } from 'react'

/*
    The context is imported and used by individual components
    that need data
*/
export const PartySpaceVenuesContext = React.createContext()

/*
 This component establishes what data can be used.
 */
export const PartySpaceVenuesProvider = (props) => {
  const [partySpaceVenues, setPartySpaceVenues] = useState([])

  const getPartySpaceVenues = () => {
    return fetch('http://localhost:8088/partySpaceVenues')
      .then((res) => res.json())
      .then(setPartySpaceVenues)
  }

  const addPartySpaceVenue = (PartySpaceVenue) => {
    return fetch('http://localhost:8088/partySpaceVenues', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(PartySpaceVenue),
    }).then(getPartySpaceVenues)
  }

  const updatePartySpaceVenues = (PartySpaceVenue) => {
    return fetch(
      `http://localhost:8088/partySpaceVenues/${partySpaceVenues.id}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(PartySpaceVenue),
      }
    ).then(getPartySpaceVenues)
  }

  /*
        Load all PartySpaceVenues when the component is mounted. Ensure that
        an empty array is the second argument to avoid infinite loop.
    */
  useEffect(() => {
    getPartySpaceVenues()
  }, [])

  useEffect(() => {
    console.log('****  ANIMAL APPLICATION STATE CHANGED  ****')
  }, [partySpaceVenues])

  return (
    <PartySpaceVenuesContext.Provider
      value={{
        partySpaceVenues,
        addPartySpaceVenue,
        updatePartySpaceVenues,
      }}
    >
      {props.children}
    </PartySpaceVenuesContext.Provider>
  )
}
