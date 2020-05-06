import React, { useContext, useState } from 'react'
import { Modal, ModalBody, ModalHeader } from 'reactstrap'
import { PartySpaceContext } from './PartySpaceProvider'
import { PartySpaceVenuesContext } from './PartySpaceVenuesProvider'
// import { UserContext } from '../users/UserProvider'
import PartySpaceForm from './PartySpaceForm'
import { PartySpaceComposeItem } from './PartySpaceComposeItem'
import { VenueContext } from '../venues/VenueProvider'
import { VenueList } from '../venues/VenueList'
import './PartySpace.css'
export default ({ setActiveList, PartySpaceClicked }) => {
  const localUserId = parseInt(localStorage.getItem('partySpace_user'))
  const { partySpaces } = useContext(PartySpaceContext)
  const { partySpaceVenues } = useContext(PartySpaceVenuesContext)
  const { venues } = useContext(VenueContext)
  // const { users } = useContext(UserContext)

  const [modal, setModal] = useState(false)
  const toggle = () => setModal(!modal)

  const singlePartySpace = partySpaces.find(
    (partySpace) => partySpace.id === PartySpaceClicked
  )

  return (
    <>
      <div className='ps-compose-grid'>
        <div className='partyspaces'>
          <PartySpaceComposeItem
            key={singlePartySpace.id}
            partySpace={singlePartySpace}
            venues={venues}
            setActiveList={setActiveList}
            PartySpaceClicked={PartySpaceClicked}
          />

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
          {/* map through venues within partySpace x */}
          <div className='flexRowWrap align-i-flex-center marBH'>
            <button className='btn ps-button ps-blue mar0'>6:00pm</button>
            <h5 className='inline-block marLH'>Venues</h5>
          </div>
          <VenueList
            key={partySpaceVenues.id}
            partySpace={partySpaceVenues}
            venues={venues}
            setActiveList={setActiveList}
            PartySpaceClicked={PartySpaceClicked}
          />
        </section>
      </div>
    </>
  )
}
