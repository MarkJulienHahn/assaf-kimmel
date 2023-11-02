import { useState } from "react";

import { SlArrowLeft } from "react-icons/sl";

import styles from "./widget.module.css";
import PortableText from "react-portable-text";
import Image from "next/image";

import { urlFor } from "../../hooks/useImageUrlBuilder";
import { useThreeDig } from "../../hooks/useThreeDig";

const ProjectWidgetFull = ({ widgetContent, setIndex }) => {
  const [url, setUrl] = useState(null);

  return (
    <div className={styles.outerProject}>
      <div className={styles.left}></div>
      <div className={styles.inner}>
        <div className={styles.projectWrapperFull}>
          <div className={styles.projectHead}>
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
                <p>{entry.name}</p>
                <p className={styles.projectCreditsHead}>{entry.job}:</p>
              </div>
            ))}
          </div>
        ) : (
          ""
        )}

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
      </div>
    </div>
  );
};

export default ProjectWidgetFull;
