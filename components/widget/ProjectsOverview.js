import { useState, useEffect } from "react";

import styles from "./widget.module.css";
import ProjectOverviewRow from "./ProjectOverviewRow";
import PortableText from "react-portable-text";

import { SlArrowRight, SlArrowLeft } from "react-icons/sl";

import useWindowDimensions from "../../hooks/useWindowDimensions";
import { use100vh } from "react-div-100vh";
import { urlFor } from "../../hooks/useImageUrlBuilder";

import Image from "next/image";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const ProjectsOverview = ({ projects, setIndex, setScrollTrigger }) => {
  const [left, setLeft] = useState(false);
  const [right, setRight] = useState(false);
  const { windowWidth } = useWindowDimensions();
  const height = use100vh();

  const dirCleanUp = () => {
    setLeft(false), setRight(false);
  };

  const triggerCleanup = () => {
    setScrollTrigger(0);
  };

  const threeDig = (n) => {
    if (n + 1 < 10) return `00${n + 1}`;
    else return `0${n + 1}`;
  };

  useEffect(() => {
    history.replaceState(null, "", `/projects`);
  }, []);

  const scrollTriggerFct = (slug) => {
    setScrollTrigger(slug), setIndex(4);
    setTimeout(triggerCleanup, 500);
  };

  useEffect(() => {
    setTimeout(dirCleanUp, 100);
  }, [left, right]);

  return (
    <>
      <div className={styles.overviewNextButton} onClick={() => setRight(true)}>
        <SlArrowRight />
      </div>
      <div className={styles.overviewPrevButton} onClick={() => setLeft(true)}>
        <SlArrowLeft />
      </div>
      <div
        className={styles.outerFull}
        style={
          windowWidth <= 600
            ? { height: `calc(${height}px - 80px` }
            : { height: `calc(${height}px - 4 * var(--space-S)` }
        }
      >
        <div className={styles.left}></div>
        <div
          className={styles.overviewInner}
        >
          <Swiper spaceBetween={0} slidesPerView={"auto"}>
            {projects.map((project, i) => (
              <SwiperSlide key={i}>
                <ProjectOverviewRow
                  project={project}
                  key={i}
                  setScrollTrigger={setScrollTrigger}
                  setIndex={setIndex}
                  i={i}
                  left={left}
                  right={right}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div className={styles.overviewInnerMobile}>
          {projects.map((project, i) => (
            <div
              key={i}
              className={styles.overviewColumn}
              onClick={() => scrollTriggerFct(project.slug.current)}
            >
              <div className={styles.overviewHead}>
                <p className={styles.overviewIndex}>{threeDig(i)}</p>
                <p>{project.title}</p>
              </div>
              <div className={styles.overviewTextWrapper}>
                <div className={styles.overviewText}>
                  <PortableText content={project.shortDescription} />
                </div>
              </div>
              <div className={styles.overviewImagesMobile}>
                <Swiper spaceBetween={5} slidesPerView={"auto"}>
                  {project.images.map((image, i) => (
                    <SwiperSlide key={i}>
                      <div
                        style={{
                          height: "100px",
                          width: `${
                            image.asset.metadata.dimensions.aspectRatio * 100
                          }px`,
                          position: "relative",
                        }}
                      >
                        <Image
                          fill
                          src={urlFor(image.asset.url)
                            .width(400)
                            .quality(50)
                            .url()}
                          alt={
                            image.alt ? image.alt : "An Image by Assaf Kimmel"
                          }
                        />
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>{" "}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ProjectsOverview;
