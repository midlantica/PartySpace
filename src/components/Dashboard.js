import React, { useState, useEffect } from 'react'
// ANIMALS
import PartySpaceList from './partySpaces/PartySpaceList'
import { PartySpaceProvider } from './partySpaces/PartySpaceProvider'
import PartySpaceCompose from './partySpaces/PartySpaceCompose'
// CUSTOMERS
// import UserList from './users/UserList'
import { UserProvider } from './users/UserProvider'
// EMPLOYEES
// import PeopleList from './people/PeopleList'
import { PeopleProvider } from './people/PeopleProvider'
// LOCATIONS
// import VenueList from './venues/VenueList'
import { VenueProvider } from './venues/VenueProvider'

export default () => {
  const [activeList, setActiveList] = useState('PartySpaceList')
  // console.log('do it!')
  const [components, setComponents] = useState()

  useEffect(() => {
    if (activeList === 'PartySpaceList') {
      setComponents(showPartySpaceList)
    } else if (activeList === 'PartySpaceCompose') {
      setComponents(showPartySpaceCompose)
    }
  }, [activeList])

  // HIGHER ORDER FUNCTION. IT RETURNS OTHER FUNCTION (i.e. COMPONENTS)
  const showPartySpaceList = () => (
    <PartySpaceProvider>
      <UserProvider>
        <PeopleProvider>
          <VenueProvider>
            <div className='dataContainer'>
              <PartySpaceList setActiveList={setActiveList} />
            </div>
          </VenueProvider>
        </PeopleProvider>
      </UserProvider>
    </PartySpaceProvider>
  )

  const showPartySpaceCompose = () => (
    <PartySpaceProvider>
      <UserProvider>
        <PeopleProvider>
          <VenueProvider>
            <div className='dataContainer'>
              <PartySpaceCompose setActiveList={setActiveList} />
            </div>
          </VenueProvider>
        </PeopleProvider>
      </UserProvider>
    </PartySpaceProvider>
  )

  return (
    <>
      <div>{components}</div>
    </>
  )
}
