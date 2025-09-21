// src/components/TwitterScriptLoader.js
import { useEffect } from "react";

export default function Loader() {
  useEffect(() => {
    if (!window.twttr) {
      const script = document.createElement("script");
      script.src = "https://platform.twitter.com/widgets.js";
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  return null; // this component just loads the script
}
