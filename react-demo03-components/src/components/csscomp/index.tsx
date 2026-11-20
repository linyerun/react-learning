import styles from "./index.module.scss";

function CssComp() {
  return (
    <>
      <button className={styles.buttonRed}>按钮</button>
      <hr />
      <button className="button">按钮</button>
    </>
  );
}

export default CssComp;
