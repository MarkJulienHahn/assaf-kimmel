import { useEffect } from "react";

import styles from "./widget.module.css";
import PortableText from "react-portable-text";

import useWindowDimensions from "../../hooks/useWindowDimensions";
import { urlFor } from "../../hooks/useImageUrlBuilder";
import { use100vh } from "react-div-100vh";

import Image from "next/image";

const About = ({ about }) => {
  const { windowWidth } = useWindowDimensions();
  const height = use100vh();

  useEffect(() => {
    history.replaceState(null, "", `/about`);
  }, []);

  return (
    <div
      className={styles.outer}
      style={
        windowWidth <= 600
          ? { height: `calc(${height}px - 75px` }
          : { height: "auto" }
      }
    >
      <div className={styles.left}></div>
      <div className={styles.inner}>
        <div className={styles.aboutName}>Assaf Kimmel</div>
        <div
          className={styles.aboutContent}
        >
          <PortableText content={about.text} />
          <div
            className={styles.aboutImage}
            style={{
              background: "lightgrey"
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
