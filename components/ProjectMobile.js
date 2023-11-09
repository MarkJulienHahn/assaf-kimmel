import { useState, useEffect, useRef } from "react";
import styles from "../components/project.module.css";

import ProjectMobileSwiper from "../components/ProjectMobileSwiper";

import { useInView } from "react-intersection-observer";

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
  const [width, setWidth] = useState(null);
  const [translation, setTranslation] = useState(0);
  const [sliderTrigger, setSliderTrigger] = useState(null);
  const [next, setNext] = useState(false);
  const [prev, setPrev] = useState(false);

  const { ref, inView, entry } = useInView({
    threshold: 1,
  });

  const anchorRef = useRef();
  const wrapperRef = useRef();

  const changeWidget = () => {
    setIndex(4), setWidgetContent(project);
    history.replaceState(null, "", `/${project.slug.current}`);
  };

  useEffect(() => {
    !delay && inView && changeWidget();
  }, [inView]);

  const nextFunction = () => {
    setNext(true), setTimeout(() => setNext(false), 10);
  };
  const prevFunction = () => {
    setPrev(true), setTimeout(() => setPrev(false), 10);
  };

  // useEffect(() => {
  //   !delay && anchorRef.current.scrollIntoView({ behavior: "smooth" }),
  //     !delay && setIndex(4);
  // }, [swiperIndex]);

  useEffect(() => {
    scrollTrigger == project.slug.current &&
      anchorRef.current.scrollIntoView({ block: "start", behavior: "smooth" });
  }, [scrollTrigger]);

  useEffect(() => {
    Object.assign(project, { i: i });
  }, []);

  return (
    <>
      <div className={styles.sliderOuter}>
        <div className={styles.sliderWrapper}>
          <div className={styles.anchor} ref={anchorRef}></div>
          <Swiper spaceBetween={5} slidesPerView={"auto"}>
            {project.images.map((image, i) => (
              <SwiperSlide key={i}>
                <ProjectMobileSwiper
                  image={image}
                  i={i}
                  setSwiperIndex={setSwiperIndex}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div className={styles.index} ref={ref}>
          0{swiperIndex + 1} 0{project.images.length}
        </div>
      </div>
    </>
  );
};

export default Project;