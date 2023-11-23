import { useEffect } from "react";
import styles from "./widget.module.css";
import PortableText from "react-portable-text";
import { usePathname } from "next/navigation";

const Intro2 = ({ setIndex, index, about }) => {
  const showDescription = () => setIndex(4);
  const pathname = usePathname();

  useEffect(() => {
    pathname !== "/" &&
      pathname !== "/projects" &&
      pathname !== "/about" &&
      pathname !== "/contact" &&
      pathname !== "/imprint" &&
      setTimeout(showDescription, 2000);
  }, []);

  return (
    <div className={styles.information}>
      <div>STUDIO&nbsp;ASSAF&nbsp;KIMMEL</div>
      {about?.loadingText && (
        <div>
          <PortableText content={about.loadingText} />
        </div>
      )}
    </div>
  );
};

export default Intro2;
