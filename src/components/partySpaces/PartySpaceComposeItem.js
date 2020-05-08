import React, { useContext, useState } from 'react'
import { Button, Modal, ModalBody, ModalHeader } from 'reactstrap'
import { PartySpaceContext } from './PartySpaceProvider'
import { PartySpaceVenuesContext } from './PartySpaceVenuesProvider'
import PartySpaceForm from './PartySpaceForm'
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

  const [modal, setModal] = useState(false)
  const toggle = () => setModal(!modal)

  const [modalWoo, setModalWoo] = useState(false)
  const woohoo = () => setModalWoo(!modalWoo)

  // const matchingPartySpaces = partySpaces.filter(
  //   (partySpace) => partySpace.userId === localUserId
  // )

  return (
    <>
      <section className='box partyspace'>
        <div className='flexRowWrap'>
          <div className='flexRow'>
            <div className='flexRowWrap align-i-flex-center'>
              <button
                className='btn-Edit marLRAuto marBAuto'
                onClick={() => {
                  // check if the user is authenticated
                  if (localUserId) {
                    // If the user is authenticated, show the PartySpace form
                    toggle()
                  }
                }}
              />
            </div>
            <div className='contentWrap marLRH marBQ'>
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
        </div>
      </section>

      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Edit PartySpace</ModalHeader>
        <ModalBody>
          <PartySpaceForm toggler={toggle} />
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
