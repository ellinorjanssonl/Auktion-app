
import { Link} from 'react-router-dom'; // Ändra från useHistory till useNavigate
import './Navbar.css';

const Navbar = () => {

  return (
    <nav className='navbar'>
      <ul className='ul-list'>
       <li className='links'>
         <Link to="/">Auctions</Link>
       </li>
       <li className='links'>
         <Link to="/CreateAuction">Create Auctions</Link>
       </li>
       <li className='links'>
         <Link to="/Bid">Bid Auctions</Link>
       </li>
      </ul>
    </nav>
  );
};

export default Navbar;



