import React from 'react'

export default (props) => (
  <section className='box user'>
    <h6 className='user__name'>{props.user.name}</h6>
    <p className='fs-x-small'>{props.user.address}</p>
  </section>
)
