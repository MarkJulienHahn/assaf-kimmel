"use client";

import { useState, useEffect } from "react";

import { useInView } from "react-intersection-observer";

import Widget from "./widget/Widget";
import Project from "./Project";

const Main = ({ projects, news, about }) => {
  const [index, setIndex] = useState(7);
  const [widgetContent, setWidgetContent] = useState(projects[0]);

  const { ref, inView, entry } = useInView({
    threshold: 0,
  });

  useEffect(() => {
    inView && setIndex(3);
  }, [inView]);

  return (
    <div>
      <Widget
        index={index}
        setIndex={setIndex}
        widgetContent={widgetContent}
        news={news}
        about={about}
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
          project={project}
          index={index}
          setIndex={setIndex}
          setWidgetContent={setWidgetContent}
        />
      ))}
    </div>
  );
};

export default Main;
