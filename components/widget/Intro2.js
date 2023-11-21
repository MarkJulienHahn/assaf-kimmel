import { useEffect } from "react";
import styles from "./widget.module.css";
import PortableText from "react-portable-text";

const Intro2 = ({ setIndex, index, about }) => {

  return (
    <div className={styles.information}>
      <div>STUDIO&nbsp;ASSAF&nbsp;KIMMEL</div>
      {about?.loadingText && (
        <div>
          <PortableText content={about.loadingText} />
        </div>
      )}
    </div>
  );
};

export default Intro2;
