import './App.css';
import './components/Navbar.css'
import palm from './components/assets/image/palm_1.png'
import { Routes, Route, Outlet, Navigate,  BrowserRouter as Router, useNavigate} from 'react-router-dom'
import Home from './pages/home';
import NavbarCom from './components/Navbar';
import Footer from './components/Footer';
import DetailTour from './pages/detailTour';
import Payment from './pages/Payment';
import Profile from './pages/Profile';
import IncomeTrip from './pages/IncomeTrip';
import IncomingTrans from './pages/IncomingTrans';
import PaymentWaitAprv from './pages/PaymentWaitAprv';
import FormaddTrip from './pages/FormaddTrip';
import { useContext, useEffect, useState } from 'react';

import { UserContext } from './context/userContext';
import { API, setAuthToken } from './config/api';
import { PrivateRouteLogin, PrivateRouteUser, PrivateRouteAdmin } from './pages/PrivateRoute';




// const PrivateRouteAdmin = ({isAdmin}) =>{
//   if (isAdmin) {
//     return <Outlet />
//   }else {
//     return <Navigate to="/" />
//   }
// };
// const PrivateRouteUser = ({isUser}) =>{
//   if (isUser) {
//     return <Outlet />
//   }else {
//     return <Navigate to="/" />
//   }
// }

// const jamal = JSON.parse(localStorage.getItem("login"));




function App() {
  
  // if(localStorage.token){
  //   setAuthToken(localStorage.token);
  // }


  let navigate = useNavigate();
  const [state, dispatch] = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Redirect Auth but just when isLoading is false
    if (!isLoading) {
      if (state.isLogin === false) {
        navigate('/');
      }
    }
  }, [isLoading]);

  useEffect(() => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
      checkUser();
    } else {
      setIsLoading(false)
    }
  }, []);

  const checkUser = async () => {
    try {
      const response = await API.get('/check-auth');
      console.log("check user success : ", response)
      // Get user data
      let payload = response.data.data;
      // Get token from local storage
      payload.token = localStorage.token;
      // Send data to useContext
      dispatch({
        type: 'USER_SUCCESS',
        payload,
      });
      setIsLoading(false)
    } catch (error) {
      console.log("check user failed : ", error);
      dispatch({
        type: 'AUTH_ERROR',
      });
      setIsLoading(false)
    }
  };



  return (
    <div className="App">
      <NavbarCom />
      {isLoading ? null :
        <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/detail-tour/:id" element={<DetailTour />} />
            <Route element={<PrivateRouteLogin />} >
              <Route element={<PrivateRouteUser />} >
                <Route exact path="/payment/:puantiti/:price" element={<Payment />} />
                <Route exact path="/profile" element={<Profile />} />
                <Route exact path="/payment-waiting/:puantiti/:price" element={<PaymentWaitAprv />} />
              </Route>
              <Route element={<PrivateRouteAdmin />} >
                <Route exact path="/homeadmin" element={<IncomingTrans />} />
                <Route exact path="/IncomeTrip" element={<IncomeTrip />} />
                <Route exact path="/addTrip" element={<FormaddTrip />} />
              </Route>
            </Route>
        </Routes>
      }
      <Footer />
      </div>
      );
}

export default App;
      {/* // <Router>

      // </Router> */}
      {/* <Route element={<PrivateRouteUser isUser={jamal?.isUser}/>}>
      </Route>
      <Route element={<PrivateRouteAdmin isAdmin={jamal?.isAdmin} />}>
      </Route> */}