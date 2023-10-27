import PortableText from "react-portable-text";
import Image from "next/image";
import { use100vh } from "react-div-100vh";
import useWindowDimensions from "../hooks/useWindowDimensions";
import styles from "./placeholder.module.css";

const PlaceholderInfo = ({ info }) => {
  const height = use100vh();
  const { windowWidth } = useWindowDimensions();

  return (
    <div
      className={styles.infoContent}
      style={{ height: windowWidth < 600 ? `${height - 85}px` : "" }}
    >
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
