import React, { useContext, useState } from 'react'
import { Button, Modal, ModalBody, ModalHeader } from 'reactstrap'
import { PartySpaceContext } from './PartySpaceProvider'
import { UserContext } from '../users/UserProvider'
// import { UserContext } from '../users/UserProvider'
import PartySpaceForm from './PartySpaceForm'
import { PartySpaceComposeItem } from './PartySpaceComposeItem'
import { VenueContext } from '../venues/VenueProvider'
import { VenueList } from '../venues/VenueList'
import './PartySpace.css'
export default () => {
  const userId = parseInt(localStorage.getItem('partySpace_user'))
  const { partyspaces } = useContext(PartySpaceContext)
  const { users } = useContext(UserContext)
  // const { venues } = useContext(VenueContext)

  const [modal, setModal] = useState(false)
  const toggle = () => setModal(!modal)

  // const [filteredPartySpaces, setFiltered] = useState([])

  const singlePartySpace = partyspaces.filter(
    (partyspace) => userId === users.id
  )

  console.log('THIS IS MY SINGLE PARTY SPACE', singlePartySpace)

  // const theVenues = partyspaces.map(
  //   (partyspace) => partyspace.venueId === partyspace.id
  // )

  return (
    <>
      <div className='ps-compose-grid'>
        <div className='partyspaces'>
          {singlePartySpace.map((partyspace) => {
            return (
              <PartySpaceComposeItem
                key={partyspace.userId}
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
        <div className='ps-invites'>
          <section className='ps-people'>
            <div className='flexRowWrap just-space-between align-i-flex-center marBH'>
              <h5>People</h5>
              <button className='ps-button btn btn-secondary'>＋ Invite</button>
            </div>
            <p className='ps-invited'>
              John Smith <span className='exOut'>×</span>
            </p>
            <p className='ps-invited'>
              Samantha Longnamesum <span className='exOut'>×</span>
            </p>
            <p className='ps-invited'>
              Wilfred Gonzales <span className='exOut'>×</span>
            </p>
            <p className='ps-invited'>
              Ron Delan <span className='exOut'>×</span>
            </p>
            <p className='ps-invited'>
              Ekene Obasey <span className='exOut'>×</span>
            </p>
            <p className='ps-invited'>
              Usha Oliver <span className='exOut'>×</span>
            </p>
            <p className='ps-invited'>
              Shirai Subaru <span className='exOut'>×</span>
            </p>
          </section>
        </div>
        <section className='ps-venues'>
          {/* <div className='ps-time'>${time}</div> */}
          {/* map through venues within partyspace x */}
          <button className='btn ps-button ps-blue mar0 marBH'>6:00pm</button>
          <VenueList />
        </section>
      </div>
    </>
  )
}
