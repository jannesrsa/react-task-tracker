import PropTypes from "prop-types";
import Button from "./Button";

const Header = ({ title, onShowAdd }) => {
  return (
    <header className="header">
      <h1>{title}</h1>
      <Button text="Add" colour="green" onClick={onShowAdd} />
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
