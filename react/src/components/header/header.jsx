import './header.css';
import vvtLogo from '../../images/vvt-logo.jpg';

const Header = () => {
  const logoOnClick = () => {
    window.location.href = '/';
  }

  return (
    <header className="vvt-header">
      <ul className="vvt-logo-container">
        <button className="vvt-logo-btn" type='button' onClick={logoOnClick}>
          <img className="vvt-logo" src={vvtLogo} alt="VVTaxi" />
        </button>
      </ul>
    </header>
  );
};

export default Header;