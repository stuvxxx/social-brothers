import "../styles/footer.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCopyright } from '@fortawesome/free-solid-svg-icons'

const Header = () => {
    return (
      <div className="footer">
        <FontAwesomeIcon className="cr-icon" icon={faCopyright} />
        <p>Copyright Social Brothers - 2022</p>
      </div>
    )
  };
  
  export default Header;