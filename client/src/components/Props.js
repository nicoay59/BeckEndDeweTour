
import React from 'react'
import {Card} from 'react-bootstrap'



        // <Props image={gurantee} title="ini title dummy" description="ini juga desc dummy pak" />
        // <Props image={heart} title="ini title dummy" description="ini juga desc dummy pak" />
        // <Props image={agent} title="ini title dummy" description="ini juga desc dummy pak" />
        // <Props image={support} title="ini title dummy" description="ini juga desc dummy pak" />



function Props(card) {
  const {image, title, description} = card
  return (
    <div className='d-flex' style={{justifyContent:'space-around', alignItems:'center', margin:'80px'}} >
      <Card style={{ width: '250px', height: '350px'}}>
      <Card.Img style={{width:'70px', height:'70px', margin:'53px auto 24px', marginTop:'53px'}} variant="top" src={image}/>
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text style={{marginTop:'9px'}}>
          {description}
        </Card.Text>
      </Card.Body>
    </Card>
    </div>
  )
}



export default Props;