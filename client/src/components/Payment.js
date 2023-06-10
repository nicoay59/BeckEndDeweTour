import React from 'react'
import icon from '../components/assets/image/Icon-payment.png'
import payment from '../components/assets/image/payment.png'
import { useParams } from 'react-router-dom'

function CardPayment(masbri) {

    
    // const {puantiti, price} = useParams();
    const booking = JSON.parse(localStorage.getItem('booking'))
    // console.log(booking, 'ini isi booking');
    
    // const handleBuy = useMutation(async (e) => {
    //     try {
    //         e.preventDefault();

    //         const config = {
    //             headers: {
    //                 'content-type' : 'application/json',
    //             },
    //         };
    //         const data = {
    //             trip_id: trip.id,
    //             country_id: trip.country_id,
    //             price: trip.price,
    //         };
    //         const body = JSON.stringify(data);

    //         const response = await API.post('/transaction', body, config);
    //         navigate('/profile');
    //     } catch (error) {}
    // });


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
                {booking?.title}
                <p>
                    {booking?.country_name}
                </p>
                <p>
                    Waiting Payment
                </p>
            </div>
            <div className='p-2 flex-fill'>
                Date Trip
                <p>
                    {booking?.dateTrip}
                </p>
                <p>
                    Acomodation
                </p>
                <p>
                    {booking?.acomodation}
                </p>
            </div>
            <div className='p-2 flex-fill'>
                Duration
                <p>
                    {booking?.day} Day {booking?.night} Nights
                </p>
                <p>
                    Transportation
                </p>
                <p>
                    {booking?.transportation}
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
                        : {booking?.counter_qty}
                    </p>
                    <hr/>
                    <p>
                        : IDR. {booking?.total.toLocaleString()}
                    </p>
                </div>
            </div>

            
        </div>
        </div>
        
    </div>
  )
}

export default CardPayment