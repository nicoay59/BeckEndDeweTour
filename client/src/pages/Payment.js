import React, { useEffect } from 'react'
import CardPayment from '../components/Payment'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { useState } from 'react'
import item from "../components/mapping";
import { API } from '../config/api';
import { useMutation } from 'react-query'




function Payment() {
  const {id} = useParams()
  const Bebas = item?.bawah.find((tour) => tour.id === id)
  const [puantiti, setPuantiti] = useState(1)
  let navigate = useNavigate();

  const [form, setForm] = useState({
    counter_qty: '',
    total: '',
    // status: '',
    trip_id: '',
  });
  
  const booking = JSON.parse(localStorage.getItem('booking'))
  useEffect (() =>{
      setForm({
        ...form,
        counter_qty: booking?.counter_qty,
        total: booking?.total,
        // status: booking?.counter_qty,
        trip_id: booking?.trip_id ,
      });
  },[]);

  console.log(form, 'ini form');

  const handleSubmit = useMutation(async (e) => {
    try{

      const config = {
        headers: {
          'Content-type': 'multipart/form-data',
        },
      };
  
      const formData = new FormData() 
      formData.set("counter_qty", booking.counter_qty)
      formData.set("total", booking.total)
      formData.set("trip_id", booking.trip_id)
      const response = await API.post('/transaction', formData,config);
      console.log("add booking success : ", response);
      navigate("/profile");
    } catch (error){
      console.log(error.response);
    }
  });



  
  
  // const handleBuy = useMutation(async (e) => {
  //   try {
  //     e.preventDefault();
      
      // const config = {
      //   headers: {
      //     'Content-type': 'multipart/form-data',
      //   },
      // };
  //     const bookings = {
  //               trip_id: booking?.trip_id,
  //               counter_qty: booking?.counter_qty,
  //               total: booking?.total,
  //           };
  //           const body = JSON.stringify(bookings);

  //           const response = await API.post('/transaction', body, config);
  //           console.log("transaction success :", response)
  //           navigate('/profile');
  //       } catch (error) {}
  //   });
  
  return (
    
    <div>

        <CardPayment />
              <h1> BELOM KEBELI PENCET TOMBOL PAY DULU LAH</h1>
        <div className='container col-md-10 d-flex justify-content-end'>
        {/* <Link to={`/payment-waiting/${puantiti}/${Bebas?.price}`}> */}

            <button className="btn btn-warning mt-5 mb-3 px-5 text-white" type="submit" onClick={(e) => handleSubmit.mutate(e)}>Pay</button>
            {/* </Link> */}
            </div>
    </div>
  )
}

export default Payment