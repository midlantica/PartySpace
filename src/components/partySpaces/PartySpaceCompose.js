import React, { useContext, useState } from 'react'
import { Button, Modal, ModalBody, ModalHeader } from 'reactstrap'
import { PartySpaceContext } from './PartySpaceProvider'
// import { UserContext } from '../users/UserProvider'
import PartySpaceForm from './PartySpaceForm'
import { PartySpaceComposeItem } from './PartySpaceComposeItem'
import { VenueList } from '../venues/VenueList'
import './PartySpace.css'
export default () => {
  const userId = parseInt(localStorage.getItem('partySpace_user'))
  const { partyspaces } = useContext(PartySpaceContext)
  // const { users } = useContext(UserContext)

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
          <div className='flexRowWrap just-space-between marBH'>
            <h5>People</h5>
            <button className='ps-button btn btn-secondary'>Invite</button>
          </div>
          <p className='ps-invited'>
            John Smith <span className='xOut'>×</span>
          </p>
          <p className='ps-invited'>
            Samantha Longnamesum <span className='xOut'>×</span>
          </p>
          <p className='ps-invited'>
            Wilfred Gonzales <span className='xOut'>×</span>
          </p>
          <p className='ps-invited'>
            Ron Delan <span className='xOut'>×</span>
          </p>
          <p className='ps-invited'>
            Ekene Obasey <span className='xOut'>×</span>
          </p>
          <p className='ps-invited'>
            Usha Oliver <span className='xOut'>×</span>
          </p>
          <p className='ps-invited'>
            Shirai Subaru <span className='xOut'>×</span>
          </p>
        </section>
        <section className='btn ps-venues'>
          {/* <div className='ps-time'>${time}</div> */}
          {/* map through venues within partyspace x */}
          <VenueList />
        </section>
      </div>
    </>
  )
}
