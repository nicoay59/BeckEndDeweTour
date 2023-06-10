// import {useState, useEffect} from 'react'
// import icon from './assets/image/Icon.png';
// import atas from './assets/image/atas.png'
// import Container from 'react-bootstrap/Container';
// import Navbar from 'react-bootstrap/Navbar';
// // import NavDropdown from 'react-bootstrap/NavDropdown';
// import Nav from 'react-bootstrap/Nav';
// import Image from 'react-bootstrap/Image';
// import Modals from './modaltes'
// import Register from './register';



// import React from 'react'
// import { Dropdown } from 'react-bootstrap';
// import Dropdowns from './Dropdown';

// function NavbarCom() {
//   const [show, setShow] = useState(false);
//   const handleShow = () => setShow(true);

//   const handleCloseLogin = () => {
//     setShow(false);
//   };

  

//   useEffect(() => {
//     const isLogin = localStorage.getItem("loggedIn");
//     if (isLogin === "true"){
//       setLoggedIn(true);
//     } else {
//       setLoggedIn(false);
//     }
//   }, []);

//   const [LoggedIn, setLoggedIn] = useState(false);
//   const handleIslogin = () => {
//     setLoggedIn(true);
//     localStorage.setItem("loggedIn", "true")
//   };

//   const handleLogout = () => {
//     setLoggedIn(false);
//     localStorage.removeItem("loggedIn")
//     window.location.href="/";
//   }


  

  

//   const [reg, setReg] = useState(false);

//   const handleRegClose = () => setReg(false);
//   const handleRegShow = () => setReg(true);

//     return (
//           <>
//           <Navbar collapseOnSelect expand="lg" variant="dark" style={{padding:'0rem'}}>
//           <Container style={{padding:'0rem'}}>
//             <Navbar.Brand href="/"><Image src={icon} /></Navbar.Brand>
//             <Navbar.Toggle aria-controls="responsive-navbar-nav" />
//             {LoggedIn ? (
//                 <Dropdowns handleLogout={handleLogout} />) : (
//             <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">
//               <Nav>
//                   <Nav.Link href="#" onClick={handleShow}>Login</Nav.Link>
//                   <Nav.Link className='buttonreg' href="#" onClick={handleRegShow} >
//                     Register
//                   </Nav.Link>
//                 </Nav>
//             </Navbar.Collapse>
//             )
//           }
//           </Container>
//           <Image className='atas' src={atas} />
//         </Navbar>
//         <Modals handleIslogin={handleIslogin} handleCloseLogin={handleCloseLogin} handleShow={handleShow} show={show}/>
//         <Register handleRegClose={handleRegClose} handleRegShow={handleRegShow} show={reg} />
//         </>
//     );
//   }

// export default NavbarCom  JANGAN DIHHAPUSS


import React, { useState, useEffect, useContext } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Image from 'react-bootstrap/Image';
import Dropdowns from './Dropdown';
import Modals from './auth/Login';
import Register from './auth/Register';
import icon from './assets/image/Icon.png';
import atas from './assets/image/atas.png';
import DropdownAdmin from './DropdownAdmin';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from "../context/userContext";


function NavbarCom() {


  const [state, dispatch] = useContext(UserContext)
  console.log(state);
  
  var login = state.isLogin;
  var customer = state.role;

  let navigate = useNavigate()


  // const jamal = JSON.parse(localStorage.getItem("login"))
  const [showModal, setShowModal] = useState(false);
  const [reg, setReg] = useState(false);
  // const [loggedIn, setLoggedIn] = useState(false);
  // const [isAdmin, setIsAdmin] = useState(false);

  // useEffect(() => {
  //   const isLoggedIn = localStorage.getItem("loggedIn");
  //   if (isLoggedIn === "true") {
  //     setLoggedIn(true);
  //   } else {
  //     setLoggedIn(false);
  //   }
  // }, []);

  const handleRegClose = () => setReg(false);
  const handleRegShow = () => setReg(true);

  const handleShowModal = () => setShowModal(true);
  

  const handleCloseLogin = () => {
    setShowModal(false);
  } 

  // const handleIslogin = () => {
  //   setLoggedIn(true);
  // };

  // const handleAdmin = () => {
  //   setIsAdmin(true);
  // }

  const handleLogout = () => {
    dispatch({
      type: "LOGOUT",
    });
    localStorage.removeItem("login");
    window.location.href = "/";
  };

  // const handleLogout = () => {
  //   setLoggedIn(false);
  //   localStorage.removeItem('login');
  //   window.location.href = '/';
  // };

  // console.log(loggedIn)



  return (
    <>
      <Navbar collapseOnSelect expand="lg" variant="dark" style={{ padding: '0rem' }}>
        <Container style={{ padding: '0rem' }}>
          <Navbar.Brand> 
          <Link to="/">
          <Image src={icon} />
          </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          {login && customer === "" ? (
            <Dropdowns handleLogout={handleLogout} />
          ) : login && customer === "admin" ?<DropdownAdmin handleLogout={handleLogout} /> :(
            <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">
              <Nav>
                <Nav.Link onClick={handleShowModal}className='border border-white rounded-1 me-3 px-4'>
                  Login
                </Nav.Link>
                <Nav.Link className="buttonreg" onClick={handleRegShow}>
                  Register
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          )}
        </Container>
        <Image className="atas" src={atas} />
      </Navbar>
      <Modals handleCloseLogin={handleCloseLogin} show={showModal} 
      // handleIslogin={handleIslogin}         
      // handleAdmin={handleAdmin}
      // setIsAdmin={setIsAdmin}
      handleLogout={handleLogout} />
      <Register handleRegClose={handleRegClose} handleRegShow={handleRegShow} show={reg} />
    </>
  );
}

export default NavbarCom;
