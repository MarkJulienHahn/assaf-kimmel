import { useState } from "react";

import styles from "./widget.module.css";

import NewsEntry from "./NewsEntry";

const News = ({ setIndex, index, extended, setExtended, news }) => {
  console.log(news);

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
      </div>

      <div
        className={styles.extendArrow}
        onClick={() => setExtended(!extended)}
      >
        down
      </div>
    </div>
  );
};

export default News;
