import { useEffect } from "react";
import styles from "./widget.module.css";

const Intro2 = ({ setIndex, index }) => {
  next = () => {
    setIndex(index + 1);
  };

  useEffect(() => {
    setTimeout(next, 4000);
  });
  return (
    <div className={styles.information}>
      <div>Assaf&nbsp;Kimmel</div>
      <div>
        (b. 1990. Israel) is an architect based in Berlin, working across the
        fields of architecture, installation art, fashion, performance and
        speculative design.
      </div>
    </div>
  );
};

export default Intro2;
