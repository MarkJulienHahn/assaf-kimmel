import { useState } from "react";

import styles from "./widget.module.css";
import PortableText from "react-portable-text";

const ProjectWidgetFull = ({ widgetContent, setIndex }) => {
  const [full, setFull] = useState(false);

  return (
    <div className={styles.outerFull}>
      <div className={styles.left}></div>
      <div className={styles.inner} onClick={() => setIndex(5)}>
        <div className={styles.projectWrapperFull}>
          <div className={styles.projectHead}>
            <div className={styles.projectIndex}>001</div>
            <div className={styles.projectTitle}>{widgetContent.title}</div>
          </div>
          <div className={styles.projectTextFull}>
            <PortableText content={widgetContent.description} />
          </div>
        </div>
        {widgetContent.credits ? (
          <div className={styles.projectCredits}>
            {widgetContent.credits.map((entry, i) => (
              <div className={styles.projectCreditsRow}>
                <p>{entry.job}:</p>
                <p>{entry.name}</p>
              </div>
            ))}
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default ProjectWidgetFull;
