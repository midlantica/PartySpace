import React, { useContext, useState } from 'react'
import { Modal, ModalBody, ModalHeader } from 'reactstrap'

import { PeopleContext } from './PeopleProvider'
import { PartySpaceContext } from '../partySpaces/PartySpaceProvider'
import { PartySpaceVenuesContext } from '../partySpaces/PartySpaceVenuesProvider'
import PeopleEditForm from './PeopleEditForm'

export default ({ partySpace, setActiveList, PartySpaceClicked }) => {
  // const localUserId = parseInt(localStorage.getItem('partySpace_user'))
  const { partySpaces } = useContext(PartySpaceContext)
  const { peoples, removePeople, editPeople } = useContext(PeopleContext)
  const { partySpaceVenues } = useContext(PartySpaceVenuesContext)

  const [modalPeopleUpdate, setModalPeopleUpdate] = useState(false)
  const toggle = () => setModalPeopleUpdate(!modalPeopleUpdate)

  const [selectedPerson, setSelectedPerson] = useState({ person: { id: 0 } })

  // console.log(peoples)

  const partySpacePeople = peoples.filter(
    (x) => PartySpaceClicked === x.partySpaceId
  )

  // const removePeople = partySpaceVenues.map(
  //   (venues) => singlePartySpace === partySpaceVenues.id
  // )

  return partySpacePeople.map((person) => {
    return (
      <>
        <p
          className='ps-invited'
          onClick={() => {
            setSelectedPerson(person)
            toggle()
          }}
        >
          {person.name}
          <span
            className='exOut'
            onClick={() => {
              removePeople(person.id)
            }}
          >
            ×
          </span>
        </p>

        <Modal isOpen={modalPeopleUpdate} toggle={toggle}>
          <ModalHeader toggle={toggle}>Update People</ModalHeader>
          <ModalBody>
            <PeopleEditForm
              toggler={toggle}
              selectedPerson={selectedPerson}
              PartySpaceClicked={PartySpaceClicked}
            />
          </ModalBody>
        </Modal>
      </>
    )
  })
}
