import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import styles from "./widget.module.css";
import { useSwiper } from "swiper/react";
import { useSwiperSlide } from "swiper/react";
import { urlFor } from "../../hooks/useImageUrlBuilder";

const SwiperInner = ({
  image,
  swiperHeight,
  setSwiperIndex,
  swiperIndex,
  i,
  prev,
  next,
  setControls,
}) => {
  const swiper = useSwiper();
  const swiperSlide = useSwiperSlide();

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
      // style={{
      //   maxWidth: "calc(100vw - 2*var(--space-S))",
      //   maxHeight: ref.current?.clientHeight,
      // }}
      onClick={() => swiper.slideNext()}
    >
      <Image
        src={urlFor(image.asset.url).height(500).quality(50).url()}
        height={200}
        width={200 * image.asset.metadata.dimensions.aspectRatio}
        alt={image.alt}
        style={{
          objectFit: "contain",
          objectPosition: "top",
          background: image.asset.metadata.palette.vibrant.background,
        }}
        // ref={ref}
      />
    </div>
  );
};

export default SwiperInner;
