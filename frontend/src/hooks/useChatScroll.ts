import { useEffect, useRef } from "react";

function useChatScroll(dependency: any) {
  const ref = useRef<HTMLElement>();

  useEffect(() => {
    setTimeout(() => {
      if (ref.current) {
        ref.current.scrollTop = ref.current.scrollHeight;
      }
    }, 100);
  }, [dependency]);

  return ref;
}

export default useChatScroll;
