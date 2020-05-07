import React, { useContext, useState } from 'react'
import { Button, Modal, ModalBody, ModalHeader } from 'reactstrap'

import { PartySpaceContext } from './PartySpaceProvider'
import { VenueContext } from '../venues/VenueProvider'
import PartySpaceForm from './PartySpaceForm'
import { PartySpace } from './PartySpace'
// import { UserContext } from '../users/UserProvider'
// import { Venue } from '../venues/Venue'
// import PartySpaceCompose from './PartySpaceCompose'
// import Dashboard from '../Dashboard'

export default ({ setActiveList, setPartySpaceClicked }) => {
  const localUserId = parseInt(localStorage.getItem('partySpace_user'))
  const { partySpaces } = useContext(PartySpaceContext)
  const { venues } = useContext(VenueContext)
  // const { users } = useContext(UserContext)

  const [modal, setModal] = useState(false)
  const toggle = () => setModal(!modal)

  const matchingPartySpaces = partySpaces.filter(
    (partySpace) => partySpace.userId === localUserId
  )

  return (
    <>
      <div className='flexRowWrap just-space-between marBH'>
        <h4 className='marRH'>PartySpaces</h4>
        <Button
          onClick={() => {
            // check if the user is authenticated
            if (localUserId) {
              // If the user is authenticated, show the PartySpace form
              toggle()
            }
          }}
          className='ps-button'
        >
          &#65291; Add PartySpace
        </Button>
      </div>

      <div className='gridSection partyspaces marB1'>
        {matchingPartySpaces.map((partySpace) => {
          return (
            <PartySpace
              key={partySpace.id}
              partySpace={partySpace}
              // venues={venues}
              setActiveList={setActiveList}
              setPartySpaceClicked={setPartySpaceClicked}
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
