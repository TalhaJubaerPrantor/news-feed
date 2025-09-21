// src/components/UserTimeline.js
import { useEffect } from "react";

export default function UserTimeline({ username, theme = "light", height = "600" }) {
  useEffect(() => {
    if (window.twttr) window.twttr.widgets.load();
  }, [username]);

  return (
    <a
      className="twitter-timeline"
      data-theme={theme}
      data-height={height}
      href={`https://twitter.com/${username}`}
    >
      Tweets by @{username}
    </a>
  );
}
