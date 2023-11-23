"use client";

import { useState, useEffect, useRef } from "react";

import { useInView } from "react-intersection-observer";
import { usePathname } from "next/navigation";

import Widget from "./widget/Widget";
import Project from "./Project";
import ProjectMobile from "./ProjectMobile";

const Main = ({ projects, news, about, contact, imprint, slug }) => {
  const [index, setIndex] = useState(1);
  const [delay, setDelay] = useState(true);
  const [widgetContent, setWidgetContent] = useState(projects[0]);
  const [scrollTrigger, setScrollTrigger] = useState("");
  const [windowY, setWindowY] = useState(null);
  const [lockScroll, setLockScroll] = useState(false);
  const [newY, setNewY] = useState(null);

  const pathname = usePathname();

  const { ref, inView } = useInView({
    threshold: 0,
  });

  // useEffect(() => {
  //   windowY == 0 && history.replaceState(null, "", `/`);
  // }, [windowY]);

  const delayFct = () => {
    setDelay(false);
  };

  const nextFct = () => {
    setIndex(3);
  };

  const resetScrollTrigger = () => {
    setScrollTrigger("");
  };

  useEffect(() => {
    !delay && inView && setIndex(3);
  }, [inView]);

  // useEffect(() => {
  //   setTimeout(resetScrollTrigger, 500);
  // }, [scrollTrigger]);

  useEffect(() => {
    slug && setScrollTrigger(slug);
    setTimeout(delayFct, 1000);
    pathname == "/" && setTimeout(nextFct, 3500);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      // Update scrollY state with the current vertical scroll position
      setWindowY(window.scrollY);
    };

    // Add event listener for scroll events
    window.addEventListener("scroll", handleScroll);

    // Clean up by removing the event listener on unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollContainerRef = useRef(null);

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;

    const scrollY = Math.max(window.scrollY || 0, window.pageYOffset || 0);

    if (lockScroll) {
      if (scrollContainer) {
        scrollContainer.style.position = "fixed";
        scrollContainer.style.top = `-${scrollY}px`;

        setNewY(scrollContainer.style.top);
      }
    } else {
      const scrollContainer = scrollContainerRef.current;

      if (scrollContainer) {
        scrollContainer.style.position = "";
        scrollContainer.style.width = "";
        scrollContainer.style.top = "";
        scrollContainer.style.left = "";

        window.scrollTo(0, -parseInt(newY));
      }
    }

    return () => {
      if (scrollContainer) {
        scrollContainer.style.position = "";
        scrollContainer.style.width = "";
        scrollContainer.style.top = "";
        scrollContainer.style.left = "";
      }
    };
  }, [lockScroll]);

  return (
    <div ref={scrollContainerRef}>
      <Widget
        index={index}
        setIndex={setIndex}
        widgetContent={widgetContent}
        news={news}
        projects={projects}
        about={about}
        contact={contact}
        imprint={imprint}
        setScrollTrigger={setScrollTrigger}
        slug={slug}
        setLockScroll={setLockScroll}
      />
      <div
        ref={ref}
        style={{
          height: "300px",
          position: "absolute",
          background: "red",
          top: "0",
        }}
      ></div>
      <div className="projectDesktop">
        {projects.map((project, i) => (
          <Project
            key={i}
            i={i}
            project={project}
            index={index}
            setIndex={setIndex}
            setWidgetContent={setWidgetContent}
            scrollTrigger={scrollTrigger}
            delay={delay}
          />
        ))}
      </div>
      <div className="projectMobile">
        {projects.map((project, i) => (
          <ProjectMobile
            key={i}
            i={i}
            project={project}
            index={index}
            setIndex={setIndex}
            setWidgetContent={setWidgetContent}
            scrollTrigger={scrollTrigger}
            delay={delay}
          />
        ))}
      </div>
      <p className="footer">© Assaf Kimmel, {new Date().getFullYear()} </p>
    </div>
  );
};

export default Main;
