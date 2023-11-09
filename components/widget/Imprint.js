import { useEffect } from "react";

import styles from "./widget.module.css";
import PortableText from "react-portable-text";

import useWindowDimensions from "../../hooks/useWindowDimensions";
import { use100vh } from "react-div-100vh";

const Imprint = ({ imprint }) => {
  const { windowWidth } = useWindowDimensions();
  const height = use100vh();
  useEffect(() => {
    history.replaceState(null, "", `/imprint`);
  }, []);

  return (
    <div
      className={styles.outer}
      style={
        windowWidth <= 600
          ? { height: `calc(${height}px - 80px` }
          : { height: "auto" }
      }
    >
      <div className={styles.left}></div>
      <div className={styles.inner}>
        <div className={styles.aboutName}>Imprint</div>
        <div className={styles.imprintContent}>
          {imprint?.imprint && <PortableText content={imprint?.imprint} />}
          {imprint?.privacy && <PortableText content={imprint?.privacy} />}
        </div>
      </div>
    </div> 
  );
};

export default Imprint;
