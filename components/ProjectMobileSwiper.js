import { useState, useEffect } from "react";
import { useSwiper, useSwiperSlide } from "swiper/react";
import Image from "next/image";
import { urlFor } from "../hooks/useImageUrlBuilder";
import useWindowDimensions from "../hooks/useWindowDimensions";

const ProjectMobileSwiper = ({ image, i, setSwiperIndex }) => {
  const [url, setUrl] = useState(null);

  const swiper = useSwiper();
  const swiperSlide = useSwiperSlide();

  const { windowWidth, windowHeight } = useWindowDimensions();

  const getUrl = () => {
    return urlFor(image.asset.url)
      .width(Math.floor(windowWidth * 0.9))
      .quality(50)
      .url();
  };

  useEffect(() => {
    swiperSlide.isActive && setSwiperIndex(i);
  }, [swiperSlide.isActive]);

  useEffect(() => {
    setUrl(getUrl());
  }, []);

  return (
    <div
      style={{
        width: "100vw",
        height: "calc(100vh - 2 * var(--space-M))",
        display: "flex",
      }}
    >
      <div
        style={{
          position: "absolute",
          height: "100%",
          width: "50%",
          zIndex: "100",
        }}
        onClick={() => swiper.slidePrev()}
      ></div>
      <div
        style={{
          position: "absolute",
          right: 0,
          height: "100%",
          width: "50%",
          zIndex: "100",
        }}
        onClick={() => swiper.slideNext()}
      ></div>

      {url && (
        <Image
          fill
          src={url}
          alt={image.alt}
          placeholder={"blur"}
          blurDataURL={image.asset.metadata.lqip}
          style={{
            objectFit: "contain",
            objectPosition: "bottom left",
            padding: "0 var(--space-S)",
          }}
        />
      )}
    </div>
  );
};

export default ProjectMobileSwiper;
