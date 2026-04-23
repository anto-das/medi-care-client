import { useEffect, useState } from "react";

export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler); // ইউজার আবার ক্লিক করলে আগের টাইমার ক্লিন করে দিবে
    };
  }, [value, delay]);

  return debouncedValue;
}
