import { useEffect } from "react";
import styles from "./widget.module.css";

import PortableText from "react-portable-text";
import { SlArrowRight, SlArrowDown } from "react-icons/sl";

import useWindowDimensions from "../../hooks/useWindowDimensions";
import { useThreeDig } from "../../hooks/useThreeDig";

const ProjectWidget = ({ widgetContent, setIndex, hovered, setHovered }) => {
  const { windowWidth } = useWindowDimensions();
  useEffect(() => () => setHovered(false), []);

  useEffect(() => {
    windowWidth <= 600 && setHovered(true);
  }, [windowWidth]);

  return (
    <div
      className={styles.outerProjSmall}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className={styles.left}
        // style={
        //   windowWidth <= 600
        //     ? { paddingBottom: "32px" }
        //     : { paddingBottom: "0" }
        // }
      ></div>
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

      <div className={styles.projectTextMobile} onClick={() => setIndex(5)}>
        <PortableText content={widgetContent.shortDescription} />
        <div className={styles.projectArrowMobile}>
          <SlArrowDown />
        </div>
      </div>
    </div>
  );
};

export default ProjectWidget;
