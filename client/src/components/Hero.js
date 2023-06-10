import React from 'react'
import mapping from './mapping'
import Card from 'react-bootstrap/Card'
import Images from './image'

function Hero() {
  return (
    <div>
    <div className='d-flex' style={{justifyContent:'space-around', alignItems:'center', margin:'80px'}} >
    {mapping.atas.map((card,index) => (
      <Card style={{ width: '250px', height: '350px'}} key={index}>
      <Card.Img style={{width:'70px', height:'70px', margin:'53px auto 24px', marginTop:'53px'}} variant="top" src={card.Image}/>
      <Card.Body>
        <Card.Title>{card.title}</Card.Title>
        <Card.Text style={{marginTop:'9px'}}>
          {card.description}
        </Card.Text>
      </Card.Body>
    </Card>))}
    </div>
    <h1>Group Tour</h1>
    </div>
  )
}

export default Hero