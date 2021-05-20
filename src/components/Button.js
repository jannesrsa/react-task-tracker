const Button = ({ colour, text }) => {
  const onClick = () => {
    console.log("clicke");
  };

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
