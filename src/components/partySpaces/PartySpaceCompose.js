import React, { useContext, useState } from 'react'
import { Modal, ModalBody, ModalHeader } from 'reactstrap'

import { PartySpaceContext } from './PartySpaceProvider'
import { PartySpaceVenuesContext } from './PartySpaceVenuesProvider'
import PartySpaceForm from './PartySpaceForm'
import PeopleForm from '../people/PeopleForm'
import { PartySpaceComposeItem } from './PartySpaceComposeItem'
import { VenueContext } from '../venues/VenueProvider'
import { VenueList } from '../venues/VenueList'
import { VenueEdit } from '../venues/VenueEdit'
import PeopleList from '../people/PeopleList'

import './PartySpace.css'
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>

export default ({ setActiveList, PartySpaceClicked }) => {
  const localUserId = parseInt(localStorage.getItem('partySpace_user'))
  const { partySpaces } = useContext(PartySpaceContext)
  const { partySpaceVenues } = useContext(PartySpaceVenuesContext)

  const [modal, setModal] = useState(false)
  const toggle = () => setModal(!modal)

  const [modalVenueEdit, setModalVenueEdit] = useState(false)
  const venueEdit = () => setModalVenueEdit(!modalVenueEdit)

  const [modalPeopleInvite, setPeopleInvite] = useState(false)
  const peopleInvite = () => setPeopleInvite(!modalPeopleInvite)

  const singlePartySpace = partySpaces.find(
    (partySpace) => PartySpaceClicked === partySpace.id
  )

  const findPartySpaceVenues = partySpaceVenues.map(
    (venues) => PartySpaceClicked === partySpaceVenues.id
  )

  return (
    <>
      <div className='ps-compose-grid'>
        <div className='partyspaces'>
          <PartySpaceComposeItem
            key={singlePartySpace.id}
            partySpace={singlePartySpace}
            setActiveList={setActiveList}
            PartySpaceClicked={PartySpaceClicked}
          />
        </div>
        <div className='ps-invites'>
          <section className='ps-people'>
            <div className='flexRowWrap just-space-between align-i-flex-center marBH'>
              <h5>People</h5>
              <button
                className='ps-button btn btn-secondary'
                onClick={() => {
                  // check if the user is authenticated
                  if (localUserId) {
                    // If the user is authenticated, show the PartySpace form
                    peopleInvite()
                  }
                }}
              >
                ＋ Invite
              </button>
            </div>
            <PeopleList
              key={singlePartySpace.id}
              partySpace={singlePartySpace}
              setActiveList={setActiveList}
              PartySpaceClicked={PartySpaceClicked}
            />
            <p className='ps-invited'>
              XXXXXJohn Smith <span className='exOut'>×</span>
            </p>
          </section>
        </div>
        <section className='ps-venues'>
          <div className='flexRowWrap just-space-between align-i-flex-center marBH'>
            <button
              className='btn ps-button ps-blue mar0'
              onClick={() => {
                // check if the user is authenticated
                if (localUserId) {
                  // If the user is authenticated, show the PartySpace form
                  toggle()
                }
              }}
            >
              6:00pm
            </button>
            <h5 className='inline-block marLH'>Venues</h5>
            <button
              className='btn ps-button ps-green marT0 marLAuto'
              onClick={() => {
                // check if the user is authenticated
                if (localUserId) {
                  // If the user is authenticated, show the PartySpace form
                  venueEdit()
                }
              }}
            >
              ＋ Venue
            </button>
          </div>
          <VenueList
            key={singlePartySpace.id}
            partySpace={singlePartySpace}
            venues={findPartySpaceVenues}
            setActiveList={setActiveList}
            PartySpaceClicked={PartySpaceClicked}
          />
        </section>
      </div>

      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>PartySpace</ModalHeader>
        <ModalBody>
          <PartySpaceForm toggler={toggle} />
        </ModalBody>
      </Modal>

      <Modal isOpen={modalVenueEdit} venueEdit={venueEdit}>
        <ModalHeader toggle={venueEdit}>Edit Venue</ModalHeader>
        <ModalBody>
          <VenueEdit toggler={venueEdit} />
        </ModalBody>
      </Modal>

      <Modal isOpen={modalPeopleInvite} peopleInvite={peopleInvite}>
        <ModalHeader toggle={peopleInvite}>Invite People</ModalHeader>
        <ModalBody>
          <PeopleForm toggler={peopleInvite} />
        </ModalBody>
      </Modal>
    </>
  )
}
