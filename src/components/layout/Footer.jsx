
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';   


const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>&copy; 2025 GlobalTech. All rights reserved.</p>
        <div className="social-icons">
          <FontAwesomeIcon icon={['fab', 'facebook']} className="social-icon" />
          <FontAwesomeIcon icon={['fab', 'twitter']} className="social-icon" />
          <FontAwesomeIcon icon={['fab', 'linkedin']} className="social-icon" />
        </div>
      </div>
    </footer>
  );
}

export default Footer;