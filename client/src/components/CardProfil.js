import React, { useContext, useEffect } from 'react'
import CardPayment from './Payment'
import { Container } from 'react-bootstrap'
import prof from './assets/image/Avatar.png'
import names from './assets/image/name.png'
import office from './assets/image/local_post_office.png'
import phone from './assets/image/local_phone.png'
import place from './assets/image/place.png'
import { UserContext } from '../context/userContext'
import { useQuery } from 'react-query';
import { API } from '../config/api';



function CardProfil() {

    const title = 'Profile';
    document.title = 'DumbMerch | ' + title;
  
    const [state, dispatch] = useContext(UserContext);

    let profile = state?.user

    console.log(profile, "ini isi profile");

  
    // let { data: profile } = useQuery('profileCache', async () => {
    //   const response = await API.get('/users');
    //   return response.data.data;
    // });


    // console.log(profile, "ini isi profile");
  


    // useEffect(()=>{
    //     dispatch({
    //         type:"USER_TRANSACTION",
    //         payload: transactions,
    //     })
    // },[])

    // console.log(state);



    // console.log(state, 'ini log state');

    // const { data: profiles } = useQuery('profilesCache', async () => {
    //     const response = await API.get('/users')
    //     return response.data.data
    //     })
    //   console.log(profiles);

  return (
    <div style={{backgroundColor:'#E5E5E5'}}  className='pt-5'>
    <div style={{backgroundColor:'#E5E5E5'}}>
        <Container className='bg-white d-flex justify-content-between p-3 container bg-light border col-md-8'>
            <div>
                <div style={{textAlign:'start'}}>
                <h1>
                    Personal Info
                </h1>
                </div>
                <div style={{textAlign:'start'}}>
                    <div className='p-3'>
                        <img src={names} className='pe-3'></img> {state?.user.fullname}
                    </div>
                    <div className='p-3'>
                    <img src={office} className='pe-3'></img> {state?.user.email}
                    </div>
                    <div className='p-3'>
                    <img src={phone} className='pe-3'></img>{state?.user.phone}
                    </div>
                    <div className='p-3'>
                    <img src={place} className='pe-3'></img>{state?.user.address}
                    </div>
                </div>
            </div>
            <div className='col-md-5'>
                <img src={prof} className='w-100'>
                </img>
                <button type="button" className="btn btn-warning w-100  mt-3 text-white">Change Photo Profile</button>
            </div>
        </Container>
    </div> 
    </div>
  )
}

export default CardProfil