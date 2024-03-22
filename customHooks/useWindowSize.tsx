/**
 * Hook to get window size.
 *
 * Returns an object with width and height properties containing the current window dimensions.
 *
 * Updates whenever the window is resized.
 */

import { useState, useEffect } from "react";

// Hook to get window size
export function useWindowSize() {
  // State to store window dimensions
  const [windowSize, setWindowSize] = useState({
    width: undefined as number | undefined,
    height: undefined as number | undefined,
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        // Update window size state with current dimensions
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    // Cleanup: remove event listener on unmount
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowSize;
}
