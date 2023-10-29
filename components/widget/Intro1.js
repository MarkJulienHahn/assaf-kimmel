import { useEffect } from "react";

const Intro1 = ({ setIndex, index }) => {
  next = () => {
    setIndex(index + 1);
  };

  useEffect(() => {
    setTimeout(next, 1000);
  });

  return <div>Assaf&nbsp;Kimmel</div>;
};

export default Intro1;
