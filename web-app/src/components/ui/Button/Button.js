import "./Button.scss";

const block = "button";

function Button({ children, onClick }) {
  return (
    <button className={block} onClick={onClick}>
      {children}
    </button>
  );
}

export default Button;
