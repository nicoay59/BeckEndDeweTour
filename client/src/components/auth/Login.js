// import React, { useState } from 'react';
// import Button from 'react-bootstrap/Button';
// import Form from 'react-bootstrap/Form';
// import Modal from 'react-bootstrap/Modal';

// function Modals({handleCloseLogin,show,handleIslogin}) {
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     handleCloseLogin();
//     handleIslogin();
//   }
//   return (
//     <>
//       <Modal  show={show} onHide={handleCloseLogin}>
//         <Modal.Title className='d-flex justify-content-center'>
//         <Modal.Title>Login</Modal.Title>    
//         </Modal.Title>
//         <Modal.Body>
//           <Form onSubmit={handleSubmit}>
//             <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
//               <Form.Label>Email address</Form.Label>
//               <Form.Control
//                 type="email"
//                 placeholder="name@example.com"
//                 autoFocus
//               />
//             </Form.Group>
//             <Form.Group className="mb-3" controlId="formBasicPassword">
//             <Form.Label>Password</Form.Label>
//             <Form.Control type="password" placeholder="Password" />
//       </Form.Group>
//       <Modal.Footer className='d-flex justify-content-center'>
//           <Button className='mb-3 px-5' variant="warning" type='submit' onClick={handleIslogin}>
//             Login
//           </Button>
//         </Modal.Footer>
//           </Form>
//         </Modal.Body>
//       </Modal>
//     </>
//   );
// }
// export default Modals


import React, { useState, useEffect, useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { UserContext } from '../../context/userContext';
import { API, setAuthToken } from '../../config/api';
import { Alert } from 'react-bootstrap';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';




//disini login versi lama

// const users = [ 
//   {
//     email: "user@mail.com",
//     password: "user",
//     isAdmin: false,
//     isUser: true,
//   },
//   {
//     email: "admin@mail.com",
//     password: "admin",
//     isAdmin: true,
//     isUser: false,
//   },
// ]

// const { show, handleCloseLogin, handleIslogin, handleAdmin, setIsAdmin } = props;
// const [email, setEmail] = useState('');
// const [password, setPassword] = useState('');
// const [dataLogin, setDataLogin] = useState({email:'',password:'', isUser: false})


// const handleSubmit = () => {
//   if (email === "user@mail.com" && password === "user" ) {
//     setDataLogin({...dataLogin,email:email, password:password, isUser: true})
//   } else if (email === "admin@mail.com" && password === "admin") {
//     setDataLogin({...dataLogin,email:email, password:password, isAdmin: true})
//   } else {
//     alert("Invalid credentials. Please try again.")
// }
// };

  



//   useEffect(() => {
//     if(dataLogin?.isUser || dataLogin?.isAdmin){
//       localStorage.setItem("login",JSON.stringify(dataLogin))
//     }
//   }, [dataLogin]);

function Login(props) {

  let navigate = useNavigate();
  
  const title = 'Login';
  document.title = 'Dumbmerch | ' + title;

  const [_, dispatch] = useContext(UserContext);

  const [message, setMessage] = useState(null);
  const [form, setForm] = useState ({
    email: '',
    password: '',
  });

  const {email, password} = form;

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name] : e.target.value,
    })
  }

  
  


  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();

      const response = await API.post('/login', form);

      dispatch ({
        type: 'LOGIN_SUCCESS',
        payload: response.data.data,
      });
      setAuthToken(localStorage.token);

      if (response.data.data.role === 'admin') {
        navigate('/homeadmin');
      } else {
        navigate('/');
      }

      const alert = (
        <Alert variant='success' className='py-1'>
          Login Success
        </Alert>
      );
      setMessage(alert);
    } catch (error) {
      const alert = (
        <Alert variant='danger' className='py-1'>
          Login Failed
        </Alert>
      );
      setMessage(alert);
    }
  });

  



const {show, handleCloseLogin} = props



  return (
    <>
      <Modal show={show} onHide={handleCloseLogin}>
        <Modal.Title className="d-flex justify-content-center">
          <Modal.Title>Login</Modal.Title>
        </Modal.Title>
        <Modal.Body>
          {message && message}
          <Form onSubmit={(e) => handleSubmit.mutate(e)}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="name@example.com"
                autoFocus
                name='email'
                value={email}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                name='password'
                onChange={handleChange}
              />
            </Form.Group>
            <Modal.Footer className="d-flex justify-content-center">
              <Button className="mb-3 px-5" variant="warning" type="submit">
                Login
              </Button>
            </Modal.Footer>
          </Form>
          <Form.Group className="mb-3 m-auto text-center" controlId="formBasicCheckbox">
        <Form.Label>Don't have an account? Click here</Form.Label>
        </Form.Group>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Login;
