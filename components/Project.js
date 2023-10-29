import { useEffect } from "react";
import styles from "../components/project.module.css";

import { useInView } from "react-intersection-observer";

const Project = ({ setIndex }) => {
  const { ref, inView, entry } = useInView({
    /* Optional options */
    threshold: 0.6,
  });

  useEffect(() => {
    inView && setIndex(0);
  }, [inView]);

  return (
    <div className={styles.wrapper} ref={ref}>
      Project
    </div>
  );
};

export default Project;
