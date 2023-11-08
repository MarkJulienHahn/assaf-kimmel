import { useEffect } from "react";

const Intro1 = ({ setIndex, index }) => {
  const nextFct = () => {
    setIndex(index + 1);
  };

  useEffect(() => {
    setTimeout(nextFct, 1000);
  });

  return <div>Assaf&nbsp;Kimmel</div>;
};

export default Intro1;
