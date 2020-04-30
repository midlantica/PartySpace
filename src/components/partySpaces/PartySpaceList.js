import React, { useContext, useState, useEffect } from 'react'
import { PartySpaceContext } from './PartySpaceProvider'
import { VenueContext } from '../venues/VenueProvider'
import { UserContext } from '../users/UserProvider'
import { Button, Modal, ModalBody, ModalHeader } from 'reactstrap'
import PartySpaceForm from './PartySpaceForm'
import { PartySpace } from './PartySpace'

export default ({ searchTerms }) => {
  const { partyspaces } = useContext(PartySpaceContext)
  const { venues } = useContext(VenueContext)
  const { users } = useContext(UserContext)

  const [modal, setModal] = useState(false)
  const toggle = () => setModal(!modal)

  const [filteredPartySpaces, setFiltered] = useState([])

  return (
    <>
      <div className='flexRow'>
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
          className='plusBtn'
        >
          &#65291; {/* <<-- That's the unicode plus symbol +++ */}
        </Button>
      </div>

      <div className='gridSection animals'>
        {partyspaces.map((partyspace) => {
          const matchingVenue = venues.find(
            (ven) => ven.id === partyspace.venueId
          )
          const matchingUser = users.find(
            (user) => user.id === partyspace.userId
          )

          return (
            <PartySpace
              key={partyspaces.id}
              partyspace={partyspace}
              user={matchingUser}
              venue={matchingVenue}
            />
          )
        })}
      </div>

      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Add a PartySpace</ModalHeader>
        <ModalBody>
          <PartySpaceForm toggler={toggle} />
        </ModalBody>
      </Modal>
    </>
  )
}
