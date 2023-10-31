import { useState } from "react";

import styles from "./widget.module.css";
import PortableText from "react-portable-text";

const ProjectsOverview = () => {
  return (
    <div className={styles.outerFull}>
      <div className={styles.left}></div>
      <div className={styles.inner}>Overview</div>
    </div>
  );
};

export default ProjectsOverview;
