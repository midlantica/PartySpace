import React, { useContext, useState } from 'react'
import { Button, Modal, ModalBody, ModalHeader } from 'reactstrap'

import { PartySpaceContext } from './PartySpaceProvider'
import { PartySpaceCreate } from './PartySpaceCreate'
import { PartySpace } from './PartySpace'

export default ({ setActiveList, setPartySpaceClicked }) => {
  const localUserId = parseInt(localStorage.getItem('partySpace_user'))
  const { partySpaces } = useContext(PartySpaceContext)
  const [modal, setModal] = useState(false)
  const addPartySpace = () => setModal(!modal)

  const matchingPartySpaces = partySpaces.filter(
    (MaPartySpace) => MaPartySpace.userId === localUserId
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
              addPartySpace()
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
              setActiveList={setActiveList}
              setPartySpaceClicked={setPartySpaceClicked}
            />
          )
        })}
      </div>

      <Modal isOpen={modal} addPartySpace={addPartySpace}>
        <ModalHeader toggle={addPartySpace}>Add PartySpace</ModalHeader>
        <ModalBody>
          <PartySpaceCreate toggler={addPartySpace} />
        </ModalBody>
      </Modal>
    </>
  )
}
