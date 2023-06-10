import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import prevprof from './assets/image/prevprof.png'
import Trip from './assets/image/journey.png'
import logout from './assets/image/logout.png'
import { Link } from 'react-router-dom';


function DropdownAdmin({handleLogout}) {

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
                <Dropdown.Item eventKey="1">
                  <Link to='/addTrip' style={{textDecoration:'none', color:'black'}}>
                    <img src={Trip} className='p-2'></img>
                     Trip
                  </Link>
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

export default DropdownAdmin;