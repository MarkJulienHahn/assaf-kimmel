import PortableText from "react-portable-text";
import Image from "next/image";

import styles from "./placeholder.module.css";

const PlaceholderInfo = ({ info }) => {
  return (
    <div className={styles.infoContent}>
      <div className={styles.infoText}>
        <PortableText content={info.text} />
      </div>
      <Image
        src={info.image.asset.url}
        width={200}
        height={200 / info.image.asset.metadata.dimensions.aspectRatio}
        alt={info.alt}
      />
    </div>
  );
};

export default PlaceholderInfo;
