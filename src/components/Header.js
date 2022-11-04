import Nav from "./Nav"
import Logo from "./Logo"
import "../styles/header.css"

const Header = () => {
    return (
      <header>
        <div id="title"></div>
        <Logo />
        <Nav />
      </header>
    )
  };
  
  export default Header;