import React, { useContext, useState } from 'react'
import { Modal, ModalBody, ModalHeader } from 'reactstrap'
// import { PartySpaceContext } from '../partySpaces/PartySpaceProvider'
import { VenueContext } from './VenueProvider'
import { VenueEdit } from './VenueEdit'
// import { PartySpaceVenuesContext } from '../partySpaces/PartySpaceVenuesProvider'

export const Venue = ({
  partySpace, //
  setActiveList,
  PartySpaceClicked,
  partyRelationship,
  venue,
}) => {
  const localUserId = parseInt(localStorage.getItem('partySpace_user'))
  const { removeVenue } = useContext(VenueContext)
  // const { partySpaceVenues } = useContext(PartySpaceVenuesContext)

  // const findPartySpaceVenues = partySpaceVenues.map(
  //   (venues) => PartySpaceClicked === partySpaceVenues.id
  // )

  const [modalVenueEdit, setModalVenueEdit] = useState(false)
  const venueEdit = () => setModalVenueEdit(!modalVenueEdit)

  return (
    <section className='venue'>
      <div className='boxTop'>
        <button
          className='btn-Edit'
          onClick={() => {
            // check if the user is authenticated
            if (localUserId) {
              // If the user is authenticated, show the PartySpace form
              venueEdit()
            }
          }}
        />
        <span className='time'>Time: {partySpace.timeStart}</span>
        <span
          className='exxy fs-x-small'
          onClick={() => {
            removeVenue(venue.id)
            console.log(venue.id)
          }}
        >
          ×
        </span>
      </div>
      <div className='box flexRow just-space-between'>
        <div className='w-75 marRAuto'>
          <h6 className='marBQ'>{venue.name}</h6>
          <p className='fs-x-small marBQ'>
            Duration: {partyRelationship.duration}hrs
          </p>
        </div>
        <div>
          <div className='marL1'>
            {/*
              CAPTURE THE <iframe src='<url>' PROPERTY ONLY
              Geo Url: {venue.geourl}
            */}
            <iframe
              src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12891.221352621507!2d-86.8006545302246!3d36.122599949999994!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x410684f065c72c72!2sJeni&#39;s%20Splendid%20Ice%20Creams!5e0!3m2!1sen!2sus!4v1589206754848!5m2!1sen!2sus'
              // LEAVE STYLE LIKE THIS
              style={{
                width: '100%',
                height: '100%',
                frameBorder: '0',
                border: '0',
                allowFullScreen: '',
                ariaHidden: 'false',
                tabIndex: '0',
              }}
            ></iframe>
          </div>
        </div>
      </div>
      <Modal isOpen={modalVenueEdit} venueEdit={venueEdit}>
        <ModalHeader toggle={venueEdit}>Edit Venue</ModalHeader>
        <ModalBody>
          <VenueEdit toggler={venueEdit} venue={venue} partySpace={partySpace} />
        </ModalBody>
      </Modal>
    </section>
  )
}
