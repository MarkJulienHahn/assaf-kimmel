"use client";

import { useState, useEffect } from "react";

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
  const [scrollY, setScrollY] = useState(null);

  const pathname = usePathname();

  const { ref, inView } = useInView({
    threshold: 0,
  });

  useEffect(() => {
    scrollY == 0 && history.replaceState(null, "", `/`);
  }, [scrollY]);

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

  useEffect(() => {
    setTimeout(resetScrollTrigger, 500);
  }, [scrollTrigger]);

  useEffect(() => {
    slug && setScrollTrigger(slug);
    setTimeout(delayFct, 1000);
    pathname == "/" && setTimeout(nextFct, 3500);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      // Update scrollY state with the current vertical scroll position
      setScrollY(window.scrollY);
    };

    // Add event listener for scroll events
    window.addEventListener("scroll", handleScroll);

    // Clean up by removing the event listener on unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []); // Empty dependency array ensures this effect runs only once

  console.log(pathname);

  return (
    <div>
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
