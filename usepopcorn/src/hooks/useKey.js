import { useEffect } from "react";

export function useKey(key, action, type) {
  useEffect(
    function () {
      function callback(e) {
        if (e.code.toLowerCase() === key.toLowerCase()) {
          action();
        }
      }

      document.addEventListener(type.toLowerCase(), callback);

      return function () {
        document.removeEventListener(type.toLowerCase(), callback);
      };
    },
    [action, key, type]
  );
}
