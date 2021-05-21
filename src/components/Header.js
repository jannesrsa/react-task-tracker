import PropTypes from "prop-types";
import { useLocation } from "react-router";
import Button from "./Button";

const Header = ({ title, onShowAdd }) => {
  var location = useLocation();

  return (
    <header className="header">
      <h1>{title}</h1>

      {location.pathname === "/" && (
        <Button text="Add" colour="green" onClick={onShowAdd} />
      )}
    </header>
  );
};

Header.defaultProps = {
  title: "Task Tracker",
};

Header.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Header;
