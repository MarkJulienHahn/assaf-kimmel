import { useEffect } from "react";
import styles from "./widget.module.css";

import PortableText from "react-portable-text";
import { SlArrowRight } from "react-icons/sl";

import { useThreeDig } from "../../hooks/useThreeDig";

const ProjectWidget = ({ widgetContent, setIndex, hovered, setHovered }) => {
  useEffect(() => () => setHovered(false), []);

  return (
    <div
      className={styles.outer}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className={styles.left}></div>
      <div className={styles.inner} onClick={() => setIndex(5)}>
        <div className={styles.projectWrapper}>
          <div className={styles.projectHead}>
            <div className={styles.projectIndex}>
              {useThreeDig(widgetContent.i)}
            </div>
            <div className={styles.projectTitle}>{widgetContent.title}</div>
            <div className={styles.projectArrow}>
              <SlArrowRight />
            </div>
          </div>

          {hovered && (
            <div className={styles.projectText}>
              <PortableText content={widgetContent.shortDescription} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectWidget;
