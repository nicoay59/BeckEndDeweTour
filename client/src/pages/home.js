import React, { useState } from 'react'
import Footer from '../components/Footer';
import CardBody from '../components/Body';
import Content from '../components/Content';
import NavbarCom from '../components/Navbar';
import Login from '../components/auth/Login';
import Compbod from '../components/Compbod';
import Hero from '../components/Hero';
import { API } from "../config/api";
import { useQuery } from "react-query";



function Home() {


  const { data : trip } = useQuery('tripsCache', async () => {
    const response = await API.get('/trips');
    return response.data.data;
  });


  const [search, setSearch] = useState("");




  return (
    <div>
        <Content search={search} setSearch={setSearch} />
        <Hero />
        <CardBody search={search} setSearch={setSearch}/>
        <Login />
        <Compbod />
    </div>
  )
}

export default Home