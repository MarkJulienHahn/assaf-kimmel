import { useEffect } from "react";

import styles from "./widget.module.css";
import PortableText from "react-portable-text";

import { urlFor } from "../../hooks/useImageUrlBuilder";

import Image from "next/image";

const About = ({ about }) => {
  useEffect(() => {
    history.replaceState(null, "", `/about`);
  }, []);

  return (
    <div className={styles.outer}>
      <div className={styles.left}></div>
      <div className={styles.inner}>
        <div className={styles.aboutName}>Assaf Kimmel</div>
        <div className={styles.aboutContent}>
          <PortableText content={about.text} />
          <div
            className={styles.aboutImage}
            style={{
              background: about.image.asset.metadata.palette.vibrant.background,
            }}
          >
            <Image fill src={urlFor(about.image.asset.url).width(500).url()} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
