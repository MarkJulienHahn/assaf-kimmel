import { useEffect, useRef } from "react";
import Image from "next/image";
import styles from "./placeholder.module.css";
import { useSwiper } from "swiper/react";
import { useSwiperSlide } from "swiper/react";
import useWindowDimensions from "../hooks/useWindowDimensions";

const SwiperInner = ({
  image,
  swiperHeight,
  setSwiperIndex,
  swiperIndex,
  i,
  prev,
  next,
}) => {
  const swiper = useSwiper();
  const swiperSlide = useSwiperSlide();

  const { windowWidth, windowHeight } = useWindowDimensions();

  const ref = useRef();
  const mobileImageWidth = windowWidth - 60;
  const imageHeight = windowHeight - swiperHeight - 120;

  useEffect(() => {
    swiperSlide.isActive && setSwiperIndex(i);
  }, [swiperSlide.isActive]);

  useEffect(() => {
    next && swiperIndex == i && swiper.slideNext();
  }, [next]);

  useEffect(() => {
    prev && swiperIndex == i && swiper.slidePrev();
  }, [prev]);

  return (
    <div
      className={styles.imageWrapper}
      style={{
        maxWidth: "calc(100vw - 2*var(--space-S))",
        maxHeight: ref.current?.clientHeight,
      }}
      onClick={() => swiper.slideNext()}
    >
      <Image
        src={image.asset.url}
        height={
          imageHeight * image.asset.metadata.dimensions.aspectRatio <
          windowWidth
            ? imageHeight
            : mobileImageWidth / image.asset.metadata.dimensions.aspectRatio
        }
        width={
          imageHeight * image.asset.metadata.dimensions.aspectRatio <
          windowWidth
            ? imageHeight * image.asset.metadata.dimensions.aspectRatio
            : mobileImageWidth
        }
        alt={image.alt}
        style={{
          objectFit: "contain",
          objectPosition: "top",
          background: image.asset.metadata.palette.vibrant.background,
        }}
        ref={ref}
      />
    </div>
  );
};

export default SwiperInner;
