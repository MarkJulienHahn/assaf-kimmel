import { useState, useEffect } from "react";
import { useSwiper, useSwiperSlide } from "swiper/react";
import Image from "next/image";
import { urlFor } from "../hooks/useImageUrlBuilder";

const ProjectMobileSwiper = ({
  image,
  i,
  setSwiperIndex,
  aspectRatio,
  windowWidth,
  nextImageIndex,
}) => {
  const [url, setUrl] = useState(null);
  const [loaded, setLoaded] = useState(null);

  const swiper = useSwiper();
  const swiperSlide = useSwiperSlide();

  const getUrl = () => {
    return urlFor(image.asset.url)
      .width(Math.floor(windowWidth * 15))
      .quality(50)
      .format("jpg")
      .url();
  };

  useEffect(() => {
    swiperSlide.isActive && setSwiperIndex(i);
  }, [swiperSlide.isActive]);

  useEffect(() => {
    i - 3 <= 0 && setUrl(getUrl());
  }, [nextImageIndex]);

  useEffect(() => {
    setUrl(getUrl());
  }, []);

  console.log(i, nextImageIndex);

  return (
    <div
      style={{
        width: "100vw",
        height: aspectRatio > 1 ? "calc(100vh - 2 * var(--space-M))" : "60vh",
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

      <div
        style={{
          position: "absolute",
          left: "var(--space-S)",
          bottom: 0,
          width: "calc(100vw - 2*var(--space-S))",
          height: `calc(${
            100 / image.asset.metadata.dimensions.aspectRatio
          }vw - 2*var(--space-S))`,
          background: !loaded
            ? "white"
            : // ? "blue"
              "transparent",
          zIndex: "10",
        }}
      ></div>

      {url && (
        <Image
          fill
          src={url}
          alt={image.alt}
          // placeholder={"blur"}
          // blurDataURL={image.asset.metadata.lqip}
          style={{
            objectFit: "contain",
            objectPosition: "bottom left",
            padding: "0 var(--space-S)",
            zIndex: "20",
          }}
          // priority={i < 3 ? true : false}
          onLoad={() => setLoaded(true)}
        />
      )}
    </div>
  );
};

export default ProjectMobileSwiper;
