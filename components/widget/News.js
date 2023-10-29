import { useState } from "react";

import styles from "./news.module.css";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const News = ({ setIndex, index }) => {
  return (
    <div className={styles.outer}>
      <div className={styles.left}></div>
      <div className={styles.inner}>
        <div className={styles.date}>10.2023</div>
        <div className={styles.content}>
          <div className={styles.headline}>
            <p>
              Performa reveals plans for mixed-use storefront space by
              Berlin-based architect Assaf Kimmel
            </p>
          </div>
          <div className={styles.text}>
            <p>
              Situated in the new art district of TriBeCa, the Performa Hub will
              anchor the Performa Biennial downtown and act as a prototype for a
              permanent brick-and-mortar space.
              <br />
              <br /> 1 — 19/11/2023
            </p>
          </div>
          <div className={styles.images}>
            <Swiper spaceBetween={5} slidesPerView={"auto"}>
              <SwiperSlide>
                <div
                  style={{
                    width: "500px",
                    height: "250px",
                    background: "grey",
                  }}
                ></div>
              </SwiperSlide>
              <SwiperSlide>
                <div
                  style={{
                    width: "500px",
                    height: "250px",
                    background: "grey",
                  }}
                ></div>
              </SwiperSlide>
              <SwiperSlide>
                <div
                  style={{
                    width: "400px",
                    height: "250px",
                    background: "grey",
                  }}
                ></div>
              </SwiperSlide>
            </Swiper>
          </div>
          <div className={styles.index}>1 / 3</div>
        </div>
      </div>
    </div>
  );
};

export default News;
