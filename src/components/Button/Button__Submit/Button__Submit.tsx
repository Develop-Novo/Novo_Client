import styles from "./Button__Submit.module.css";

interface IButton__Submit {
  text: string;
}
function Button__Submit({ text }: IButton__Submit) {
  return (
    <button className={styles.button__submit} type="submit">
      {text}
    </button>
  );
}

export default Button__Submit;
