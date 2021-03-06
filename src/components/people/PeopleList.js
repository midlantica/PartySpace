import React, { useContext, useState } from 'react'
import { Modal, ModalBody, ModalHeader } from 'reactstrap'
import { PeopleContext } from './PeopleProvider'
// import { PartySpaceContext } from '../partySpaces/PartySpaceProvider'
// import { PartySpaceVenuesContext } from '../partySpaces/PartySpaceVenuesProvider'
import PeopleEditForm from './PeopleEditForm'

export default ({ partySpace, setActiveList, PartySpaceClicked }) => {
  // const localUserId = parseInt(localStorage.getItem('partySpace_user'))
  // const { partySpaces } = useContext(PartySpaceContext)
  const { peoples, removePeople } = useContext(PeopleContext)
  // const { partySpaceVenues } = useContext(PartySpaceVenuesContext)

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

  return (
    <>
      {partySpacePeople.map((person) => {
        return (
          <div className='ps-invited'>
            <p
              className='person flex-grow-1'
              onClick={(e) => {
                e.preventDefault()
                setSelectedPerson(person)
                toggle()
              }}
            >
              {person.name}
            </p>
            <span
              className='exOut'
              onClick={() => {
                removePeople(person.id)
              }}
            >
              ×
            </span>
          </div>
        )
      })}
      <Modal isOpen={modalPeopleUpdate} toggle={toggle}>
        <ModalHeader toggle={toggle}>Update Person</ModalHeader>
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
}
