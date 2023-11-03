import { useEffect } from "react";

import styles from "./widget.module.css";
import PortableText from "react-portable-text";

import { urlFor } from "../../hooks/useImageUrlBuilder";

import Image from "next/image";

const Imprint = ({ imprint }) => {
  useEffect(() => {
    history.replaceState(null, "", `/imprint`);
  }, []);

  return (
    <div className={styles.outer}>
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
