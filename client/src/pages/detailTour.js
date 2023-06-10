import React from "react";
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.min.js"
import detail from '../components/assets/image/detail.png'
import detail1 from '../components/assets/image/detail-1.png'
import detail2 from '../components/assets/image/detail-2.png'
import hotel from '../components/assets/image/hotel.png'
import plane from '../components/assets/image/plane.png'
import meal from '../components/assets/image/meal.png'
import time from '../components/assets/image/time.png'
import calendar from '../components/assets/image/calendar.png'
import minus from '../components/assets/image/Minus.png'
import plus from '../components/assets/image/Plus.png'
import {useState, useEffect, useContext} from 'react'
import { Await, Link } from "react-router-dom";
import mapping from '../components/mapping'
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation } from 'react-query';
import { API } from '../config/api';
import { UserContext } from '../context/userContext';








import { Button } from "bootstrap";
import item from "../components/mapping";
import Login from "../components/auth/Login";

// import detail3 from '../components/assets/image/detail-3.png'
// import Images from '../components/image';

function DetailTour() {

    


useEffect(() => {
  //change this to the script source you want to load, for example this is snap.js sandbox env
  const midtransScriptUrl = "https://app.sandbox.midtrans.com/snap/snap.js";
  //change this according to your client-key
  const myMidtransClientKey = process.env.REACT_APP_MIDTRANS_CLIENT_KEY;

  let scriptTag = document.createElement("script");
  scriptTag.src = midtransScriptUrl;
  // optional if you want to set script attribute
  // for example snap.js have data-client-key attribute
  scriptTag.setAttribute("data-client-key", myMidtransClientKey);

  document.body.appendChild(scriptTag);
  return () => {
    document.body.removeChild(scriptTag);
  };
}, []);




    const [state,_] = useContext(UserContext)



    let navigate = useNavigate();
    let {id} = useParams();

    let {data: trip} = useQuery('tripDetailCache', async () => {
        const response = await API.get(`/trip/` + id);
        return response.data.data;
    });

    
    const [puantiti, setPuantiti] = useState(1)
    const [price, setPrice] = useState(0)
    
    const rupiah = (number) => {
        return new Intl.NumberFormat("id-ID", {
          style: "currency",
          currency: "IDR",
        }).format(number);
      };
    
    
    
    const handleIncrement = () => {
        if (puantiti < trip?.quota) {
            setPuantiti(puantiti + 1);
          } else {
            alert("Sisa kuota tidak mencukupi!");
          }
    }
    
    const handleDecrement = () => {
        if (puantiti > 1){
            setPuantiti(puantiti - 1)
        }
    }
    

    const [booking, setBooking] = useState();
    useEffect (() =>{
        setBooking({
            title: trip?.title,
            country_name: trip?.country.country_name,
            acomodation: trip?.acomodation,
            transportation: trip?.transportation,
            eat: trip?.eat,
            day: trip?.day,
            night: trip?.night,
            dateTrip: trip?.dateTrip,
            counter_qty: puantiti,  
            total: price,
            trip_id: trip?.id,
        })
        
    },[price])

    const handleBook = localStorage.setItem('booking', JSON.stringify(booking));



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
        //   navigate("/profile");
            const token = response.data.data.token;
            window.snap.pay(token, {
            onSuccess: function (result) {
            /* You may add your own implementation here */
            console.log(result);
            navigate("/profile");
            },
            onPending: function (result) {
            /* You may add your own implementation here */
            console.log(result);
            navigate("/profile");
            },
            onError: function (result) {
            /* You may add your own implementation here */
            console.log(result);
            navigate("/profile");
            },
            onClose: function () {
            /* You may add your own implementation here */
            alert("you closed the popup without finishing the payment");
            },
        });
        } catch (error){
          console.log(error.response);
          navigate("/payment/${puantiti}/${trip?.price")
        }
      });

    
    useEffect (() => {
        setPrice(trip?.price * puantiti)
    },[handleIncrement,handleDecrement ])
    
    
    
    console.log(booking, 'ini dalah title');
    
    
    return (
        <div className="detailtour p-5" style={{backgroundColor:'#E5E5E5', textAlign:'start' }}>
        <div class="container" >
            <div>
                <h1>
                {trip?.title}
                </h1>
                <h6>
                {trip?.country.country_name}
                </h6>
            </div>
            <div class="row d-flex justify-content-center">
                <div class="col-md-10">
                    <div id="myCarousel" class="carousel slide" data-bs-ride="carousel" align="center">
                        <div class="carousel-inner">
                            <div class="carousel-item active"> <img src={trip?.image}  class="rounded" /> </div>
                            <div class="carousel-item"> <img src={detail1} class="rounded" /> </div>
                            <div class="carousel-item"> <img src={detail2} class="rounded" /> </div>
                        </div>
                        <ol class="carousel-indicators list-inline">
                            <li class="list-inline-item active"> <a id="carousel-selector-0" class="selected" data-bs-slide-to="0" data-bs-target="#myCarousel"> <img src={trip?.image} class="img-fluid rounded" /> </a> </li>
                            <li class="list-inline-item"> <a id="carousel-selector-1" data-bs-slide-to="1" data-bs-target="#myCarousel"> <img src={detail1} class="img-fluid rounded" /> </a> </li>
                            <li class="list-inline-item"> <a id="carousel-selector-2" data-bs-slide-to="2" data-bs-target="#myCarousel"> <img src={detail2} class="img-fluid rounded" /> </a> </li>
                        </ol>
                    </div>
                </div>
            </div>
            <h5>
                Information Trip
            </h5>
            <div style={{display:'flex', flexDirection:'row', justifyContent:'space-between'}}>
                <div style={{padding:'10px'}}>
                    Acomodation
                    <p>
                       <img src={hotel} ></img> {trip?.acomodation}
                    </p>
                </div>
                <div style={{padding:'10px'}}>
                    Transportation
                    <p>
                    <img src={plane} ></img> {trip?.transportation}
                    </p>
                </div>
                <div style={{padding:'10px'}}>
                    Eat
                    <p>
                    <img src={meal} ></img> {trip?.eat}
                    </p>
                </div>
                <div style={{padding:'10px'}}>
                    Duration
                    <p>
                    <img src={time} ></img>   {trip?.day} Day {trip?.night} Night
                    </p>
                </div>
                <div style={{padding:'10px'}}>
                    Date Trip
                    <p>
                    <img src={calendar} ></img> {trip?.dateTrip}
                    </p>
                </div>
            </div>
            <h5>
                Description
            </h5>
            <p>
            {trip?.description}
            </p>
            <div className="flex-row justify-content-between fs-3" style={{display:'flex'}}>
                    <div className="text-warning"> {rupiah(trip?.price)} <span className="text-black">/ Person</span>  </div> 
                    <div>
                    <img src={minus} onClick={handleDecrement} className="me-3"></img> 
                    {puantiti} 
                    <img src={plus} onClick={handleIncrement} className="ms-3"></img>
                    </div>
            </div>
            <div className="flex-row justify-content-between fs-3" style={{display:'flex'}}>
                    <div> Total :  </div> 
                    <div className="text-warning"> {rupiah(price)} </div>
                    {/* (trip?.price * puantiti) */}
            </div>
            <div className="d-flex justify-content-end pt-4">
                {state?.role === "admin" ? <div> <h1>lo admin goblok</h1> </div> : 
                <Link > <button className="btn btn-warning text-white" type="submit" onClick={(e) => handleSubmit.mutate(e)}> BOOK NOW</button></Link>
            }
            </div>
        </div>
  </div>
    );
  }

export default DetailTour