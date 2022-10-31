import { NavLink } from "react-router-dom";
import "../styles/nav.css"

const NavContainer = () => {
  return (
    <nav>
      <NavLink end to="/">Home</NavLink>
      <NavLink exact to="/blogs">Blogs</NavLink>
    </nav>
  )
  }

  
  export default NavContainer;