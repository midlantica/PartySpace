import React, { useContext, useState } from 'react'
import { Button, Modal, ModalBody, ModalHeader } from 'reactstrap'
import { PartySpaceContext } from '../partySpaces/PartySpaceProvider'
import { VenueContext } from './VenueProvider'
import { PartySpaceVenuesContext } from '../partySpaces/PartySpaceVenuesProvider'
import { Venue } from './Venue'
import './Venue.css'

export const VenueList = ({ partySpace, setActiveList, PartySpaceClicked }) => {
  // const localUserId = parseInt(localStorage.getItem('partySpace_user'))
  const { partySpaces } = useContext(PartySpaceContext)
  const { venues } = useContext(VenueContext)
  const { partySpaceVenues } = useContext(PartySpaceVenuesContext)

  // filter for partucular partySpace id
  const partyRelationships = partySpaceVenues.filter(
    (MyPartySpaceVenue) => PartySpaceClicked === MyPartySpaceVenue.partySpaceId
  )

  const findPartySpaceVenues = partyRelationships.map(
    (MyPartySpaceRelationship) => {
      return venues.find((v) => v.id === MyPartySpaceRelationship.venueId)
    }
  )
  // debugger

  return (
    <>
      <div className='venues'>
        {findPartySpaceVenues.map((ven) => {
          const partyRelationship = partyRelationships.find(
            (rel) => ven.id === rel.venueId
          )
          return (
            <Venue
              key={partyRelationship.id} //
              venue={ven}
              partySpace={partySpace}
              partyRelationship={partyRelationship}
              venues={findPartySpaceVenues}
              setActiveList={setActiveList}
              PartySpaceClicked={PartySpaceClicked}
            />
          )
        })}
      </div>
    </>
  )
}
