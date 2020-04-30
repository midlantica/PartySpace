import React from 'react'

export const PartySpace = ({ partySpace, venue, user }) => (
  <section className='box partySpace flexColumn'>
    <div className='topFlexBox'>
      <h6 className='partySpace__name'>{partySpace.name}</h6>
      <p className='fs-small'>{partySpace.breed}</p>
      <p className='fs-x-small'>User: {user.name}</p>
      <p className='fs-x-small'>Venue: {venue.name}</p>
    </div>
  </section>
)
