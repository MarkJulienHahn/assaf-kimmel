import { useEffect } from "react";
import Image from "next/image";
import styles from "./placeholder.module.css";
import { useSwiper } from "swiper/react";
import { useSwiperSlide } from "swiper/react";

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
        height: `calc(100vh - ${swiperHeight}px - 120px)`,
        width: `calc((100vh - ${swiperHeight}px - 120px) * ${image.asset.metadata.dimensions.aspectRatio})`,
        maxWidth: "100vw",
        background: image.asset.metadata.palette.vibrant.background
      }}
      onClick={() => swiper.slideNext()}

    >
      <Image
        src={image.asset.url}
        fill
        alt={image.alt}
        style={{ objectFit: "contain" }}
      />
    </div>
  );
};

export default SwiperInner;
