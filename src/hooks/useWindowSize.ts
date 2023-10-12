import { useState, useLayoutEffect } from "react";

/**
 * Interface describing the structure of the window size.
 *
 * @property {number | null} width - The width of the window. `null` if not set.
 * @property {number | null} height - The height of the window. `null` if not set.
 */
interface WindowSize {
  width: number | null;
  height: number | null;
}

/**
 * A custom React hook that provides the size of the window.
 *
 * @returns {WindowSize} The current width and height of the window.
 *
 * @example
 * const size = useWindowSize();
 * console.log(`Width: ${size.width}, Height: ${size.height}`);
 */
function useWindowSize(): WindowSize {
  const [size, setSize] = useState<WindowSize>({
    width: null,
    height: null,
  });
  
  useLayoutEffect(() => {
    const handleResize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    
    handleResize();
    window.addEventListener("resize", handleResize);
    
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  
  return size;
}

export default useWindowSize;
