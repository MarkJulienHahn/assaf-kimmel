import { useEffect } from "react";

import styles from "./widget.module.css";
import ProjectOverviewRow from "./ProjectOverviewRow";

const ProjectsOverview = ({ projects, setIndex, setScrollTrigger }) => {

  useEffect(() => {
    history.replaceState(null, "", `/projects`);
  }, []);

  return (
    <div className={styles.outerFull}>
      <div className={styles.left}></div>
      <div className={styles.overviewInner}>
        {projects.map((project, i) => (
          <ProjectOverviewRow
            project={project}
            key={i}
            setScrollTrigger={setScrollTrigger}
            setIndex={setIndex}
            i={i}
          />
        ))}
      </div>
    </div>
  );
};

export default ProjectsOverview;
