import React, { useState } from 'react'
// ANIMALS
import PartySpaceList from './partySpaces/PartySpaceList'
import { PartySpaceProvider } from './partySpaces/PartySpaceProvider'
// CUSTOMERS
// import UserList from './users/UserList'
import { UserProvider } from './users/UserProvider'
// EMPLOYEES
import PeopleList from './people/PeopleList'
import { PeopleProvider } from './people/PeopleProvider'
// LOCATIONS
// import VenueList from './venues/VenueList'
import { VenueProvider } from './venues/VenueProvider'

export default () => {
  return (
    <>
      <PartySpaceProvider>
        <UserProvider>
          <PeopleProvider>
            <VenueProvider>
              <div className='dataContainer'>
                <PartySpaceList />
                <PeopleList />
              </div>
            </VenueProvider>
          </PeopleProvider>
        </UserProvider>
      </PartySpaceProvider>
    </>
  )
}
