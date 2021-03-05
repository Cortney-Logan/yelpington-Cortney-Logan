import logo from "./images/rating_empty.svg";
import { Link } from 'react-router-dom'

function Header(props) {
  return (
    <div>
      <Link to={'/'}>
        <header id="header">
          <h1>
            <img id="header-logo" src={logo} />
            yelpington
          </h1>
          <p>Portland Beer Edition</p>
        </header>
      </Link>
    </div>
  );
}
export default Header;
