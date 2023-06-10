import React from 'react'
import CardProfil from '../components/CardProfil'
import CardPayment from '../components/Payment'
import { Container } from 'react-bootstrap'
import CardPaymentHistory from '../components/CardHistory'

function Profile() {
  return (
    <div>
        <CardProfil />

        <h1 className='text-start ' style={{marginLeft:'9%', marginTop:'80px'}}>
            History Trip
        </h1>
        <CardPaymentHistory />

    </div>
  )
}

export default Profile