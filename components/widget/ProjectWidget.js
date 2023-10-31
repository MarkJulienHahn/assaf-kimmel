import { useEffect } from "react";
import styles from "./widget.module.css";
import PortableText from "react-portable-text";

const ProjectWidget = ({ widgetContent, setIndex, extended, setExtended }) => {
  useEffect(() => () => setExtended(false), []);

  return (
    <div
      className={styles.outer}
      onMouseEnter={() => setExtended(true)}
      onMouseLeave={() => setExtended(false)}
    >
      <div className={styles.left}></div>
      <div className={styles.inner} onClick={() => setIndex(5)}>
        <div className={styles.projectWrapper}>
          <div className={styles.projectHead}>
            <div className={styles.projectIndex}>001</div>
            <div className={styles.projectTitle}>{widgetContent.title}</div>
          </div>

          {extended && (
            <div className={styles.projectText} >
              <PortableText content={widgetContent.shortDescription} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectWidget;
