import { Link} from 'react-router-dom';
import './NavBar.css';

const Navbar = () => {

  return (
    <nav className='navbar'>
      <ul className='ul-list'>
       <li className='links'>
         <Link to="/">Active Auctions</Link>
       </li>
       <li className='links'>
         <Link to="/notcurrent">Closed Auctions</Link>
       </li>
       <li className='links'>
         <Link to="/newauction">Create Auction</Link>
       </li>
      </ul>
    </nav>
  );
};



export default Navbar;