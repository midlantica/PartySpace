import React, { useContext, useState } from 'react'
import { Button, Modal, ModalBody, ModalHeader } from 'reactstrap'

import { PartySpaceContext } from '../partySpaces/PartySpaceProvider'
import { VenueContext } from './VenueProvider'
import { PartySpaceVenuesContext } from '../partySpaces/PartySpaceVenuesProvider'
import { Venue } from './Venue'
import './Venue.css'

export const VenueList = ({ setActiveList, PartySpaceClicked }) => {
  // const localUserId = parseInt(localStorage.getItem('partySpace_user'))
  const { partySpaces } = useContext(PartySpaceContext)
  const { venues } = useContext(VenueContext)
  const { partySpaceVenues } = useContext(PartySpaceVenuesContext)

  // const { users } = useContext(UserContext)

  return (
    <>
      <div className='venues'>
        {venues.map((ven) => (
          <Venue
            key={ven.id} //
            venues={ven}
          />
        ))}
      </div>
    </>
  )
}
