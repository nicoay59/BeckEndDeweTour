import React from 'react'
import CardBody from '../components/Body'
import { Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import CardBodyAdmin from '../components/Body copy'

function IncomeTrip() {
  return (
    <div style={{backgroundColor:'#E5E5E5'}}>
        <Container className='d-flex justify-content-end col-md-10 pt-5'>
            <Link to="/addtrip">
            <button className='btn btn-warning text-white'>
                Add Trip
            </button>
            </Link>
        </Container>
        <CardBodyAdmin />
    </div>
  )
}

export default IncomeTrip