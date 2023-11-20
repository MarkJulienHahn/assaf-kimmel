import { useEffect, useState, useRef } from "react";
import styles from "../components/project.module.css";
import { urlFor } from "../hooks/useImageUrlBuilder";
import useWindowDimensions from "../hooks/useWindowDimensions";
import Image from "next/image";

const ProjectSwiperInnerDesktop = ({
  i,
  image,
  setSwiperIndex,
  swiperIndex,
  setTranslation,
  sliderTrigger,
  translation,
  length,
}) => {
  const [active, setActive] = useState(true);
  const [last, setLast] = useState(false);
  const [url, setUrl] = useState(null);
  const [currentPosition, setCurrentPosition] = useState(0);
  const [currentWidth, setCurrentWidth] = useState(0);
  const [initial, setInitial] = useState(true);
  const [imgLoaded, setImgLoaded] = useState(false);

  const ref = useRef();

  const { windowWidth } = useWindowDimensions();

  const getImageWidth = (height) => {
    return height * image.asset.metadata.dimensions.aspectRatio;
  };
  const getUrl = () => {
    return urlFor(image.asset.url)
      .width(Math.floor(windowWidth * 0.9))
      .quality(50)
      .url();
  };

  // SWIPER FUNCTIONS

  const currentFct = () => {
    i - 1 == swiperIndex &&
      setCurrentPosition(ref.current?.getBoundingClientRect().left),
      active && setCurrentWidth(ref.current?.clientWidth);
  };

  useEffect(() => {
    i == swiperIndex ? setActive(true) : setActive(false);
    i == length - 1 ? setLast(true) : setLast(false);
    setTimeout(currentFct, 700);
  }, [swiperIndex, windowWidth]);

  useEffect(() => {
    i == swiperIndex ? setActive(true) : setActive(false);
    setUrl(getUrl());
  }, []);

  useEffect(() => {
    if (active && sliderTrigger == "right" && i == 0 && !initial) {
      setTranslation(currentWidth + 5),
        setSwiperIndex(i + 1),
        setInitial(false);
    }

    if (active && sliderTrigger == "right" && i == 0 && initial) {
      setTranslation(currentWidth * 0.3 + 5),
        setSwiperIndex(i + 1),
        setInitial(false);
    } else if (active && sliderTrigger == "right" && i != 0 && !last) {
      setTranslation(translation + currentWidth + 5),
        setSwiperIndex(i + 1),
        setInitial(false);
    } else if (active && sliderTrigger == "left" && i == 0) {
      return;
    } else if (active && sliderTrigger == "left" && i != 0) {
      setTranslation(translation - currentPosition * 0.3 + 10),
        setSwiperIndex(i - 1),
        setInitial(false);
    } else return;
  }, [sliderTrigger]);

  return (
    <>
      <div
        className={styles.imageWrapper}
        style={{
          height: active
            ? "92vh"
            : `${
                (getImageWidth(92) * 0.3) /
                image.asset.metadata.dimensions.aspectRatio
              }vh`,
          width: active
            ? `${getImageWidth(92)}vh`
            : `${getImageWidth(92) * 0.3}vh`,
          position: "relative",
          transformOrigin: "bottom left",
          background: !imgLoaded
            ? image.asset.metadata.palette.vibrant.background
            : "none",
          marginLeft: active ? "var(--space-M)" : "5px",
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
            onLoad={() => setImgLoaded(true)}
            priority={swiperIndex + 3 <= i ? "true" : "false"}
          />
        )}
      </div>
    </>
  );
};

export default ProjectSwiperInnerDesktop;
