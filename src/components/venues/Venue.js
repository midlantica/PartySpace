import React from 'react'

export default (props) => (
  <section className='box venue'>
    <h6 className='venue__name'>{props.venue.name}</h6>
    <p className='fs-x-small'>{props.venue.address}</p>
  </section>
)
