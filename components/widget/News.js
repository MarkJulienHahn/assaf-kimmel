import { useState, useEffect } from "react";
import { SlArrowDown, SlArrowUp } from "react-icons/sl";
import styles from "./widget.module.css";

import useWindowDimensions from "../../hooks/useWindowDimensions";

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
    windowWidth <= 600 && setHovered(true);
  }, [windowWidth]);

  return (
    <div
      className={styles.outer}
      style={
        extended && windowWidth <= 600
          ? { height: "calc(100vh - 2* var(--space-S)" }
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
            ? "calc(100vh - 125px"
            : "calc(100vh - 50px",
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
