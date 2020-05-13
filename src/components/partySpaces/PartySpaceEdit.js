// EDIT EXISTING PARTYSPACE -- NOT CREATE NEW! (not yet)
//
import React, { useContext, useRef, useState } from 'react'
// import { Button, Modal, ModalBody, ModalHeader } from 'reactstrap'
import { PartySpaceContext } from './PartySpaceProvider'
import { VenueContext } from '../venues/VenueProvider'

export const PartySpaceEdit = ({ partySpace, toggler }) => {
  const localUserId = parseInt(localStorage.getItem('partySpace_user'))
  const { venues } = useContext(VenueContext)
  const { updatePartySpace } = useContext(PartySpaceContext)

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
    newPartySpace[event.target.name] = event.target.value

    // Set the copy as the new state
    setPartySpace(newPartySpace)
  }

  const editPartySpace = () => {
    const partySpaceId = parseInt(updatedPartySpace.partySpaceId)
    // debugger
    if (partySpaceId === 0) {
      window.alert('Please select a venue')
    } else {
      updatePartySpace({
        id: updatedPartySpace.id,
        title: updatedPartySpace.title,
        dateStart: updatedPartySpace.dateStart,
        timeStart: updatedPartySpace.timeStart,
        description: updatedPartySpace.description,
        isComplete: updatedPartySpace.isComplete,
        userId: updatedPartySpace.userId,
      }).then(toggler)
    }
  }

  return (
    <form className='partyspaceForm'>
      {/* FLEX IT */}
      <div className='flexRow just-space-between marBH'>
        {/* COLUMN 1 */}
        <div className='w45'>
          <fieldset>
            <div className='form-group'>
              <label htmlFor='title'>Title of Event:</label>
              <input
                type='text'
                name='title'
                required
                autoFocus
                className='form-control'
                placeholder='PartySpace title'
                ref={title}
                defaultValue={partySpace.title}
                onChange={handleControlledInputChange}
              />
            </div>
          </fieldset>

          <fieldset>
            <div className='form-group'>
              <label htmlFor='dateStart'>Start Date:</label>
              <input
                type='date'
                name='dateStart'
                required
                className='form-control'
                placeholder='PartySpace dateStart'
                ref={dateStart}
                defaultValue={partySpace.dateStart}
                onChange={handleControlledInputChange}
              />
            </div>
          </fieldset>
          <fieldset>
            <div className='form-group'>
              <label htmlFor='timeStart'>Start Time:</label>
              <input
                type='time'
                name='timeStart'
                required
                className='form-control'
                placeholder='PartySpace timeStart'
                defaultValue={partySpace.timeStart}
                ref={timeStart}
                onChange={handleControlledInputChange}
              />
            </div>
          </fieldset>
        </div>

        {/* COLUMN 2 */}
        <div className='w45'>
          <fieldset>
            <div className='form-group'>
              <label htmlFor='description'>Description:</label>
              <textarea
                type='textarea'
                rows='9'
                name='description'
                required
                className='form-control'
                placeholder='PartySpace description'
                defaultValue={partySpace.description}
                ref={description}
                onChange={handleControlledInputChange}
              />
            </div>
          </fieldset>
        </div>
      </div>

      <div className='flexRow just-space-between'>
        <button
          type='Delete'
          className='btn ps-button float-right mar0 ps-gray'
          onClick={(evt) => {
            evt.preventDefault()
            // deletePartySpace()
          }}
        >
          Delete PartySpace
        </button>

        <button
          type='submit'
          className='btn ps-button float-right mar0'
          onClick={(evt) => {
            evt.preventDefault()
            editPartySpace()
          }}
        >
          Save PartySpace
        </button>
      </div>
    </form>
  )
}
