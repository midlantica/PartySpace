import React, { useState, useEffect } from 'react'
import PartySpaceList from './partySpaces/PartySpaceList'
import { PartySpaceProvider } from './partySpaces/PartySpaceProvider'
import PartySpaceCompose from './partySpaces/PartySpaceCompose'
// import UserList from './users/UserList'
import { UserProvider } from './users/UserProvider'
// import PeopleList from './people/PeopleList'
import { PeopleProvider } from './people/PeopleProvider'
// import VenueList from './venues/VenueList'
import { VenueProvider } from './venues/VenueProvider'
import { PartySpaceVenuesProvider } from './partySpaces/PartySpaceVenuesProvider'

export default () => {
  const [activeList, setActiveList] = useState('PartySpaceList')

  const [components, setComponents] = useState()
  const [PartySpaceClicked, setPartySpaceClicked] = useState()

  useEffect(() => {
    if (activeList === 'PartySpaceList') {
      setComponents(showPartySpaceList)
    } else if (activeList === 'PartySpaceCompose') {
      setComponents(showPartySpaceCompose)
    }
  }, [activeList])

  // HIGHER ORDER FUNCTION. IT RETURNS OTHER FUNCTION (i.e. COMPONENTS)
  const showPartySpaceList = () => (
    <div className='dataContainer'>
      <PartySpaceList
        setActiveList={setActiveList}
        setPartySpaceClicked={setPartySpaceClicked}
        PartySpaceClicked={PartySpaceClicked}
      />
    </div>
  )

  const showPartySpaceCompose = () => (
    <div className='dataContainer'>
      <PartySpaceCompose
        setActiveList={setActiveList}
        PartySpaceClicked={PartySpaceClicked}
      />
    </div>
  )

  return (
    <>
      <PartySpaceProvider>
        <PartySpaceVenuesProvider>
          <UserProvider>
            <PeopleProvider>
              <VenueProvider>
                <div>{components}</div>
              </VenueProvider>
            </PeopleProvider>
          </UserProvider>
        </PartySpaceVenuesProvider>
      </PartySpaceProvider>
    </>
  )
}
