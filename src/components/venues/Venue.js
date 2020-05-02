import React from 'react'

export default (props) => (
  <section className='box venue'>
    <h6 className='venue__name'>{props.venue.name}</h6>
    <p className='fs-x-small'>{props.venue.duration}hrs</p>
    <p className='fs-x-small'>{props.venue.geourl}</p>
  </section>
)
