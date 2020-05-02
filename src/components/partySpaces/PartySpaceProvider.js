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
  const [partyspaces, setPartySpaces] = useState([])

  const getPartySpaces = () => {
    return fetch('http://localhost:8088/partyspaces')
      .then((res) => res.json())
      .then(setPartySpaces)
  }

  const addPartySpace = (PartySpace) => {
    return fetch('http://localhost:8088/partyspaces', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(PartySpace),
    }).then(getPartySpaces)
  }

  const updatePartySpace = (PartySpace) => {
    return fetch(`http://localhost:8088/partyspaces/${partyspaces.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(PartySpace),
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
  }, [partyspaces])

  return (
    <PartySpaceContext.Provider
      value={{
        partyspaces,
        addPartySpace,
        updatePartySpace,
      }}
    >
      {props.children}
    </PartySpaceContext.Provider>
  )
}
