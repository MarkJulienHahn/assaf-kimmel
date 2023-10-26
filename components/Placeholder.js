"use client";

import { useState, useEffect, useRef } from "react";

import styles from "./placeholder.module.css";

import PlaceholderNews from "./PlaceholderNews";
import PlaceholderInfo from "./PlaceholderInfo";
import PlaceholderContact from "./PlaceholderContact";
import useWindowDimensions from "../hooks/useWindowDimensions";

import News from "../types";

const Placeholder = ({ news, info }) => {
  const [content, setContent] = useState("news");
  const [widgetDimensions, setWidgetDimensions] = useState({
    width: null,
    height: null,
  });
  const { windowHeight, windowWidth } = useWindowDimensions();

  const ref = useRef();

  const dimensionsFunction = () => {
    setWidgetDimensions({
      width: ref.current.clientWidth,
      height: ref.current.clientHeight,
    });
  };

  useEffect(() => {
    setTimeout(dimensionsFunction, 1000);
  }, [windowWidth, windowHeight, content]);

  console.log(widgetDimensions);

  return (
    <div
      className={styles.wrapper}
      // style={{
      //   height: widgetDimensions.height + 120,
      //   width: widgetDimensions.width,
      //   overflow: "hidden",
      // }}
    >
      <div ref={ref}>
        <div className={styles.header}>
          <p
            onClick={() => setContent("news")}
            style={
              content == "news"
                ? { textDecoration: "underline 1.7px" }
                : { cursor: "pointer" }
            }
          >
            Assaf Kimmel
          </p>
          <p
            onClick={() => setContent("info")}
            style={
              content == "info"
                ? { textDecoration: "underline 1.7px" }
                : { cursor: "pointer" }
            }
          >
            Info
          </p>
          <p
            onClick={() => setContent("contact")}
            style={
              content == "contact"
                ? { textDecoration: "underline 1.7px" }
                : { cursor: "pointer" }
            }
          >
            Contact
          </p>
        </div>

        {content == "news" ? <PlaceholderNews news={news} /> : ""}
        {content == "info" ? <PlaceholderInfo info={info} /> : ""}
        {content == "contact" ? <PlaceholderContact info={info} /> : ""}
      </div>
    </div>
  );
};

export default Placeholder;
