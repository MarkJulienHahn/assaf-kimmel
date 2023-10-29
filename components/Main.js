"use client";

import { useState } from "react";

import Widget from "./widget/Widget";
import Project from "./Project";

const Main = () => {
  const [index, setIndex] = useState(1);
  return (
    <div>
      <Widget index={index} setIndex={setIndex} />
      <Project index={index} setIndex={setIndex} />
      {/* <Project index={index} setIndex={setIndex} />{" "}
      <Project index={index} setIndex={setIndex} /> */}
    </div>
  );
};

export default Main;
