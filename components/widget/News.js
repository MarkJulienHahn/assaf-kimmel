import { useState, useEffect } from "react";
import { SlArrowDown, SlArrowUp } from "react-icons/sl";
import styles from "./widget.module.css";

import NewsEntry from "./NewsEntry";

const News = ({ extended, setExtended, hovered, setHovered, news }) => {
  useEffect(() => {
    history.replaceState(null, "", `/`);
  }, []);

  useEffect(
    () => () => {
      setHovered(false), setExtended(false);
    },
    []
  );
  return (
    <div className={styles.outer}>
      <div className={styles.left}></div>
      <div
        className={styles.newsFeed}
        style={{ maxHeight: !extended ? "auto" : "calc(100vh - 50px" }}
      >
        <div className={styles.inner}>
          <NewsEntry entry={news[0]} />
        </div>

        {extended && (
          <div className={styles.innerBottom}>
            {news.map((entry, i) => (
              <NewsEntry key={i} i={i} entry={entry} />
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
