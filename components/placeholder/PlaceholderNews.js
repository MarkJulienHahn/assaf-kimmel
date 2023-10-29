import { useState, useEffect, useRef } from "react";

import PortableText from "react-portable-text";

import styles from "./placeholder.module.css";

import SwiperInner from "./SwiperInner";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const PlaceholderNews = ({ news }) => {
  const [swiperHeight, setSwiperHeight] = useState(0);
  const [swiperIndex, setSwiperIndex] = useState(0);
  const [next, setNext] = useState(false);
  const [prev, setPrev] = useState(false);
  const [controls, setControls] = useState(true);

  const ref = useRef();

  const nextFunction = () => {
    setNext(true), setTimeout(() => setNext(false), 10);
  };
  const prevFunction = () => {
    setPrev(true), setTimeout(() => setPrev(false), 10);
  };

  useEffect(() => {
    ref.current && setSwiperHeight(ref.current.clientHeight);
  }, [ref.current]);

  return (
    <div className={styles.content}>
      <div className={styles.textBox} ref={ref}>
        <div className={styles.headline}>
          <p className={styles.index}>001</p>
          <PortableText content={news.headline} />
        </div>
        <div className={styles.text}>
          <PortableText content={news.text} />
          <p className={styles.date}>1 — 19/11/2023</p>
        </div>
      </div>

      <div className={styles.swiperWrapper}>
        {controls ? (
          <div
            className={styles.swiperControls}
            style={{
              height: `calc(100vh - ${swiperHeight}px - 120px)`,
              maxWidth: "calc(100vw - 4*var(--space-S)",
            }}
          >
            <div
              onClick={prevFunction}
              style={{ cursor: swiperIndex != 1 ? "w-resize" : "default" }}
            ></div>
            <div
              onClick={nextFunction}
              style={{
                cursor:
                  swiperIndex != news.images.length ? "e-resize" : "default",
              }}
            ></div>
          </div>
        ) : (
          ""
        )}
        {swiperHeight ? (
          <Swiper spaceBetween={5} slidesPerView={"auto"}>
            {news.images.map((image, i) => (
              <SwiperSlide key={i}>
                <SwiperInner
                  swiperHeight={swiperHeight}
                  image={image}
                  setSwiperIndex={setSwiperIndex}
                  i={i + 1}
                  swiperIndex={swiperIndex}
                  next={next}
                  prev={prev}
                  setControls={setControls}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <div
            className={styles.swiperIndex}
            style={{
              height: `calc(100vh - ${swiperHeight}px - 120px)`,
            }}
          >
            Loading...
          </div>
        )}
      </div>

      <p className={styles.swiperIndex}>
        {swiperIndex} / {news.images.length}
      </p>
    </div>
  );
};

export default PlaceholderNews;
