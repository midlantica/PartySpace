import React from 'react'

export default (props) => (
  <section className='box customer'>
    <h6 className='customer__name'>{props.customer.name}</h6>
    <p className='fs-x-small'>{props.customer.address}</p>
  </section>
)
