import { useEffect, useState } from "react";
function getSize(isClient) {
  return {
    width: isClient ? window.innerWidth : undefined,
    height: isClient ? window.innerHeight : undefined
  };
}

// Hook
export default function useWindowSize() {
  const isClient = typeof window === "object";

  const [windowSize, setWindowSize] = useState(() => getSize(isClient));

  useEffect(() => {
    if (!isClient) {
      return false;
    }

    function handleResize() {
      setWindowSize(getSize(isClient));
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isClient]);

  return windowSize;
}
