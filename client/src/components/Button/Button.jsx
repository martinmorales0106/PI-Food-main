import style from "./Button.module.css";

const Button = (button) => {
  return (
    <button
      className={button.display ? style.button : style.noButton}
      onClick={button.onClick}
    >
      {button.text}
    </button>
  );
};

export default Button;
