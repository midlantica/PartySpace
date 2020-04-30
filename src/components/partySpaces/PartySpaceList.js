import React, { useContext, useState, useEffect } from 'react'
import { PartySpaceContext } from './PartySpaceProvider'
import { VenueContext } from '../venues/VenueProvider'
import { UserContext } from '../users/UserProvider'
import { Button, Modal, ModalBody, ModalHeader } from 'reactstrap'
import PartySpaceForm from './PartySpaceForm'
import { PartySpace } from './PartySpace'

export default () => {
  const { partyspaces } = useContext(PartySpaceContext)
  const { venues } = useContext(VenueContext)
  const { users } = useContext(UserContext)

  const [modal, setModal] = useState(false)
  const toggle = () => setModal(!modal)

  // const [filteredPartySpaces, setFiltered] = useState([])

  return (
    <>
      <div className='flexRowWrap just-space-between marBQ'>
        <h4 className='marRH'>PartySpaces</h4>
        <Button
          onClick={() => {
            // check if the user is authenticated
            const userId = localStorage.getItem('partyspace_user')
            if (userId) {
              // If the user is authenticated, show the animal form
              toggle()
            }
          }}
          className='ps-button'
        >
          &#65291; Add PartySpace{' '}
          {/* <<-- &#65291; That's the unicode plus symbol +++ */}
        </Button>
      </div>

      <div className='gridSection animals'>
        {partyspaces.map((partyspace) => {
          const matchingPartySpace = partyspaces.map(
            (usah) => usah.id === partyspace.userId
          )

          return (
            <PartySpace
              key={partyspaces.id}
              partyspace={partyspace}
              venue={matchingPartySpace}
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
