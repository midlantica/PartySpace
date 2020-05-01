import React, { useContext, useState } from 'react'
import { PartySpaceContext } from './PartySpaceProvider'
// import { UserContext } from '../users/UserProvider'
import { VenueContext } from '../venues/VenueProvider'
// import { Venue } from '../venues/Venue'
import { Button, Modal, ModalBody, ModalHeader } from 'reactstrap'
import PartySpaceForm from './PartySpaceForm'
import { PartySpace } from './PartySpace'
// import PartySpaceCompose from './PartySpaceCompose'
// import Dashboard from '../Dashboard'

export default ({ setActiveList }) => {
  const userId = parseInt(localStorage.getItem('partySpace_user'))
  const { partyspaces } = useContext(PartySpaceContext)
  const { venue } = useContext(VenueContext)
  // const { users } = useContext(UserContext)

  const [modal, setModal] = useState(false)
  const toggle = () => setModal(!modal)

  // const [filteredPartySpaces, setFiltered] = useState([])

  const matchingPartySpaces = partyspaces.filter(
    (partyspace) => userId === partyspace.userId
  )

  return (
    <>
      <div className='flexRowWrap just-space-between marBQ'>
        <h4 className='marRH'>PartySpaces</h4>
        <Button
          onClick={() => {
            // check if the user is authenticated
            if (userId) {
              // If the user is authenticated, show the PartySpace form
              toggle()
            }
          }}
          className='ps-button'
        >
          &#65291; Add PartySpace
        </Button>
      </div>

      <div className='gridSection partyspaces'>
        {matchingPartySpaces.map((partyspace) => {
          return (
            <PartySpace
              key={partyspace.id}
              partyspace={partyspace}
              venue={venue}
              setActiveList={setActiveList}
            />
          )
        })}
      </div>

      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Add PartySpace</ModalHeader>
        <ModalBody>
          <PartySpaceForm toggler={toggle} />
        </ModalBody>
      </Modal>
    </>
  )
}
