import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import prevprof from './assets/image/prevprof.png'
import user from './assets/image/user.png'
import bill from './assets/image/bill.png'
import logout from './assets/image/logout.png'
import { Link } from 'react-router-dom';


function Dropdowns({handleLogout}) {

    const handleLogoutklik = () =>  {
        handleLogout();
    }

  return (
    <>
          <Dropdown>
            <Dropdown.Toggle variant='' style={{border:'none'}}> 
                <img src={prevprof}>
                </img>
                <Dropdown.Menu>
                <Dropdown.Item>
                    <Link to="/profile" style={{textDecoration:'none', color:'black'}}><img src={user} className='p-2'></img>
                     Profile</Link>
                </Dropdown.Item>
            <Dropdown.Item>
            <Link to="/payment-waiting/:puantiti/:price" style={{textDecoration:'none', color:'black'}}><img src={bill} className='p-2'></img>
                     Pay</Link>
            </Dropdown.Item>
            <Dropdown.Item onClick={handleLogoutklik}>
            <img src={logout} className='p-2'></img>
                     Logout
            </Dropdown.Item>
                </Dropdown.Menu>    
            </Dropdown.Toggle>
          </Dropdown>
    </>
  );
}

export default Dropdowns;