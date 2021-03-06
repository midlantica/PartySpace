import React, { useEffect, useState } from 'react'

/*
    The context is imported and used by individual components
    that need data
*/
export const PartySpaceContext = React.createContext()

/*
 This component establishes what data can be used.
 */
export const PartySpaceProvider = (props) => {
  const [partySpaces, setPartySpaces] = useState([])

  const getPartySpaces = () => {
    return fetch('http://localhost:8088/partySpaces')
      .then((res) => res.json())
      .then(setPartySpaces)
  }

  const addPartySpace = (partySpace) => {
    return fetch('http://localhost:8088/partySpaces', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(partySpace),
    }).then(getPartySpaces)
  }

  const updatePartySpace = (partySpace) => {
    return fetch(`http://localhost:8088/partySpaces/${partySpace.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(partySpace),
    }).then(getPartySpaces)
  }

  /*
        Load all PartySpaces when the component is mounted. Ensure that
        an empty array is the second argument to avoid infinite loop.
    */
  useEffect(() => {
    getPartySpaces()
  }, [])

  useEffect(() => {
    console.log('****  ANIMAL APPLICATION STATE CHANGED  ****')
  }, [partySpaces])

  return (
    <PartySpaceContext.Provider
      value={{
        partySpaces,
        addPartySpace,
        updatePartySpace,
      }}
    >
      {props.children}
    </PartySpaceContext.Provider>
  )
}
