import { useEffect } from "react";
import styles from "./widget.module.css";
import PortableText from "react-portable-text";

const Intro2 = ({ setIndex, index, about }) => {
  const nextFct = () => {
    setIndex(index + 1);
  };

  useEffect(() => {
    setTimeout(nextFct, 3500);
  });

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
