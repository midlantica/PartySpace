import React, { useContext, useRef } from 'react'
import { PartySpaceContext } from './PartySpaceProvider'
import { Button, Modal, ModalBody, ModalHeader } from 'reactstrap'

export default (props) => {
  const { addPartySpace } = useContext(PartySpaceContext)

  const title = useRef()
  const dateStart = useRef()
  const timeStart = useRef()
  const description = useRef()

  const constructNewPartySpace = () => {
    const userId = parseInt(localStorage.getItem('partySpace_user'))
    // create a new partySpace object
    // Make sure that the partySpace object has the userId and venueId foreign keys on it.
    const newPartySpaceObj = {
      title: title.current.value,
      dateStart: dateStart.current.value,
      timeStart: timeStart.current.value,
      description: description.current.value,
      userId: userId,
    }
    console.log(newPartySpaceObj)
    // and save it to the API.
    addPartySpace(newPartySpaceObj).then(props.toggler)
  }

  const destroyNewPartySpace = () => {
    console.log('destroy!!!!!!')
  }

  return (
    <form className='partySpaceCompleteForm'>
      <h1>PartySpace completed!</h1>
      <p>John's Birthday Bash</p>
      <p>invites are on their way</p>
      <p>Have a great party!</p>

      <Button
        type='submit'
        onClick={(e) => {
          e.preventDefault() // Prevent browser from submitting the form
          // create the partySpace function goes here
          constructNewPartySpace()
        }}
        className='btn ps-button float-right mar0'
      >
        Woohoo!
      </Button>
    </form>
  )
}
