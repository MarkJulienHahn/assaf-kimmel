import styles from "./widget.module.css";
import PortableText from "react-portable-text";
import Image from "next/image";

const About = ({ about }) => {
  return (
    <div className={styles.outer}>
      <div className={styles.left}></div>
      <div className={styles.inner}>
        <div className={styles.aboutName}>Assaf Kimmel</div>
        <div className={styles.aboutContent}>
          <PortableText content={about.text} />
          <div className={styles.aboutImage}>
            <Image fill src={about.image.asset.url} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
