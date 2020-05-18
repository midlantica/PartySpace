// ADD NEW PARTYSPACE -- NOT EDIT! (not yet)
import React, { useContext, useRef, useState } from 'react'
import { Button, Modal, ModalBody, ModalHeader } from 'reactstrap'
import { PartySpaceContext } from './PartySpaceProvider'
import { VenueContext } from '../venues/VenueProvider'

export const PartySpaceCreate = (partySpace) => {
  const { addPartySpace } = useContext(PartySpaceContext)
  const { venues } = useContext(VenueContext)
  // const venueId = parseInt(updatedPartySpace.venueId)

  const title = useRef()
  const dateStart = useRef()
  const timeStart = useRef()
  const description = useRef()

  // Separate state variable to track the partySpace as it is edited
  const [updatedPartySpace, setPartySpace] = useState(partySpace)

  const handleControlledInputChange = (event) => {
    // Create a new copy of the partySpace being edited
    const newPartySpace = Object.assign({}, updatedPartySpace)

    // Change the property value on the copy
    newPartySpace[event.target.title] = event.target.value
    newPartySpace[event.target.dateStart] = event.target.value
    newPartySpace[event.target.timeStart] = event.target.value
    newPartySpace[event.target.description] = event.target.value

    // Set the copy as the new state
    setPartySpace(newPartySpace)
  }

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
    // console.log(newPartySpaceObj)
    // and save it to the API.
    addPartySpace(newPartySpaceObj).then(partySpace.toggler)
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
            defaultValue={partySpace.title}
            required
            autoFocus
            className='form-control'
            placeholder='PartySpace title'
            onChange={handleControlledInputChange}
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
            defaultValue={partySpace.dateStart}
            required
            autoFocus
            className='form-control'
            onChange={handleControlledInputChange}
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
            defaultValue={partySpace.timeStart}
            required
            autoFocus
            className='form-control'
            onChange={handleControlledInputChange}
          />
        </div>
      </fieldset>

      <fieldset>
        <div className='form-group'>
          <label htmlFor='description'>Event Description:</label>
          <textarea
            id='description'
            ref={description}
            defaultValue={partySpace.description}
            required
            autoFocus
            className='form-control'
            onChange={handleControlledInputChange}
          />
        </div>
      </fieldset>

      <Button
        type='submit'
        onClick={(e) => {
          e.preventDefault() // Prevent browser from submitting the form
          // create the partySpace function goes here
          constructNewPartySpace()
        }}
        className='btn ps-button float-right mar0'
      >
        Add New PartySpace
      </Button>
    </form>
  )
}
