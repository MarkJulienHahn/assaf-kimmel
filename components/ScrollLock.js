import { useEffect } from 'react';

const ScrollLock = ({ isLocked }) => {
  useEffect(() => {
    const disableScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;

      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollTop}px`;
      document.body.style.left = `-${scrollLeft}px`;
    };

    const enableScroll = () => {
      if (document.body.style.position === 'fixed') {
        const scrollTop = parseInt(document.body.style.top || '0', 10);
        const scrollLeft = parseInt(document.body.style.left || '0', 10);

        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.left = '';
        window.scrollTo(scrollLeft, scrollTop);
      }
    };

    if (isLocked) {
      disableScroll();
    } else {
      enableScroll();
    }

    return () => {
      enableScroll();
    };
  }, [isLocked]);

  return null;
};

export default ScrollLock;
