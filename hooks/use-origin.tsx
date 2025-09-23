import { useState, useEffect } from "react";

export const useOrigin = () => {
  const [mounted, setMounted] = useState(false);
  const [origin, setOrigin] = useState("");

  useEffect(() => {
    setMounted(true);
    if (typeof window !== "undefined" && window.location?.origin) {
      setOrigin(window.location.origin);
    } else {
      setOrigin("");
    }
  }, []);

  if (!mounted) {
    return "";
  }
  return origin;
};
