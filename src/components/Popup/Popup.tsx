import styles from "./Popup.module.css";

interface IPopup {
  closePopup(): void;
  popupMsg: string;
  onPopupBtn(): void;
  btnMsg: string;
}
function Popup({ closePopup, popupMsg, onPopupBtn, btnMsg }: IPopup) {
  return (
    <>
      <div className={styles.cover} onClick={closePopup} />
      <div className={styles.popup}>
        <div className={styles.success__message}>{popupMsg}</div>
        <div className={styles.popup__hr} />
        <button className={styles.popup__btn} onClick={onPopupBtn}>
          {btnMsg}
        </button>
      </div>
    </>
  );
}

export default Popup;
