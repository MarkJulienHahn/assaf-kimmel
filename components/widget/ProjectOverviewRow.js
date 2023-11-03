import styles from "./widget.module.css";
import PortableText from "react-portable-text";

import { urlFor } from "../../hooks/useImageUrlBuilder";
import { useThreeDig } from "../../hooks/useThreeDig";

import Image from "next/image";

const ProjectOverviewRow = ({ project, i, setIndex, setScrollTrigger }) => {
  const triggerCleanup = () => {
    setScrollTrigger(0);
  };

  const scrollTriggerFct = () => {
    setScrollTrigger(project.slug.current), setIndex(4);
    setTimeout(triggerCleanup, 500);
  };

  return (
    <div key={i} className={styles.overviewColumn} onClick={scrollTriggerFct}>
      <div className={styles.overviewHead}>
        <p className={styles.overviewIndex}>{useThreeDig(i)}</p>
        <p>{project.title}</p>
      </div>
      <div className={styles.overviewText}>
        <PortableText content={project.shortDescription} />
      </div>
      <div className={styles.overviewImagesWrapper}>
        {project.images.map((image, i) => (
          <>
            {image.asset.metadata.dimensions.aspectRatio > 1 ? (
              <div
                className={styles.overviewImage}
                key={i}
                style={{
                  width: "200px",
                  height: `${
                    200 / image.asset.metadata.dimensions.aspectRatio
                  }px`,
                }}
              >
                <Image
                  fill
                  src={urlFor(image.asset.url).width(400).quality(50).url()}
                  alt={image.alt ? image.alt : "An Image by Assaf Kimmel"}
                />
              </div>
            ) : (
              <div
                className={styles.overviewImage}
                key={i}
                style={{
                  width: "150px",
                  height: `${
                    150 / image.asset.metadata.dimensions.aspectRatio
                  }px`,
                }}
              >
                <Image
                  fill
                  src={urlFor(image.asset.url).width(200).quality(50).url()}
                  alt={image.alt ? image.alt : "An Image by Assaf Kimmel"}
                />
              </div>
            )}
          </>
        ))}
      </div>
    </div>
  );
};

export default ProjectOverviewRow;