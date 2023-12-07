import { useState, useEffect, useRef } from "react";
import styles from "../components/project.module.css";

import { useInView } from "react-intersection-observer";

import ProjectSwiperInnerDesktop from "./ProjectSwiperInnerDesktop";
import ProjectSwiperInnerTablet from "./ProjectSwiperInnerTablet";

import useWindowDimensions from "../hooks/useWindowDimensions";

const Project = ({
  setIndex,
  project,
  setWidgetContent,
  scrollTrigger,
  i,
  isTouchDevice,
  delay,
}) => {
  const [swiperIndex, setSwiperIndex] = useState(0);
  const [width, setWidth] = useState(null);
  const [translation, setTranslation] = useState(0);
  const [sliderTrigger, setSliderTrigger] = useState(null);
  const [sliderDelay, setSliderDelay] = useState(false);
  const [touchStartX, setTouchStartX] = useState(null);
  const [touchEndX, setTouchEndX] = useState(null);

  // Function to handle touch start event
  const handleTouchStart = (e) => {
    setTouchStartX(e.touches[0].clientX);
  };

  // Function to handle touch end event and trigger swipe action if applicable
  const handleTouchEnd = (e) => {
    if (touchStartX && touchEndX) {
      const touchDifference = touchEndX - touchStartX;
      const minSwipeDistance = 50; // Adjust this threshold as needed

      if (touchDifference > minSwipeDistance) {
        // Perform swipe-left action here
        handleSliderTrigger("left");
      } else handleSliderTrigger("right");
    }
    // Reset touch start and end positions
    setTouchStartX(null);
    setTouchEndX(null);
  };

  const { ref, inView } = useInView({
    threshold: 0.4,
  });

  const anchorRef = useRef();
  const wrapperRef = useRef();

  const handleSliderDelay = () => {
    setSliderDelay(false);
  };

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

  const handleResize = () => {
    !isTouchDevice && window.location.reload();
  };

  useEffect(() => {
    !delay && inView && changeWidget();
  }, [inView]);

  useEffect(() => {
    translation && setSliderDelay(true), setTimeout(handleSliderDelay, 1001);
    !delay && changeWidget();
  }, [translation]);

  useEffect(() => {
    !delay && anchorRef.current.scrollIntoView({ behavior: "smooth" }),
      !delay && setIndex(4);
  }, [swiperIndex]);

  const scrollFct = () => {
    anchorRef.current.scrollIntoView({
      block: "start",
      behavior: "smooth",
    });
  };

  useEffect(() => {
    scrollTrigger == project.slug.current && setTimeout(scrollFct, 500);
    setIndex(4);
  }, [scrollTrigger]);

  useEffect(() => {
    setWidth(wrapperRef.current?.clientWidth);
    Object.assign(project, { i: i });
  }, []);

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isTouchDevice]);

  console.log(scrollTrigger, project.slug.current)

  return (
    <>
      <div className={styles.sliderOuter}>
        <div
          className={styles.sliderControls}
          onTouchStart={handleTouchStart}
          onTouchEnd={(e) => {
            setTouchEndX(e.changedTouches[0].clientX);
            handleTouchEnd(e);
          }}
        >
          <div
            className={swiperIndex != 0 && styles.leftArrow}
            onClick={
              !sliderDelay ? () => handleSliderTrigger("left") : () => {}
            }
          ></div>
          <div
            className={
              swiperIndex < project.images.length - 1 && styles.rightArrow
            }
            onClick={
              !sliderDelay ? () => handleSliderTrigger("right") : () => {}
            }
          ></div>
        </div>

        <div className={styles.widgetAnchor} ref={ref}></div>
        <div
          className={styles.sliderWrapper}
          style={{
            height: "92vh",
            width: width,
            transform: swiperIndex ? `translateX(-${translation}px)` : "",
          }}
        >
          <div className={styles.anchor} ref={anchorRef}></div>

          <div
            ref={wrapperRef}
            style={{ display: "flex", alignItems: "flex-end" }}
          >
            {project.images.map((image, i) => (
              <>
                <div className={styles.desktop}>
                  <ProjectSwiperInnerDesktop
                    key={i}
                    image={image}
                    swiperIndex={swiperIndex}
                    setSwiperIndex={setSwiperIndex}
                    setTranslation={setTranslation}
                    translation={translation}
                    sliderTrigger={sliderTrigger}
                    length={project.images.length}
                    i={i}
                    slug={project.slug.current}
                  />
                </div>
                <div className={styles.tablet}>
                  <ProjectSwiperInnerTablet
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
                </div>
              </>
            ))}
          </div>
        </div>
        <div className={styles.index}>
          0{swiperIndex + 1} 0{project.images.length}
        </div>
      </div>
    </>
  );
};

export default Project;
