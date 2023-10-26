"use client";

import { useState } from "react";

import styles from "./placeholder.module.css";

import PlaceholderNews from "./PlaceholderNews";
import PlaceholderInfo from "./PlaceholderInfo";
import PlaceholderContact from "./PlaceholderContact";
import PortableText from "react-portable-text";

import News from "../types";

const Placeholder = ({ news, info }) => {
  const [content, setContent] = useState("news");

  return (
    <div className={styles.wrapper}>
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
  );
};

export default Placeholder;
