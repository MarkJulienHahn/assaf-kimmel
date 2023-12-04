import { useState } from "react";
import styles from "./widget.module.css";

import SwiperInner from "./SwiperInner";

import PortableText from "react-portable-text";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
const NewsEntry = ({ i, entry, setScrollTrigger, setLockScroll }) => {
  const [swiperIndex, setSwiperIndex] = useState(0);
  const [next, setNext] = useState(false);
  const [prev, setPrev] = useState(false);

  const dateFormatted = (date) =>
    new Date(date).toLocaleString("en-us", {
      month: "numeric",
      year: "numeric",
    });

  const showProject = (slug) => {
    setScrollTrigger(slug);
  };

  const scrollTriggerCallback = () => {
    setScrollTrigger(entry.project.slug.current.toString());
  };

  const triggerCleanup = () => {
    setScrollTrigger(null);
  };

  const scrollTriggerFct = () => {
    setLockScroll(false);
    // setIndex(4);
    setTimeout(scrollTriggerCallback, 200);
    setTimeout(triggerCleanup, 2000);
  };

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
          {entry.date ? dateFormatted(entry.date) : ""}
        </div>
        <div className={styles.newsContent}>
          {entry.headline && (
            <div className={styles.headline}>
              <PortableText content={entry.headline} />
            </div>
          )}
          {entry.text && (
            <div className={styles.text}>
              <PortableText content={entry.text} />
            </div>
          )}

          {entry.project?.slug && (
            <div
              className={styles.link}
              onClick={() => scrollTriggerFct(entry.project.slug.current)}
            >
              <span>Show Project</span>
            </div>
          )}

          {entry.images.length && (
            <div>
              <div className={styles.images}>
                <div className={styles.swiperControls}>
                  {entry.images.length > 1 && (
                    <>
                      <div
                        className={styles.swiperControlLeft}
                        onClick={prevFunction}
                      ></div>

                      <div
                      // muss da bleiben für Selection in Safari ..
                      ></div>
                    </>
                  )}
                </div>
                {entry.images.length > 1 ? (
                  <div className={styles.swiperControlRight}>
                    <Swiper spaceBetween={5} slidesPerView={"auto"}>
                      {entry.images.map((image, i) => (
                        <SwiperSlide key={i}>
                          <SwiperInner
                            image={image}
                            setSwiperIndex={setSwiperIndex}
                            i={i + 1}
                            swiperIndex={swiperIndex}
                            next={next}
                            prev={prev}
                          />
                        </SwiperSlide>
                      ))}
                    </Swiper>
                  </div>
                ) : (
                  <Swiper spaceBetween={5} slidesPerView={"auto"}>
                    {entry.images.map((image, i) => (
                      <SwiperSlide key={i}>
                        <SwiperInner
                          image={image}
                          setSwiperIndex={setSwiperIndex}
                          i={i + 1}
                          swiperIndex={swiperIndex}
                          next={next}
                          prev={prev}
                        />
                      </SwiperSlide>
                    ))}
                  </Swiper>
                )}
              </div>
              <div className={styles.index}>
                {swiperIndex} / {entry.images.length}
              </div>
            </div>
          )}
        </div>
      </>
    )
  );
};

export default NewsEntry;
