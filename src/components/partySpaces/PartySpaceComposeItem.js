import React, { useState } from 'react'
import { Modal, ModalBody, ModalHeader } from 'reactstrap'
// import { PartySpaceContext } from './PartySpaceProvider'
// import { PartySpaceVenuesContext } from './PartySpaceVenuesProvider'
import { PartySpaceEdit } from './PartySpaceEdit'
// import { PartySpaceEdit } from './PartySpaceEdit'
import PartySpaceCompleted from './PartySpaceCompleted'
// import { PartySpace } from './PartySpace'
// import '../_time'

import './PartySpace.css'
export const PartySpaceComposeItem = ({
  partySpace,
  setActiveList,
  setPartySpaceClicked,
}) => {
  const localUserId = parseInt(localStorage.getItem('partySpace_user'))
  // const { partySpaces } = useContext(PartySpaceContext)
  // const { venues } = useContext(VenueContext)

  const [modalEditPartySpace, setModalEditPartySpace] = useState(false)
  const editPartySpaceToggle = () =>
    setModalEditPartySpace(!modalEditPartySpace)

  const [modalWoo, setModalWoo] = useState(false)
  const woohoo = () => setModalWoo(!modalWoo)

  return (
    <>
      <section className='box partyspace'>
        <div className='ps-edit'>
          <button
            className='btn-Edit marBAuto'
            onClick={() => {
              // check if the user is authenticated
              if (localUserId) {
                // If the user is authenticated, show the PartySpace form
                editPartySpaceToggle()
              }
            }}
          />
        </div>
        <div className='ps-contentWrap marBQ padRH'>
          <h5>{partySpace.title}</h5>
          <p>Date: {partySpace.dateStart}</p>
          <p>Time: {partySpace.timeStart}</p>
          <p className='description fs-small'>{partySpace.description}</p>
        </div>
        <div className='ps-doneBox marBQ'>
          <p>When you're done click this button</p>
          <button
            className='btn ps-button ps-blue'
            onClick={() => {
              // check if the user is authenticated
              if (localUserId) {
                // If the user is authenticated, show the PartySpace form
                woohoo()
              }
            }}
          >
            PartySpace Complete!
          </button>
        </div>
      </section>

      <Modal isOpen={modalEditPartySpace}>
        <ModalHeader toggle={editPartySpaceToggle}>Edit PartySpace</ModalHeader>
        <ModalBody>
          <PartySpaceEdit
            toggler={editPartySpaceToggle}
            partySpace={partySpace}
          />
        </ModalBody>
      </Modal>

      <Modal isOpen={modalWoo} woohoo={woohoo}>
        <ModalHeader toggle={woohoo}>PartySpace completed!</ModalHeader>
        {/* <ModalHeader toggle={woohoo}>PartySpace Complete</ModalHeader> */}
        <ModalBody>
          <PartySpaceCompleted toggler={woohoo} />
        </ModalBody>
      </Modal>
    </>
  )
}
