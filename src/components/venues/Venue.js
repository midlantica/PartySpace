import React, { useContext, useState } from 'react'
import { Button, Modal, ModalBody, ModalHeader } from 'reactstrap'
import { PartySpaceContext } from '../partySpaces/PartySpaceProvider'
import { VenueContext } from './VenueProvider'
import { VenueEdit } from './VenueEdit'
import { PartySpaceVenuesContext } from '../partySpaces/PartySpaceVenuesProvider'

export const Venue = ({
  partySpace, //
  setActiveList,
  PartySpaceClicked,
}) => {
  const localUserId = parseInt(localStorage.getItem('partySpace_user'))
  const { venues } = useContext(VenueContext)
  const { partySpaceVenues } = useContext(PartySpaceVenuesContext)

  const findPartySpaceVenues = partySpaceVenues.map(
    (venues) => PartySpaceClicked === partySpaceVenues.id
  )

  const [modalVenueEdit, setModalVenueEdit] = useState(false)
  const venueEdit = () => setModalVenueEdit(!modalVenueEdit)

  return (
    <section className='venue'>
      <div className='boxTop'>
        <button
          onClick={() => {
            // check if the user is authenticated
            if (localUserId) {
              // If the user is authenticated, show the PartySpace form
              venueEdit()
            }
          }}
        />
        <span className='time'>Time: 6:00pm</span>
        <span className='exxy fs-x-small'>×</span>
      </div>
      <div className='box'>
        <h6 className='marBQ'>Name: {findPartySpaceVenues.name}</h6>
        <p className='fs-x-small marBQ'>
          Duration: {findPartySpaceVenues.duration}hrs
        </p>
        <p className='fs-x-small'>Geo Url: {findPartySpaceVenues.geourl}</p>
      </div>
      <Modal isOpen={modalVenueEdit} venueEdit={venueEdit}>
        <ModalHeader toggle={venueEdit}>Edit Venue</ModalHeader>
        <ModalBody>
          <VenueEdit toggler={venueEdit} />
        </ModalBody>
      </Modal>
    </section>
  )
}
