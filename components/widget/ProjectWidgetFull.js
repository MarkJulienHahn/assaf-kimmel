import { SlArrowLeft, SlArrowUp } from "react-icons/sl";

import styles from "./widget.module.css";
import PortableText from "react-portable-text";
import Image from "next/image";

import { urlFor } from "../../hooks/useImageUrlBuilder";
import { useThreeDig } from "../../hooks/useThreeDig";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import { use100vh } from "react-div-100vh";

const ProjectWidgetFull = ({ widgetContent, setIndex }) => {
  const { windowWidth } = useWindowDimensions();
  const height = use100vh();
  return (
    <div
      className={styles.outerProject}
      style={
        windowWidth <= 600
          ? {
              height: `calc(${height}px - 2 * var(--space-S))`,
              display: "block",
              paddingLeft: "50px",
            }
          : { height: "auto" }
      }
    >
      <div className={styles.left}></div>
      <div className={styles.inner}>
        <div className={styles.projectInner}>
          <div className={styles.projectWrapperFull}>
            <div className={styles.projectHead} st>
              <div className={styles.projectIndex}>
                {useThreeDig(widgetContent.i)}
              </div>
              <div className={styles.projectTitle}>{widgetContent.title}</div>
              <div className={styles.projectArrow} onClick={() => setIndex(4)}>
                <SlArrowLeft />
              </div>
            </div>
            <div className={styles.projectTextFull}>
              <PortableText content={widgetContent.description} />
            </div>
          </div>

          {widgetContent.credits ? (
            <div className={styles.projectCredits}>
              {widgetContent.credits.map((entry, i) => (
                <div key={i} className={styles.projectCreditsPair}>
                  <p className={styles.projectCreditsHead}>{entry.job}:</p>
                  <p>{entry.name}</p>
                </div>
              ))}
            </div>
          ) : (
            ""
          )}
        </div>

        {widgetContent.images && (
          <div className={styles.projectImagesWrapper}>
            {widgetContent.images.map((image, i) => (
              <div
                className={styles.projectImage}
                style={{
                  height: `${
                    300 / image.asset.metadata.dimensions.aspectRatio
                  }px`,
                  background: image.asset.metadata.palette.vibrant.background,
                }}
                key={i}
              >
                <Image
                  src={urlFor(image.asset.url).width(600).quality(50).url()}
                  fill
                  style={{ objectFit: "contain" }}
                />
              </div>
            ))}
          </div>
        )}
        <div
          className={styles.projectContentMobile}
          style={{ maxHeight: `calc(${height}px - 130px` }}
        >
          <div className={styles.projectTextMobile}>
            <PortableText content={widgetContent.description} />
          </div>
          {widgetContent.credits ? (
            <div className={styles.projectCreditsMobile}>
              {widgetContent.credits.map((entry, i) => (
                <div key={i} className={styles.projectCreditsPair}>
                  <p className={styles.projectCreditsHead}>{entry.job}:</p>
                  <p>{entry.name}</p>
                </div>
              ))}
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
      <div className={styles.extendArrowUp}>
        <span onClick={() => setIndex(4)}>
          <SlArrowUp />
        </span>
      </div>
    </div>
  );
};

export default ProjectWidgetFull;
