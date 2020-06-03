import React, { useContext, useRef } from 'react'
import { PartySpaceContext } from './PartySpaceProvider'
import { Button } from 'reactstrap'

export default (props) => {
  const { PartySpaceComplete } = useContext(PartySpaceContext)

  const title = useRef()
  const dateStart = useRef()
  const timeStart = useRef()
  const description = useRef()

  const partySpaceCompleted = () => {
    const userId = parseInt(localStorage.getItem('partySpace_user'))
    // create a new partySpace object
    // Make sure that the partySpace object has the userId and venueId foreign keys on it.
    const PartySpaceCompleteObj = {
      title: title.current.value,
      dateStart: dateStart.current.value,
      timeStart: timeStart.current.value,
      description: description.current.value,
      userId: userId,
      isComplete: true,
    }
    console.log(PartySpaceCompleteObj)
    console.log('Invites Sent!')
    // and save it to the API.
    PartySpaceComplete(PartySpaceCompleteObj).then(props.toggler)
  }

  // const destroyNewPartySpace = () => {
  //   console.log('destroy!!!!!!')
  // }

  return (
    <form className='partySpaceForm ps-woohoo-bg text-center'>
      {/* <h3 className='text-center'>PartySpace completed!</h3> */}
      <p className='marT1 fs-large text-center'>
        Invites are on their way! Have a great party!
      </p>

      <Button
        type='submit'
        onClick={(e) => {
          e.preventDefault() // Prevent browser from submitting the form
          // create the partySpace function goes here
          partySpaceCompleted()
        }}
        className='btn ps-button ps-blue marLRAuto text-center marT2 marB3'
      >
        Woohoo!
      </Button>
    </form>
  )
}
