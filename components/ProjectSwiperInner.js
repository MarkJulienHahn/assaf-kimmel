import { useEffect, useState, useRef } from "react";
import styles from "../components/project.module.css";
import { urlFor } from "../hooks/useImageUrlBuilder";
import useWindowDimensions from "../hooks/useWindowDimensions";
import Image from "next/image";

const ProjectSwiperInner = ({
  i,
  image,
  setSwiperIndex,
  swiperIndex,
  setTranslation,
  sliderTrigger,
  translation,
  length
}) => {
  const [active, setActive] = useState(true);
  const [last, setLast] = useState(false)
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
    i == length - 1 ? setLast(true) : setLast(false);
    setTimeout(currentFct, 500);
  }, [swiperIndex]);

  useEffect(() => {
    setTimeout(nextFct, 500);
    setTimeout(prevFct, 500);
    i == swiperIndex ? setActive(true) : setActive(false);
    setUrl(getUrl());
  }, []);

  useEffect(() => {
    if (active && sliderTrigger == "right" && i == 0) {
      setTranslation(currentWidth), setSwiperIndex(i + 1);
    } else if (active && sliderTrigger == "right" && i != 0 && !last) {
      setTranslation(translation + currentWidth + 5), setSwiperIndex(i + 1);
    } else if (active && sliderTrigger == "left" && i == 0) {
      return;
    } else if (active && sliderTrigger == "left" && i != 0) {
      setTranslation(position.next - currentPosition - 5), setSwiperIndex(i - 1);
    } else return;
  }, [sliderTrigger]);

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
          opacity: i > swiperIndex + 1 ? "0" : "1",
        }}
        ref={ref}
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
    </>
  );
};

export default ProjectSwiperInner;
