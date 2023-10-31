import { useState } from "react";
import styles from "./widget.module.css";

import SwiperInner from "./SwiperInner";

import PortableText from "react-portable-text";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
const NewsEntry = ({ i, entry }) => {
  const [swiperIndex, setSwiperIndex] = useState(0);
  const [next, setNext] = useState(false);
  const [prev, setPrev] = useState(false);

  const dateFormatted = (date) =>
    new Date(date).toLocaleString("de-de", {
      month: "numeric",
      year: "numeric",
    });

  const nextFunction = () => {
    setNext(true), setTimeout(() => setNext(false), 10);
  };
  const prevFunction = () => {
    setPrev(true), setTimeout(() => setPrev(false), 10);
  };

  return (
    i != 0 && (
      <>
        <div className={styles.date}>
          {entry.date ? dateFormatted(entry.date) : "——/——"}
        </div>
        <div className={styles.newsContent}>
          <div className={styles.headline}>
            <p>
              <PortableText content={entry.headline} />
            </p>
          </div>
          <div className={styles.text}>
            <PortableText content={entry.text} />
          </div>
          {entry.images.length && (
            <>
              <div className={styles.images}>
                <div className={styles.swiperControls}>
                  <div onClick={prevFunction}></div>
                  <div onClick={nextFunction}></div>
                </div>
                <Swiper spaceBetween={5} slidesPerView={"auto"}>
                  {entry.images.map((image, i) => (
                    <SwiperSlide>
                      <SwiperInner
                        //   swiperHeight={swiperHeight}
                        image={image}
                        setSwiperIndex={setSwiperIndex}
                        i={i + 1}
                        swiperIndex={swiperIndex}
                        next={next}
                        prev={prev}
                        //   setControls={setControls}
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
              <div className={styles.index}>
                {swiperIndex} / {entry.images.length}
              </div>
            </>
          )}
        </div>
      </>
    )
  );
};

export default NewsEntry;
