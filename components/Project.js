import { useState, useEffect, useRef } from "react";
import styles from "../components/project.module.css";

import { useInView } from "react-intersection-observer";

import ProjectSwiperInner from "../components/ProjectSwiperInner";

const Project = ({
  setIndex,
  project,
  setWidgetContent,
  scrollTrigger,
  i,
  delay,
}) => {
  const [swiperIndex, setSwiperIndex] = useState(0);
  const [width, setWidth] = useState(null);
  const [translation, setTranslation] = useState(0);
  const [sliderTrigger, setSliderTrigger] = useState(null);

  const { ref, inView } = useInView({
    threshold: 0.6,
  });

  const anchorRef = useRef();
  const wrapperRef = useRef();

  const handleSliderTrigger = (dir) => {
    const resetSliderTrigger = () => {
      setSliderTrigger(null);
    };

    if (dir == "left") {
      setSliderTrigger("left");
      setTimeout(resetSliderTrigger, 100);
    } else if (dir == "right") {
      setSliderTrigger("right");
      setTimeout(resetSliderTrigger, 100);
    }
  };

  const changeWidget = () => {
    setIndex(4), setWidgetContent(project);
    history.replaceState(null, "", `/${project.slug.current}`);
  };

  useEffect(() => {
    !delay && inView && changeWidget();
  }, [inView]);

  useEffect(() => {
    !delay && anchorRef.current.scrollIntoView({ behavior: "smooth" }),
      !delay && setIndex(4);
  }, [swiperIndex]);

  useEffect(() => {
    scrollTrigger == project.slug.current &&
      anchorRef.current.scrollIntoView({ block: "start", behavior: "smooth" });
  }, [scrollTrigger]);

  useEffect(() => {
    setWidth(wrapperRef.current?.clientWidth);
    Object.assign(project, { i: i });
  }, []);

  // console.log(swiperIndex, translation);

  return (
    <>
      <div className={styles.sliderOuter}>
        <div className={styles.sliderControls}>
          <div
            className={swiperIndex != 0 && styles.leftArrow}
            onClick={() => handleSliderTrigger("left")}
          ></div>
          <div
            className={
              swiperIndex < project.images.length - 1 && styles.rightArrow
            }
            onClick={() => handleSliderTrigger("right")}
          ></div>
        </div>
        <div
          className={styles.sliderWrapper}
          style={{
            width: width,
            transform: swiperIndex ? `translateX(-${translation}px)` : "",
          }}
        >
          <div className={styles.anchor} ref={anchorRef}></div>
          <div ref={wrapperRef} style={{ display: "flex" }}>
            {project.images.map((image, i) => (
              <ProjectSwiperInner
                key={i}
                image={image}
                swiperIndex={swiperIndex}
                setSwiperIndex={setSwiperIndex}
                setTranslation={setTranslation}
                translation={translation}
                sliderTrigger={sliderTrigger}
                length={project.images.length}
                i={i}
              />
            ))}
          </div>
        </div>
        <div className={styles.index} ref={ref}>
          0{swiperIndex + 1} 0{project.images.length}
        </div>
      </div>
    </>
  );
};

export default Project;
