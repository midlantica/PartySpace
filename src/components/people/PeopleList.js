import React, { useContext, useState } from 'react'
import { PeopleContext } from './PeopleProvider'
import { PartySpaceContext } from '../partySpaces/PartySpaceProvider'
export default ({ partySpace, setActiveList, PartySpaceClicked }) => {
  const localUserId = parseInt(localStorage.getItem('partySpace_user'))
  const { partySpaces } = useContext(PartySpaceContext)
  const { peoples } = useContext(PeopleContext)

  const [modal, setModal] = useState(false)
  const toggle = () => setModal(!modal)

  // const singlePartySpace = partySpaces.find(
  //   (partySpace) => PartySpaceClicked === partySpace.id
  // )

  // const findPartySpaceVenues = partySpaceVenues.map(
  //   (venues) => singlePartySpace === partySpaceVenues.id
  // )

  return (
    <>
      <p className='ps-invited'>
        Drew Kirkland
        <span
          className='exOut'
          onClick={() => {
            // check if the user is authenticated
            if (localUserId) {
              // If the user is authenticated, show the PartySpace form
              toggle()
            }
          }}
        >
          ×
        </span>
      </p>
    </>
  )
}
