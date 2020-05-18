import React, { useContext, useState } from 'react'
import { Modal, ModalBody, ModalHeader } from 'reactstrap'
import { PartySpaceContext } from './PartySpaceProvider'
import { PartySpaceVenuesContext } from './PartySpaceVenuesProvider'
import { PartySpaceEdit } from './PartySpaceEdit'
import PeopleForm from '../people/PeopleForm'
import { PartySpaceComposeItem } from './PartySpaceComposeItem'
import { VenueContext } from '../venues/VenueProvider'
import { VenueList } from '../venues/VenueList'
import { VenueEdit } from '../venues/VenueEdit'
import PeopleList from '../people/PeopleList'
import { PeopleProvider } from '../people/PeopleProvider'
import { VenueCreate } from '../venues/VenueCreate'

import './PartySpace.css'
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>

export default ({ setActiveList, PartySpaceClicked, partySpace }) => {
  const localUserId = parseInt(localStorage.getItem('partySpace_user'))
  const { partySpaces } = useContext(PartySpaceContext)
  const { partySpaceVenues } = useContext(PartySpaceVenuesContext)

  const [modal, setModal] = useState(false)
  const toggle = () => setModal(!modal)

  const [modalVenueEdit, setModalVenueEdit] = useState(false)
  const venueEdit = () => setModalVenueEdit(!modalVenueEdit)

  const [modalVenueCreate, setModalVenueCreate] = useState(false)
  const venueCreate = () => setModalVenueCreate(!modalVenueCreate)

  const [modalPeopleInvite, setPeopleInvite] = useState(false)
  const peopleInvite = () => setPeopleInvite(!modalPeopleInvite)

  const [modalEditPartySpace, setModalEditPartySpace] = useState(false)
  const editPartySpaceToggle = () =>
    setModalEditPartySpace(!modalEditPartySpace)

  const singlePartySpace = partySpaces.find(
    (maPartySpace) => PartySpaceClicked === maPartySpace.id
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

        {/* INVITEES */}
        {/* INVITEES */}
        <section className='ps-people'>
          <div className='w100 flexRowWrap just-space-between align-i-flex-center marBH marLH'>
            <h5 className='mar0'>People</h5>
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
          <div className='w100 flexRowWrap align-i-flex-center'>
            <PeopleList
              key={singlePartySpace.id}
              partySpace={singlePartySpace}
              setActiveList={setActiveList}
              PartySpaceClicked={PartySpaceClicked}
            />
          </div>
        </section>

        {/* VENUES */}
        {/* VENUES */}
        <section className='ps-venues'>
          <button
            className='ps-time-btn btn ps-button ps-blue'
            onClick={() => {
              // check if the user is authenticated
              if (localUserId) {
                // If the user is authenticated, show the PartySpace form
                editPartySpaceToggle()
              }
            }}
          >
            6:00pm
          </button>
          <div className='ps-venues-mast'>
            <h5 className='mar0'>Venues</h5>
            <button
              className='btn ps-button ps-green marT0 marLAuto'
              onClick={() => {
                // check if the user is authenticated
                if (localUserId) {
                  // If the user is authenticated, show the PartySpace form
                  venueCreate()
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

      {/* MODALS */}
      {/* MODALS */}
      <Modal isOpen={modalEditPartySpace}>
        <ModalHeader toggle={editPartySpaceToggle}>Edit PartySpace</ModalHeader>
        <ModalBody>
          <PartySpaceEdit
            toggler={editPartySpaceToggle}
            partySpace={singlePartySpace}
          />
        </ModalBody>
      </Modal>

      <Modal isOpen={modalVenueEdit} toggle={venueEdit}>
        <ModalHeader toggle={venueEdit}>Save Venue</ModalHeader>
        <ModalBody>
          <VenueEdit toggler={venueEdit} />
        </ModalBody>
      </Modal>

      <Modal isOpen={modalVenueCreate} toggle={venueCreate}>
        <ModalHeader toggle={venueCreate}>Save Venue</ModalHeader>
        <ModalBody>
          <VenueCreate
            toggler={venueCreate}
            PartySpaceClicked={PartySpaceClicked}
          />
        </ModalBody>
      </Modal>

      <Modal isOpen={modalPeopleInvite} peopleInvite={peopleInvite}>
        <ModalHeader toggle={peopleInvite}>Invite People</ModalHeader>
        <ModalBody>
          <PeopleForm
            toggler={peopleInvite}
            PartySpaceClicked={PartySpaceClicked}
          />
        </ModalBody>
      </Modal>
    </>
  )
}
