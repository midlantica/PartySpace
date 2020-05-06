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
      venueIds,
    }
    console.log(newPartySpaceObj)
    // and save it to the API.
    addPartySpace(newPartySpaceObj).then(props.toggler)
  }

  const destroyNewPartySpace = () => {
    console.log('destroy!!!!!!')
  }

  return (
    <form className='partySpaceForm'>
      <fieldset>
        <div className='form-group'>
          <label htmlFor='partySpaceTitle'>PartySpace Title:</label>
          <input
            type='text'
            id='partySpaceTitle'
            ref={title}
            required
            autoFocus
            className='form-control'
            placeholder='PartySpace title'
          />
        </div>
      </fieldset>

      <fieldset>
        <div className='form-group'>
          <label htmlFor='dateStart'>Date:</label>
          <input
            type='date'
            id='dateStart'
            ref={dateStart}
            required
            autoFocus
            className='form-control'
          />
        </div>
      </fieldset>

      <fieldset>
        <div className='form-group'>
          <label htmlFor='timeStart'>Start Time:</label>
          <input
            type='time'
            id='timeStart'
            ref={timeStart}
            required
            autoFocus
            className='form-control'
          />
        </div>
      </fieldset>

      <fieldset>
        <div className='form-group'>
          <label htmlFor='description'>Event Description:</label>
          <textarea
            id='description'
            ref={description}
            required
            autoFocus
            className='form-control'
          />
        </div>
      </fieldset>

      <Button
        type='submit'
        onClick={(e) => {
          e.preventDefault() // Prevent browser from submitting the form
          // create the partySpace function goes here
          destroyNewPartySpace()
        }}
        className='btn ps-button bg-danger mar0 marR1'
        disabled
      >
        Delete
      </Button>

      <Button
        type='submit'
        onClick={(e) => {
          e.preventDefault() // Prevent browser from submitting the form
          // create the partySpace function goes here
          constructNewPartySpace()
        }}
        className='btn ps-button float-right mar0'
      >
        Add PartySpace
      </Button>
    </form>
  )
}
