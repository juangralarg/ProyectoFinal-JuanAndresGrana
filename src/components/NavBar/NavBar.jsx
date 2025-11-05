import { Link } from 'react-router-dom'
import CartWidget from '../CartWidget/CartWidget'
import './NavBar.css'

const NavBar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          <div className="logo"> <img src="/img/logoharduer.png" alt="logo" /></div>
        </Link>
        
        <ul className="navbar-menu">
          <li><Link to="/">Inicio</Link></li>
          <li><Link to="/category/computadoras">Computadoras</Link></li>
          <li><Link to="/category/perifericos">Periféricos</Link></li>
          <li><Link to="/category/monitores">Monitores</Link></li>
        </ul>
        
        <CartWidget />
      </div>
    </nav>
  )
}

export default NavBar