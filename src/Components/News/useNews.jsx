import { useEffect, useState } from "react";

function useNews() {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTopStories() {
      try {
        // Fetch hacker news api IDs
        const res = await fetch("https://hacker-news.firebaseio.com/v0/newstories.json");
        const ids = await res.json();

        // Get details of the first 10 stories
        const top10 = ids.slice(0, 104);
        const storyPromises = top10.map(id =>
          fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`).then(res => res.json())
        );

        const storiesData = await Promise.all(storyPromises);
        setStories(storiesData);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    }

    fetchTopStories();
  }, []);

  return { stories, loading };
}

export default useNews;