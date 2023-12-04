import { useEffect } from "react";
import styles from "./widget.module.css";

const Intro1 = ({ setIndex, index }) => {
  const nextFct = () => {
    setIndex(index + 1);
  };

  useEffect(() => {
    setTimeout(nextFct, 1000);
  });

  return <div>ASSAF&nbsp;KIMMEL&nbsp;STUDIO</div>;
};

export default Intro1;
