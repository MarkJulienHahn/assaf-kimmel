import { useState, useEffect } from "react";
import { useSwiper, useSwiperSlide } from "swiper/react";
import Image from "next/image";
import { urlFor } from "../hooks/useImageUrlBuilder";


const ProjectMobileSwiper = ({ image, i, setSwiperIndex, aspectRatio, windowWidth }) => {
  const [url, setUrl] = useState(null);


  const swiper = useSwiper();
  const swiperSlide = useSwiperSlide();


  const getUrl = () => {
    return urlFor(image.asset.url)
      .width(Math.floor(windowWidth * 1.5))
      .quality(50)
      .format("jpg")
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
          }}
        />
      )}
    </div>
  );
};

export default ProjectMobileSwiper;
