import { useState, useEffect } from 'react';

/**
 * Custom hook to determine if the current viewport is considered "mobile"
 * based on a predefined breakpoint (e.g., typically 768px).
 *
 * @param breakpoint The maximum width (in pixels) to consider the device mobile. Default is 768px (md breakpoint).
 * @returns boolean - true if the viewport width is less than or equal to the breakpoint.
 */
const useMobile = (breakpoint: number = 768): boolean => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if window is defined (for server-side rendering safety)
    if (typeof window === 'undefined') {
      return;
    }

    const checkMobile = () => {
      setIsMobile(window.innerWidth <= breakpoint);
    };

    // Initial check
    checkMobile();

    // Set up event listener for window resize
    window.addEventListener('resize', checkMobile);

    // Clean up event listener on component unmount
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, [breakpoint]); // Re-run effect if the breakpoint changes

  return isMobile;
};

export default useMobile;