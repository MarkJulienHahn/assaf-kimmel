import { useEffect, useState, useRef } from "react";
import styles from "../components/project.module.css";
import { urlFor } from "../hooks/useImageUrlBuilder";
import useWindowDimensions from "../hooks/useWindowDimensions";
import Image from "next/image";

const ProjectSwiperInner = ({
  image,
  swiperHeight,
  setSwiperIndex,
  swiperIndex,
  i,
  prev,
  next,
  setControls,
  setTranslation,
  length,
}) => {
  const [active, setActive] = useState(true);
  const [width, setWidth] = useState(null);
  const [url, setUrl] = useState(null);
  const [position, setPosition] = useState(null);
  const ref = useRef();

  const { windowWidth } = useWindowDimensions();

  // useEffect(() => {
  //   swiperSlide.isActive && setSwiperIndex(i);
  // }, [swiperSlide.isActive]);

  const getImageWidth = (height) => {
    return `${height * image.asset.metadata.dimensions.aspectRatio}vh`;
  };

  const swiperAction = () => {
    setTranslation(position), setSwiperIndex(i);
  };

  const swiperBackAction = () => {
    setTranslation(0), setSwiperIndex(0);
  };


  const getUrl = () => {
    return urlFor(image.asset.url)
      .width(Math.floor(windowWidth * 0.9))
      .quality(50)
      .url();
  };

  useEffect(() => {
    next && swiperIndex == i && swiper.slideNext();
  }, [next]);

  useEffect(() => {
    prev && swiperIndex == i && swiper.slidePrev();
  }, [prev]);

  useEffect(() => {
    i == swiperIndex ? setActive(true) : setActive(false);
  }, []);

  useEffect(() => {
    i == swiperIndex ? setActive(true) : setActive(false);
  }, [swiperIndex]);

  useEffect(() => {
    setWidth(ref.current?.clientHeight);
    setPosition(ref.current?.getBoundingClientRect().left);
  }, []);

  useEffect(() => {
    setUrl(getUrl());
  }, []);



  return (
    <div
      className={styles.imageWrapper}
      style={{
        // maxWidth: "calc(100vw - 2*var(--space-S))",
        // maxHeight: ref.current?.clientHeight,
        height: "92vh",
        width: getImageWidth(92),
        position: "relative",
        transform: active ? "scale(1)" : "scale(0.3)",
        transformOrigin: "bottom left",
        background: image.asset.metadata.palette.vibrant.background,
        // border: "2px solid red"
      }}
      onClick={swiperIndex + 1 != length ? swiperAction : swiperBackAction}
      ref={ref}
    >
      {" "}

      {url && (
        <Image
          fill
          src={urlFor(image.asset.url)
            .width(Math.floor(windowWidth * 0.9))
            .quality(50)
            .url()}
          // width={width}
          // height={getImageWidth(width, "px")}
          alt={image.alt}
          style={{
            objectFit: "contain",
            objectPosition: "top",
          }}
        />
      )}
    </div>
  );
};

export default ProjectSwiperInner;
