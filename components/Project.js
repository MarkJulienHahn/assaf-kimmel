import { useState, useEffect, useRef } from "react";
import styles from "../components/project.module.css";

import { useInView } from "react-intersection-observer";

import ProjectSwiperInner from "./ProjectSwiperInner";

const Project = ({ setIndex, project, setWidgetContent }) => {
  const [swiperIndex, setSwiperIndex] = useState(0);
  const [width, setWidth] = useState(null);
  const [delay, setDelay] = useState(true);
  const [translation, setTranslation] = useState(0);

  const { ref, inView, entry } = useInView({
    threshold: 0.6,
  });

  const anchorRef = useRef();
  const wrapperRef = useRef();

  // Delay so the scrollTo doesn't start on the first render
  const delayFct = () => {
    setDelay(false);
  };

  const changeWidget = () => {
    setIndex(4), setWidgetContent(project);
    // history.replaceState(null, "", `/${project.slug.current}`);
  };

  useEffect(() => {
    inView && changeWidget();
  }, [inView]);

  useEffect(() => {
    !delay && anchorRef.current.scrollIntoView({ behavior: "smooth" }),
      setIndex(4);
  }, [swiperIndex]);

  useEffect(() => {
    setWidth(wrapperRef.current?.clientWidth);
    setTimeout(delayFct, 1000);
  }, []);

  return (
    <>
      <div
        className={styles.sliderWrapper}
        style={{ width: width, transform: `translateX(-${translation}px)` }}
      >
        <div className={styles.anchor} ref={anchorRef}></div>
        <div ref={wrapperRef} style={{ display: "flex" }}>
          {project.images.map((image, i) => (
            <ProjectSwiperInner
              image={image}
              swiperIndex={swiperIndex}
              setSwiperIndex={setSwiperIndex}
              translation={translation}
              setTranslation={setTranslation}
              length={project.images.length}
              i={i}
            />
          ))}
        </div>
      </div>
      <div className={styles.index} ref={ref}>
        0{swiperIndex + 1} 0{project.images.length}
      </div>
    </>
  );
};

export default Project;
