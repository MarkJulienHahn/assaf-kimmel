import { useEffect } from "react";
import { useSwiper, useSwiperSlide } from "swiper/react";
import Image from "next/image";
import { urlFor } from "../hooks/useImageUrlBuilder";

const ProjectMobileSwiper = ({ image, i, setSwiperIndex }) => {
  const swiper = useSwiper();
  const swiperSlide = useSwiperSlide();

  useEffect(() => {
    swiperSlide.isActive && setSwiperIndex(i);
  }, [swiperSlide.isActive]);

  return (
    <div style={{ width: "100vw", height: "100vw", display: "flex" }}>
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
      <Image
        fill
        src={urlFor(image.asset.url).width(1000).quality(50).url()}
        alt={image.alt}
        placeholder={"blur"}
        blurDataURL={image.asset.metadata.lqip}
        style={{
          objectFit: "contain",
          objectPosition: "bottom left",
          padding: "0 var(--space-S)",
        }}
      />
    </div>
  );
};

export default ProjectMobileSwiper;
