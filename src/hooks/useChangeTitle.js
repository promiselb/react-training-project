import { useEffect } from "react";

// Custom hook to change the page title
const useChangeTitle = (title) => {
  useEffect(() => {
    document.title = title;
  }, [title]);
}

export { useChangeTitle };