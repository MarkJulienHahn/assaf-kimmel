"use client";

import { useState, useRef, useEffect } from "react";

import News from "./News";
import Menu from "./Menu";
import Intro1 from "./Intro1";
import Intro2 from "./Intro2";
import ProjectWidget from "./ProjectWidget";
import ProjectWidgetFull from "./ProjectWidgetFull";
import ProjectsOverview from "./ProjectsOverview";
import About from "./About";
import Contact from "./Contact";

import styles from "./widget.module.css";

import { BurgerVeggie } from "react-icons-animated";

const Widget = ({ index, news, about, setIndex, widgetContent }) => {
  const [widgetDimensions, setWidgetDimensions] = useState({
    width: 0,
    height: null,
  });

  const contentRef = useRef();
  const [isClosed, setIsClosed] = useState(false);
  const [extended, setExtended] = useState(false);

  const array = [
    <Menu key={1} setIndex={setIndex} />,
    <Intro1 key={2} setIndex={setIndex} index={index} />,
    <Intro2 key={3} setIndex={setIndex} index={index} />,
    <News
      key={4}
      setIndex={setIndex}
      index={index}
      news={news}
      extended={extended}
      setExtended={setExtended}
    />,
    <ProjectWidget
      key={5}
      setIndex={setIndex}
      index={index}
      widgetContent={widgetContent}
      extended={extended}
      setExtended={setExtended}
    />,
    <ProjectWidgetFull
      key={6}
      setIndex={setIndex}
      index={index}
      widgetContent={widgetContent}
    />,
    <ProjectsOverview key={7} setIndex={setIndex} index={index} />,
    <About key={8} setIndex={setIndex} index={index} about={about} />,
    <Contact key={9} setIndex={setIndex} index={index} />,
  ];

  const widgetTransformation = () => {
    setWidgetDimensions({
      width: contentRef.current.clientWidth,
      height: contentRef.current.clientHeight,
    });
  };
  useEffect(() => {
    setTimeout(widgetTransformation, 100);
  }, [index, widgetContent, extended]);

  useEffect(() => {
    index != 0 ? setIsClosed(false) : setIsClosed(true);
  }, [index]);

  return (
    <div
      className={`${styles.wrapper} ${index == 3 ? styles.wrapperNews : ""}`}
      style={{ width: widgetDimensions.width, height: widgetDimensions.height }}
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
