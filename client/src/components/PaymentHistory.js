import React from 'react'
import icon from '../components/assets/image/Icon-payment.png'
import payment from '../components/assets/image/payment.png'
import { useParams } from 'react-router-dom'

function CardPayment() {

    const {puantiti, price} = useParams();

  return (
    <div style={{backgroundColor:'#E5E5E5'}}>
        <div className='pt-5' style={{backgroundColor:'#E5E5E5', height:'80vh'}}>
        <div className='container bg-light border col-md-10'>
            <div className='container d-flex justify-content-between fs-3'>
                <div><img src={icon}></img></div>
                <div className='fw-bold'>BOOKING
                    <p className='fs-6'>
                        Saturday, 22 July 2022
                    </p>
                </div>
            </div>
            <div className='container d-flex justify-content-between text-start'>
            <div className='p-2 flex-fill'>
                6D/4N  Fun Tassie Vacation
                <p>
                    Australia
                </p>
                <p>
                    Waiting Payment
                </p>
            </div>
            <div className='p-2 flex-fill'>
                Date Trip
                <p>
                    26 Agustus 2022
                </p>
                <p>
                    Acomodation
                </p>
                <p>
                    Hotel 4 Nights
                </p>
            </div>
            <div className='p-2 flex-fill'>
                Duration
                <p>
                    6 Day 4 Nights
                </p>
                <p>
                    Transportation
                </p>
                <p>
                    Qatar Airways
                </p>
            </div>
            <div className='p-2' style={{display:'flex-end' }}>
                <img src={payment}></img>
                <p>
                    upload payment proof
                </p>
            </div>
            </div>

            <div className='container d-flex justify-content-between text-start'>
                <div className=' flex-fill'>
                    No
                    <p className='pt-3'>
                        1
                    </p>
                    <hr/>
                </div>
                <div className=' flex-fill'>
                    Full Name
                    <p className='pt-3'>
                        Radif Ganteng
                    </p>
                    <hr/>
                </div>
                <div className=' flex-fill'>
                    Gender
                    <p className='pt-3'>
                        Male
                    </p>
                    <hr/>
                </div>
                <div className=' flex-fill'>
                    Phone
                    <p className='pt-3'>
                        081232122321
                    </p>
                    <hr/>
                </div>
                <div className=' flex-fill'>
                    <p className='pb-3'>
                        
                    </p>
                    <p className='pt-2'>
                        Qty 
                    </p>
                    <hr/>   
                    <p>
                        Total
                    </p>
                </div>
                <div className=''>
                    <p className='pb-3'>
                        
                    </p>
                    <p className='pt-2'>
                        : {puantiti}
                    </p>
                    <hr/>
                    <p>
                        : IDR. {(price * puantiti).toLocaleString()}
                    </p>
                </div>
            </div>

            
        </div>
        </div>
        
    </div>
  )
}

export default CardPayment