import React, { useState } from 'react'
import mapping from './mapping'
import Card from 'react-bootstrap/Card'
import Images from './image'
import { Link, useParams } from 'react-router-dom'
import item from './mapping'
import { API } from "../config/api";
import { useQuery } from "react-query";



function CardBody(props) {

  const rupiah = (number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(number);
  };
  
  const [trips, setTrips] = useState();
  const { data : trip } = useQuery('tripsCache', async () => {
    const response = await API.get('/trips');
    setTrips(response.data.data)
    return response.data.data;
  });



  

    
 console.log(trips, "ini tirps");
  
  console.log(trip, "ini tirp");
  return (
    <div>
    {/* <div className='d-flex' style={{justifyContent:'space-around', alignItems:'center', margin:'80px'}} >
    {mapping.atas.map((card,index) => (
      <Card style={{ width: '250px', height: '350px'}}>
      <Card.Img style={{width:'70px', height:'70px', margin:'53px auto 24px', marginTop:'53px'}} variant="top" src={card.Image}/>
      <Card.Body>
        <Card.Title>{card.title}</Card.Title>
        <Card.Text style={{marginTop:'9px'}}>
          {card.description}
        </Card.Text>
      </Card.Body>
    </Card>))}
    </div> */}
    <div

    className='d-grid' style={{justifyContent:'space-around', alignItems:'center', margin:'80px', gridTemplateColumns:'auto auto auto'}}>
      {trips?.filter((knt) => {
        if (props.search === ""){
          return knt
        } else if(knt?.country?.country_name?.toLowerCase().includes(props?.search?.toLowerCase())){
          return knt
        } else if(knt?.title?.toLowerCase().includes(props?.search?.toLowerCase()))
        return knt
        }
        
        ).map((card,index) => (
            <div className="card position-relative" style={{width: '350px', height:'350px', marginTop:'50px'}} key={index}>
                <div className="card-body" style={{padding:'0', paddingTop:'10px'}}>
                  <img style={{alignContent:'center', width:'100%', maxWidth:'328px', height:'100%', maxHeight:'241px'}} alt='body' src={card?.image} />
                  <h5 className="card-title pt-2 ps-3" style={{textAlign:'start'}}><Link to={`/detail-tour/${card.id}`} style={{textDecoration:'none', color:'black'}}>{card.title}</Link> </h5>
                  <div style={{display:'flex', flexDirection:'row', justifyContent:'space-between', padding:'10px'}}>
                  <h6 className="card-subtitle mb-2 text-warning" style={{fontWeight:'bold'}}> {rupiah(card.price)} </h6>
                  <h6 className="card-subtitle mb-2 text-muted">{card?.country?.country_name}</h6>
                  </div>
                </div>
                <p className="bg-light position-absolute end-0 rounded-left" style={{top:"30px", padding:'3px 10px', borderRadius:'3px'}}>{card.quota}
                </p>
              </div>
            ))}      
    </div>
    </div>
  )
}

export default CardBody