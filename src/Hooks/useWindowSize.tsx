import { useEffect, useState } from 'react';

interface WindowSize {
  width: number;
  height: number;
}
export const useWindowSize = (): WindowSize => {
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });
  useEffect(() => {
    function handleResize() {
      const pixels = 100;
      const screenWidth = window.screen.width;
      const percentage = (screenWidth - pixels) / screenWidth; // 0.92%
      console.log(percentage);
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return windowSize;
};
