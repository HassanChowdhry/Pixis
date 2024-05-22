import { useNavigate } from 'react-router-dom';
import './UI.css';

const Navbar = ({ links }) => {
  const navigate = useNavigate();
  return (
    <nav className="navbar">
        {links.map((link, index) => (
          <div 
            key={index} 
          >
            <button className="user-button" onClick={() => navigate(`${link.url}`)}>{link.text}</button>
          </div>
        ))}
    </nav>
  );
};

export default Navbar;