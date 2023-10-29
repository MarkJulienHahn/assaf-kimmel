import { useState } from "react";
import styles from "./menu.module.css";

const Menu = ({ setIndex }) => {
  return (
    <div className={styles.outer}>
      <div className={styles.list}>
        <div onClick={() => setIndex(3)}>News</div>
        <div onClick={() => setIndex(0)}>Projects</div>
        <div onClick={() => setIndex(0)}>About</div>
        <div onClick={() => setIndex(0)}>Contact</div>
      </div>
    </div>
  );
};

export default Menu;
