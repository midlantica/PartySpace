import React, { useContext, useState, useEffect } from 'react'
import { PartySpaceContext } from './PartySpaceProvider'
import { UserContext } from '../users/UserProvider'
import { Button, Modal, ModalBody, ModalHeader } from 'reactstrap'
import PartySpaceForm from './PartySpaceForm'
import { PartySpaceComposeItem } from './PartySpaceComposeItem'
import { VenueList } from '../venues/VenueList'

export default () => {
  const userId = parseInt(localStorage.getItem('partySpace_user'))
  const { partyspaces } = useContext(PartySpaceContext)
  const { users } = useContext(UserContext)

  const [modal, setModal] = useState(false)
  const toggle = () => setModal(!modal)

  // const [filteredPartySpaces, setFiltered] = useState([])

  const singlePartySpace = partyspaces.filter(
    (partyspace) => userId === partyspace.Id
  )

  return (
    <>
      <div className='partyspaces'>
        {singlePartySpace.map((partyspace) => {
          return (
            <PartySpaceComposeItem
              key={partyspace.id}
              partyspace={partyspace}
            />
          )
        })}
        <Modal isOpen={modal} toggle={toggle}>
          <ModalHeader toggle={toggle}>PartySpace</ModalHeader>
          <ModalBody>
            <PartySpaceForm toggler={toggle} />
          </ModalBody>
        </Modal>
      </div>

      <div className='ps-compose-grid'>
        <section className='ps-people'>
          <h6>People</h6>
          <p>Peoplesss</p>
        </section>
        <section className='ps-venues'>
          {/* <div className='ps-time'>${time}</div> */}
          {/* map through venues within partyspace x */}
          <VenueList />
        </section>
      </div>
    </>
  )
}
