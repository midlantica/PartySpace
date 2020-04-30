import React, { useContext, useState, useEffect } from 'react'
import { PartySpaceContext } from './PartySpaceProvider'
import { UserContext } from '../users/UserProvider'
import { Button, Modal, ModalBody, ModalHeader } from 'reactstrap'
import PartySpaceForm from './PartySpaceForm'
import { PartySpace } from './PartySpace'

export default () => {
  const userId = parseInt(localStorage.getItem('partySpace_user'))
  const { partyspaces } = useContext(PartySpaceContext)
  const { users } = useContext(UserContext)

  const [modal, setModal] = useState(false)
  const toggle = () => setModal(!modal)

  // const [filteredPartySpaces, setFiltered] = useState([])

  const matchingPartySpaces = partyspaces.filter(
    (partyspace) => userId === partyspace.userId
  )

  return (
    <>
      <div className='flexRowWrap just-space-between marBQ'>
        <h4 className='marRH'>${userId} PartySpaces</h4>
      </div>

      <div className='partyspaces'>
        {matchingPartySpaces.map((partyspace) => {
          return <PartySpace key={partyspace.id} partyspace={partyspace} />
        })}
        <Modal isOpen={modal} toggle={toggle}>
          <ModalHeader toggle={toggle}>Add PartySpace</ModalHeader>
          <ModalBody>
            <PartySpaceForm toggler={toggle} />
          </ModalBody>
        </Modal>
      </div>

      <div className='ps-compose-grid'>
        <section class='ps-people'>
          <h3>People</h3>
          <p>Peoplesss</p>
        </section>
        <section class='ps-venues'>
          <div class='ps-time'>${time}</div>
          {/* map through venues within partyspace x */}
          <Venue />
        </section>
      </div>
    </>
  )
}
