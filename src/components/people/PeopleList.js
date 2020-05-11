import React, { useContext, useState } from 'react'
import { PeopleContext } from './PeopleProvider'
import { PartySpaceContext } from '../partySpaces/PartySpaceProvider'
import { PartySpaceVenuesContext } from '../partySpaces/PartySpaceVenuesProvider'

export default ({ partySpace, setActiveList, PartySpaceClicked }) => {
  const localUserId = parseInt(localStorage.getItem('partySpace_user'))
  const { partySpaces } = useContext(PartySpaceContext)
  const { peoples } = useContext(PeopleContext)
  const { removePeople } = useContext(PeopleContext)
  const { partySpaceVenues } = useContext(PartySpaceVenuesContext)
  // debugger
  // const [modal, setModal] = useState(false)
  // const toggle = () => setModal(!modal)

  // const partySpacePerson = peoples.filter((peoples) => peoples.id === partySpaceId)

  console.log(peoples)

  const partySpacePeople = peoples.filter(
    (x) => PartySpaceClicked === x.partySpaceId
  )

  // const removePeople = partySpaceVenues.map(
  //   (venues) => singlePartySpace === partySpaceVenues.id
  // )

  return partySpacePeople.map((p) => {
    return (
      <>
        <p className='ps-invited'>
          {p.name}
          <span
            className='exOut'
            onClick={() => {
              // check if the user is authenticated
              if (localUserId) {
                // If the user is authenticated, show the PartySpace form
                // removePeople(peoples.id)
              }
            }}
          >
            ×
          </span>
        </p>
      </>
    )
  })
}
