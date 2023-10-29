"use client";

import { useState, useRef, useEffect } from "react";

import News from "./News";
import Menu from "./Menu";
import Intro1 from "./Intro1";
import Intro2 from "./Intro2";

import styles from "./widget.module.css";

import { BurgerVeggie } from "react-icons-animated";

const Widget = ({index, setIndex}) => {
  const [widgetWidth, setWidgetWidth] = useState({ width: 0, height: null });

  const contentRef = useRef();
  const [isClosed, setIsClosed] = useState(false);

  const array = [
    <Menu setIndex={setIndex} />,
    <Intro1 setIndex={setIndex} index={index} />,
    <Intro2 setIndex={setIndex} index={index} />,
    <News setIndex={setIndex} index={index} />,
  ];

  const widgetTransformation = () => {
    setWidgetWidth({
      width: contentRef.current.clientWidth,
      height: contentRef.current.clientHeight,
    });
  };
  useEffect(() => {
    setTimeout(widgetTransformation, 100);
  }, [index]);

  useEffect(() => {
    index != 0 ? setIsClosed(false) : setIsClosed(true);
  }, [index]);

  return (
    <div
      className={styles.wrapper}
      style={{ width: widgetWidth.width, height: widgetWidth.height }}
    >
      {index != 1 && index != 2 && (
        <div className={styles.menuIcon} onClick={() => setIndex(0)}>
          <BurgerVeggie isClosed={isClosed} />
        </div>
      )}
      <div className={styles.content} ref={contentRef}>
        {array[index]}
      </div>
    </div>
  );
};

export default Widget;
