import { useState, useEffect } from "react";
import { SlArrowDown, SlArrowUp } from "react-icons/sl";
import styles from "./widget.module.css";

import useWindowDimensions from "../../hooks/useWindowDimensions";
import { use100vh } from "react-div-100vh";

import NewsEntry from "./NewsEntry";

const News = ({
  extended,
  setExtended,
  hovered,
  setHovered,
  news,
  setScrollTrigger,
}) => {
  const { windowWidth } = useWindowDimensions();
  const height = use100vh();

  useEffect(() => {
    history.replaceState(null, "", `/`);
  }, []);

  useEffect(
    () => () => {
      setHovered(false), setExtended(false);
    },
    []
  );

  useEffect(() => {
    windowWidth <= 1400 && setHovered(true);
  }, [windowWidth]);

  useEffect(() => {
    windowWidth <= 1400 && setHovered(true);
  }, []);

  return (
    <div
      className={styles.outer}
      style={
        extended && windowWidth <= 600
          ? { height: `calc(${height}px - 80px` }
          : { height: "auto" }
      }
    >
      <div className={styles.left}></div>
      <div
        className={styles.newsFeed}
        style={{
          maxHeight: !extended
            ? "auto"
            : windowWidth <= 600
            ? `calc(${height}px - 125px`
            : `calc(${height}px - 50px`,
        }}
      >
        <div className={styles.inner}>
          <NewsEntry entry={news[0]} setScrollTrigger={setScrollTrigger} />
        </div>

        {extended && (
          <div className={styles.innerBottom}>
            {news.map((entry, i) => (
              <NewsEntry
                key={i}
                i={i}
                entry={entry}
                setScrollTrigger={setScrollTrigger}
              />
            ))}
          </div>
        )}

        {hovered && !extended && (
          <div className={styles.extendArrowDown}>
            <span onClick={() => setExtended(!extended)}>
              <SlArrowDown />
            </span>
          </div>
        )}

        {extended && (
          <div className={styles.extendArrowUp}>
            <span onClick={() => setExtended(!extended)}>
              <SlArrowUp />
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default News;
