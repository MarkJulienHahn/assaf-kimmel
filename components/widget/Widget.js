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
import Imprint from "./Imprint";

import useWindowDimensions from "../../hooks/useWindowDimensions";

import styles from "./widget.module.css";

import { BurgerVeggie } from "react-icons-animated";

const Widget = ({
  index,
  news,
  projects,
  about,
  contact,
  imprint,
  setIndex,
  widgetContent,
  setScrollTrigger,
  slug,
  setLockScroll,
}) => {
  const [widgetDimensions, setWidgetDimensions] = useState({
    width: 174,
    height: 43,
  });

  const { windowWidth } = useWindowDimensions();

  const contentRef = useRef();
  const [isClosed, setIsClosed] = useState(false);
  const [extended, setExtended] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  const array = [
    <Menu key={1} setIndex={setIndex} />,
    <Intro1 key={2} setIndex={setIndex} index={index} />,
    <Intro2 key={3} setIndex={setIndex} index={index} about={about} />,
    <News
      key={4}
      news={news}
      extended={extended}
      setExtended={setExtended}
      hovered={hovered}
      setHovered={setHovered}
      setScrollTrigger={setScrollTrigger}
    />,
    <ProjectWidget
      key={5}
      setIndex={setIndex}
      index={index}
      widgetContent={widgetContent}
      hovered={hovered}
      setHovered={setHovered}
      slug={slug}
    />,
    <ProjectWidgetFull
      key={6}
      setIndex={setIndex}
      index={index}
      widgetContent={widgetContent}
    />,
    <ProjectsOverview
      key={7}
      setIndex={setIndex}
      index={index}
      projects={projects}
      setScrollTrigger={setScrollTrigger}
      setLockScroll={setLockScroll}
    />,
    <About key={8} setIndex={setIndex} index={index} about={about} />,
    <Contact key={9} setIndex={setIndex} index={index} contact={contact} />,
    <Imprint key={9} setIndex={setIndex} index={index} imprint={imprint} />,
  ];

  const indexFct = (indx) => {
    setIndex(indx);
  };

  const mouseEnterFct = () => {
    if (!isTouchDevice) {
      setLockScroll(true), setHovered(true);
    }
  };

  const mouseLeaveFct = () => {
    setLockScroll(false), setHovered(false);
  };

  const widgetTransformation = () => {
    setWidgetDimensions({
      width: contentRef.current.clientWidth + 1,
      height: contentRef.current.clientHeight + 1,
    });
  };
  useEffect(() => {
    setTimeout(widgetTransformation, 100);
  }, [index, widgetContent, extended, hovered]);

  useEffect(() => {
    index != 0 ? setIsClosed(false) : setIsClosed(true);
  }, [index]);

  useEffect(() => {
    slug == "projects" && setTimeout(() => indexFct(6), 1000);
    slug == "about" && setTimeout(() => indexFct(7), 1000);
    slug == "contact" && setTimeout(() => indexFct(8), 1000);
    slug == "imprint" && setTimeout(() => indexFct(9), 1000);
  }, []);

  useEffect(() => {
    !extended && setLockScroll(false);
  }, [extended]);

  useEffect(() => {
    const checkTouchDevice = () => {
      const touchSupport = 'ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;
      setIsTouchDevice(touchSupport);
    };

    checkTouchDevice();

    // Cleanup
    return () => {
      // Cleanup code if needed
    };
  }, []);



  return (
    <div
      className={`${styles.wrapper} ${index == 3 ? styles.wrapperNews : ""}`}
      style={{ width: widgetDimensions.width, height: widgetDimensions.height }}
      onMouseEnter={!extended ? mouseEnterFct : () => {}}
      onMouseLeave={!extended && windowWidth > 1400 ? mouseLeaveFct : () => {}}
    >
      {index != 1 && index != 2 && (
        <div
          className={styles.menuIcon}
          onClick={index != 0 ? () => setIndex(0) : () => setIndex(3)}
        >
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
