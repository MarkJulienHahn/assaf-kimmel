"use client";

import { useState, useEffect } from "react";

import { useInView } from "react-intersection-observer";

import Widget from "./widget/Widget";
import Project from "./Project";

const Main = ({ projects, news, about, contact, imprint, slug }) => {
  const [index, setIndex] = useState(1);
  const [delay, setDelay] = useState(true);
  const [widgetContent, setWidgetContent] = useState(projects[0]);
  const [scrollTrigger, setScrollTrigger] = useState("");

  const { ref, inView, entry } = useInView({
    threshold: 0,
  });

  const delayFct = () => {
    setDelay(false);
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
  }, []);

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
  );
};

export default Main;
