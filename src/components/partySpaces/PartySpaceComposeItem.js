import React, { useContext, useState } from 'react'
import { Button, Modal, ModalBody, ModalHeader } from 'reactstrap'
import { PartySpaceContext } from './PartySpaceProvider'
import { PartySpaceVenuesContext } from './PartySpaceVenuesProvider'
import { PartySpaceEdit } from './PartySpaceEdit'
// import { PartySpaceEdit } from './PartySpaceEdit'
import PartySpaceCompleted from './PartySpaceCompleted'
import { PartySpace } from './PartySpace'
import './PartySpace.css'
export const PartySpaceComposeItem = ({
  partySpace,
  setActiveList,
  setPartySpaceClicked,
}) => {
  const localUserId = parseInt(localStorage.getItem('partySpace_user'))
  const { partySpaces } = useContext(PartySpaceContext)
  // const { venues } = useContext(VenueContext)

  const [modalEditPartySpace, setModalEditPartySpace] = useState(false)
  const editPartySpaceToggle = () =>
    setModalEditPartySpace(!modalEditPartySpace)

  const [modalWoo, setModalWoo] = useState(false)
  const woohoo = () => setModalWoo(!modalWoo)

  return (
    <>
      <section className='box partyspace'>
        <div className='flexRow'>
          <div className='flexRowWrap align-i-flex-center'>
            <button
              className='btn-Edit marLRAuto marBAuto'
              onClick={() => {
                // check if the user is authenticated
                if (localUserId) {
                  // If the user is authenticated, show the PartySpace form
                  editPartySpaceToggle()
                }
              }}
            />
          </div>
          <div className='contentWrap flex-grow-1 marLRH marBQ'>
            <h5>{partySpace.title}</h5>
            <p className='fs-small'>Date: {partySpace.dateStart}</p>
            <p className='fs-small'>Time: {partySpace.timeStart}</p>
            <p className='description fs-small marTQ q'>
              {partySpace.description}
            </p>
          </div>
          <div className='ps-doneBox'>
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
        </div>
      </section>

      <Modal isOpen={modalEditPartySpace}>
        <ModalHeader>Edit PartySpace</ModalHeader>
        <ModalBody>
          <PartySpaceEdit
            toggler={editPartySpaceToggle}
            partySpace={partySpace}
          />
        </ModalBody>
      </Modal>

      <Modal isOpen={modalWoo} woohoo={woohoo}>
        <ModalBody>
          <PartySpaceCompleted toggler={woohoo} />
        </ModalBody>
      </Modal>
    </>
  )
}
