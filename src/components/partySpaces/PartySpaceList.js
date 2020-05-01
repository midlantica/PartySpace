import React, { useContext, useState, useEffect } from 'react'
import { PartySpaceContext } from './PartySpaceProvider'
import { UserContext } from '../users/UserProvider'
import { Button, Modal, ModalBody, ModalHeader } from 'reactstrap'
import PartySpaceForm from './PartySpaceForm'
import { PartySpace } from './PartySpace'
import PartySpaceCompose from './PartySpaceCompose'
import Dashboard from '../Dashboard'
import { PartySpaceProvider } from './PartySpaceProvider'
import { PeopleProvider } from '../people/PeopleProvider'
import { VenueProvider } from '../venues/VenueProvider'
import { UserProvider } from '../users/UserProvider'

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

  // ######################

  const [activeList, setActiveList] = useState('PartySpaceCompose')
  const [components, setComponents] = useState()

  // HIGHER ORDER FUNCTION. IT RETURNS OTHER FUNCTION (i.e. COMPONENTS)
  const showPartySpaceCompose = () => (
    <PartySpaceProvider>
      <UserProvider>
        <PeopleProvider>
          <VenueProvider>
            <PartySpaceCompose />
          </VenueProvider>
        </PeopleProvider>
      </UserProvider>
    </PartySpaceProvider>
  )

  const showDashboard = () => (
    <PartySpaceProvider>
      <UserProvider>
        <PeopleProvider>
          <VenueProvider>
            <Dashboard />
          </VenueProvider>
        </PeopleProvider>
      </UserProvider>
    </PartySpaceProvider>
  )

  /*
    This effect hook determines which list is shown
    based on the state of the `activeList` variable.
  */
  useEffect(() => {
    if (activeList === 'Dashboard') {
      setComponents(showDashboard)
    } else if (activeList === 'PartySpaceCompose') {
      setComponents(showPartySpaceCompose)
    }
  }, [activeList])

  // ######################

  return (
    <>
      <div className='flexRowWrap just-space-between marBQ'>
        {/* ///////////////// */}
        <div
          className='fakeLink href'
          onClick={() => setActiveList('PartySpaceCompose')}
        >
          PartySpace Compose
        </div>
        {/* ///////////////// */}

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
          return <PartySpace key={partyspace.id} partyspace={partyspace} />
        })}
      </div>

      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Add PartySpace</ModalHeader>
        <ModalBody>
          <PartySpaceForm toggler={toggle} />
        </ModalBody>
      </Modal>

      <div>{components}</div>
    </>
  )
}
