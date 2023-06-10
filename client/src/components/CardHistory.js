import React, { useContext } from 'react'
import icon from '../components/assets/image/Icon-payment.png'
import payment from '../components/assets/image/payment.png'
import { useParams } from 'react-router-dom'
import { UserContext } from '../context/userContext';
// import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { API } from '../config/api';


function CardPaymentHistory() {

    const {puantiti, price} = useParams();

    // const [state, dispatch] = useContext(UserContext)
    const [state, dispatch] = useContext(UserContext)
    // console.log(state, 'ini log state card history');

    // let transaction = state?.user?.transaction
    let profile = state?.user


    // console.log(transaction, "ini log transaction");

    // ini test 
    let {data: transaction} = useQuery('nicoCache', async () => {
        const response = await API.get("/transactionuser");
        return response.data.data;
    });


    console.log(transaction, "user transaction");



    // let {id} = useParams();

    // let { data: transactions } = useQuery('transactionsCache', async () => {
    //   const response = await API.get("/transactions");
    //   return response.data.data;
    // });
    // console.log(state, 'ini state trans', transactions);

  return (
    <div style={{backgroundColor:'#E5E5E5'}}>
        <div className='pt-5' style={{backgroundColor:'#E5E5E5', marginBottom:"20px", minHeight:"80hv   "}}>
        {transaction?.map((data, index) => {
            return ( 
                <div className='container bg-light border col-md-10 mb-5' key={index}>
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
                <p>
                {data?.trip?.title}
                </p>
                <p>
                    {data?.trip?.country?.country_name}
                </p>
                <p>
                    Waiting Payment
                </p>
            </div>
            <div className='p-2 flex-fill'>
                Date Trip
                <p>
                {data?.trip?.dateTrip}

                </p>
                <p>
                    Acomodation
                </p>
                <p>
                {data?.trip?.acomodation}
                </p>
            </div>
            <div className='p-2 flex-fill'>
                Duration
                <p>
                {data?.trip?.day} Day {data?.trip?.night} Nights
                </p>
                <p>
                    Transportation
                </p>
                <p>
                {data?.trip?.transportation}
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
                    {data?.userdata?.fullname}
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
                    {data?.userdata?.phone}
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
                        : {data?.counter_qty}
                    </p>
                    <hr/>
                    <p>
                    {data?.total}
                    </p>
                </div>
            </div>

            
        </div>
                    )     
                })}
        </div>
        
    </div>
  )
}

export default CardPaymentHistory