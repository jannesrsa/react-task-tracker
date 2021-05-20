const Button = ({ colour, text, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="btn"
      style={{ backgroundColor: colour }}
    >
      {text}
    </button>
  );
};

export default Button;
