import { useState, useEffect, useRef } from "react";
import styles from "../components/project.module.css";

import ProjectMobileSwiper from "../components/ProjectMobileSwiper";

import { useInView } from "react-intersection-observer";
import useWindowDimensions from "../hooks/useWindowDimensions";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const Project = ({
  setIndex,
  project,
  setWidgetContent,
  scrollTrigger,
  i,
  delay,
}) => {
  const [swiperIndex, setSwiperIndex] = useState(0);
  const [nextImageIndex, setNextImageIndex] = useState(0);
  const [aspectRatio, setAspectRatio] = useState(null);

  const { ref, inView } = useInView({
    threshold: 1,
  });

  const { windowWidth, windowHeight } = useWindowDimensions();

  const anchorRef = useRef();

  const changeWidget = () => {
    setIndex(4), setWidgetContent(project);
    history.replaceState(null, "", `/${project.slug.current}`);
  };

  useEffect(() => {
    !delay && inView && changeWidget();
  }, [inView]);

  const handleSlideChange = () => {
    setNextImageIndex(swiperIndex + 1);
  };

  useEffect(() => {
    scrollTrigger == project.slug.current &&
      anchorRef.current.scrollIntoView({ block: "start", behavior: "smooth" });
  }, [scrollTrigger]);

  useEffect(() => {
    Object.assign(project, { i: i });
  }, []);

  useEffect(() => {
    setAspectRatio(windowWidth / windowHeight);
  }, [windowWidth]);

  return (
    <>
      <div
        // className={styles.sliderOuter}
        style={{
          marginTop: aspectRatio > 1 ? "200px" : "0px",
        }}
        ref={ref}
      >
        <div className={styles.sliderWrapper} ref={anchorRef}>
          {/* <div className={styles.anchor}></div> */}
          <Swiper
            spaceBetween={5}
            slidesPerView={"auto"}
            onSlideChange={handleSlideChange}
          >
            {project.images.map((image, i) => (
              <SwiperSlide key={i}>
                <ProjectMobileSwiper
                  image={image}
                  i={i}
                  setSwiperIndex={setSwiperIndex}
                  aspectRatio={aspectRatio}
                  windowWidth={windowWidth}
                  nextImageIndex={nextImageIndex}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div className={styles.index}>
          0{swiperIndex + 1} 0{project.images.length}
        </div>
      </div>
    </>
  );
};

export default Project;
