import { useEffect } from "react";
import styles from "./widget.module.css";

const Intro2 = ({ setIndex, index }) => {
  const nextFct = () => {
    setIndex(index + 1);
  };

  useEffect(() => {
    setTimeout(nextFct, 2500);
  });
  return (
    <div className={styles.information}>
      <div>STUDIO&nbsp;ASSAF&nbsp;KIMMEL</div>
      <div>
        (b. 1990. Israel) is an architect based in Berlin, working across the
        fields of architecture, installation art, fashion, performance and
        speculative design.
      </div>
    </div>
  );
};

export default Intro2;
