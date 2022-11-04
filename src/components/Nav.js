import { NavLink } from "react-router-dom";
import "../styles/nav.css"

const NavContainer = () => {

  const handleClick = () => {
    document.getElementById("title").innerHTML = ""
  } 
  const handleBlogsClick = () => {
    document.getElementById("title").innerHTML = "Blogs"
  } 

  return (
    <nav>
      <NavLink onClick={handleClick} end to="/">Home</NavLink>
      <NavLink onClick={handleBlogsClick} exact to="/blogs">Blogs</NavLink>
    </nav>
  )
  }

  
  export default NavContainer;