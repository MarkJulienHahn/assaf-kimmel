import { useEffect, useState, useRef } from "react";
import styles from "../components/project.module.css";
import { urlFor } from "../hooks/useImageUrlBuilder";
import useWindowDimensions from "../hooks/useWindowDimensions";
import Image from "next/image";

const ProjectSwiperInner = ({
  image,
  setSwiperIndex,
  swiperIndex,
  i,
  setTranslation,
}) => {
  const [active, setActive] = useState(true);
  const [url, setUrl] = useState(null);
  const [position, setPosition] = useState({ next: 0, prev: 0 });
  const [currentPosition, setCurrentPosition] = useState(0);
  const [currentWidth, setCurrentWidth] = useState(0);

  const ref = useRef();

  const { windowWidth } = useWindowDimensions();

  const getImageWidth = (height) => {
    return `${height * image.asset.metadata.dimensions.aspectRatio}vh`;
  };
  const getUrl = () => {
    return urlFor(image.asset.url)
      .width(Math.floor(windowWidth * 0.9))
      .quality(50)
      .url();
  };

  // SWIPER FUNCTIONS

  const swiperFunction = () => {
    if (active && swiperIndex != 0) {
      setTranslation(position.next - currentPosition), setSwiperIndex(i - 1);
    } else if (i == 0) {
      setTranslation(currentWidth), setSwiperIndex(i + 1);
    } else setTranslation(position.next - 40), setSwiperIndex(i);
  };

  const nextFct = async () => {
    setPosition((prevState) => ({
      ...prevState,
      next: ref.current?.getBoundingClientRect().left,
    }));
  };

  const prevFct = () => {
    setPosition((prevState) => ({
      ...prevState,
      prev: position.next - currentPosition,
    }));
  };

  const currentFct = () => {
    i - 1 == swiperIndex &&
      setCurrentPosition(ref.current?.getBoundingClientRect().left),
      active && setCurrentWidth(ref.current?.clientWidth);
  };

  useEffect(() => {
    i == swiperIndex ? setActive(true) : setActive(false);
    setTimeout(currentFct, 500);
  }, [swiperIndex]);

  useEffect(() => {
    setTimeout(nextFct, 500);
    setTimeout(prevFct, 500);
    i == swiperIndex ? setActive(true) : setActive(false);
    setUrl(getUrl());
  }, []);

  return (
    <>
      <div
        className={styles.imageWrapper}
        style={{
          height: "92vh",
          width: getImageWidth(92),
          position: "relative",
          transform: active ? "scale(1)" : "scale(0.3)",
          transformOrigin: "bottom left",
          background: image.asset.metadata.palette.vibrant.background,
          marginLeft: active ? "var(--space-M)" : "5px",
        }}
        onClick={swiperFunction}
        ref={ref}
      >
        <div
          className={
            active && swiperIndex != 0 ? styles.leftArrow : styles.rightArrow
          }
        >
          {url && (
            <Image
              fill
              src={url}
              alt={image.alt ? image.alt : "An Image by Assaf Kimmel"}
              style={{
                objectFit: "contain",
                objectPosition: "top",
              }}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default ProjectSwiperInner;
