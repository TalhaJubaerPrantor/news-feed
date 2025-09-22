import React, { use, useEffect, useRef, useState } from "react";
import "./Dashboard.css";
// import { Link } from "react-router-dom";
import Robot from "../../Components/Robot/Robot";
import useNews from "../../Components/News/useNews";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark } from "@fortawesome/free-regular-svg-icons";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { data } from "react-router-dom";

// import bgImage from "bg.jpg"; // <-- Put your background image inside src folder

export default function Dashboard() {
  const [preferences, setPreferences] = useState(["AI", "Politics"]);
  const [newPref, setNewPref] = useState("");
  const [expandedNews, setExpandedNews] = useState(null);
  const [scrollIntensity, setScrollIntensity] = useState();
  const [selectedColor, setSelectedColor] = useState();
  const [selectedFont, setSelectedFont] = useState();

  const loggedEmail = localStorage.getItem("user")

  // console.log("Scroll Intensity:", scrollIntensity);

  const handleLogOut = () => {
    localStorage.removeItem("user");
    window.location.href = "/";
  }

  // Fetched news hook
  const { stories, loading } = useNews();
  const ITEMS_PER_PAGE = 8;       // 🔹 Number of cards per page
  // console.log("Fetched Stories:", stories);

  const [page, setPage] = useState(0);
  const totalPages = Math.ceil(stories.length / ITEMS_PER_PAGE);

  //Filter 
  const [sortOrder, setSortOrder] = useState("default");


  // Auto change page
  useEffect(() => {
    if (!stories.length) return;
    const interval = setInterval(() => {
      setPage((prev) => (prev + 1) % totalPages);
    }, scrollIntensity); // Change page every scrollIntensity ms
    return () => clearInterval(interval);
  }, [scrollIntensity, stories, totalPages]);

  // Slice stories for current page
  const pageStories = stories.slice(
    page * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE + ITEMS_PER_PAGE
  );





  // Choose Theme
  document.documentElement.style.setProperty("--page-bg", selectedColor);
  const themes = [
    { id: "red", label: "Red" },
    { id: "green", label: "Green" },
    { id: "cyan", label: "Cyan" },
  ];

  // font select
  document.documentElement.style.setProperty("--font-family", selectedFont);

  // updateTheme

  useEffect(() => {
    fetch(`http://localhost:3000/getuser/${loggedEmail}`)
      .then(res => res.json())
      .then(data => {
        // console.log(data.user.scrollIntensity)
        if (data.status == 200) {
          // console.log(data)
          setScrollIntensity(data.user.scrollIntensity)
          setSelectedColor(data.user.theme)
          setSelectedFont(data.user.font)
        }
      })
  },[data])



  const updateTheme = () => {
    fetch('http://localhost:3000/update', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ loggedEmail, scrollIntensity, selectedColor, selectedFont })
    })
      .then(res => res.json())
      .then(data => {
        if (data.status == 200) {
          setScrollIntensity(data.updatedUser.scrollIntensity)
          setSelectedColor(data.updatedUser.theme)
          setSelectedFont(data.updatedUser.font)
        }
      })
  }


  // Preferance handlers
  const addPreference = () => {
    if (newPref.trim()) {
      setPreferences([...preferences, newPref]);
      setNewPref("");
    }
  };

  const deletePreference = (index) => {
    setPreferences(preferences.filter((_, i) => i !== index));
  };


  // Bookmark handler
  const [bookmarks, setBookmarks] = useState([]);
  useEffect(() => {
    // console.log("Bookmarks:", bookmarks);
  }, [bookmarks]);

  return (
    <div
      className="dashboard"
      style={{
        backgroundImage: `url(${'bg.jpg'})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        // opacity: 0.3,
        backgroundAttachment: "fixed",
        backgroundColor: "black",
      }}
    >
      {/* Header */}
      <header className="header">
        <h1>High Signal News Feed</h1>
        <nav>
          {/* <Link to='/settings'>Settings</Link> */}
          <button className="bookmark"> Bookmarks <FontAwesomeIcon icon={faBookmark} /> </button>
          <button onClick={handleLogOut} className="logout">Log Out <FontAwesomeIcon icon={faRightFromBracket} /> </button>
        </nav>
      </header>

      <div className="content">
        {/* Left Sidebar */}
        <aside className="sidebar">
          <div className="preferences">
            <h2>Your Preferences</h2><br />
            <div className="add-pref">
              <input
                type="text"
                value={newPref}
                onChange={(e) => setNewPref(e.target.value)}
                placeholder="Add preference..."
              />
              <button onClick={addPreference}>+ Add</button>
            </div>
            <ul>
              {preferences.map((pref, index) => (
                <li key={index}>
                  {pref}
                  <button onClick={() => deletePreference(index)}>✖</button>
                </li>
              ))}
            </ul>
          </div>

          <div className="settings-box">
            <label>Scroll Intensity</label>
            <input onChange={(e) => {
              setScrollIntensity(e.target.value * 100000)
            }} type="range" min="1" max="10" defaultValue="3" />
            <br /><br />
            <p>Choose Theme:</p>
            <div className="theme-options">
              <div className="option-list">
                {themes.map((theme) => (
                  <button
                    key={theme.id}
                    className={`option ${selectedColor === theme.id ? "active" : ""}`}
                    onClick={() => setSelectedColor(theme.id)}
                  >
                    {theme.label}
                  </button>
                ))}
              </div>
            </div>
            {/* Font select */}
            <div className="font-selector">
              <h3 className="font-title">Choose a Font</h3>
              <div className="font-options">
                <label className="font-card">
                  <input onChange={(e) => { setSelectedFont("sans-serif") }} type="radio" defaultChecked name="font" value="sans-serif" />
                  <span className="font-name" style={{ fontFamily: 'Segoe UI' }}>Arial</span>
                </label>
                <label className="font-card">
                  <input onChange={(e) => { setSelectedFont("cursive") }} type="radio" name="font" value="serif" />
                  <span className="font-name" style={{ fontFamily: 'Cursive' }}>Cursive</span>
                </label>
                <label className="font-card">
                  <input onChange={(e) => { setSelectedFont("monospace") }} type="radio" name="font" value="monospace" />
                  <span className="font-name" style={{ fontFamily: 'Monospace' }}>Monospace</span>
                </label>
              </div>
              <button onClick={updateTheme} className="update-btn">Update</button>
            </div>

          </div>
        </aside>

        {/* News Feed */}
        <div className="news-feed-wrapper">

          {/* 🔹 Filter / Sort Bar */}
          <div className="filter-bar">
            <label htmlFor="sort" className="filter-label">Sort by:</label>
            <select
              id="sort"
              className="filter-select"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
            >
              <option value="default">Default</option>
              <option value="high">Score: High → Low</option>
              <option value="low">Score: Low → High</option>
            </select>
          </div>
          <div className="news-feed grid">

            {loading ? (
              <div className="loading">
                <p className="loading-text">Loading news...</p>
              </div>
            ) : (
              /* ✅ Sort stories before rendering */
              [...pageStories]
                .sort((a, b) => {
                  if (sortOrder === "high") return b.score - a.score;
                  if (sortOrder === "low") return a.score - b.score;
                  return 0; // default (no sorting)
                })
                .map((story) => (
                  <div
                    key={story.id}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="news-card"
                  >
                    <a href={story.url} className="news-title">{story.title}</a>
                    <div className="news-info">
                      <span className="news-author">By {story.by}</span>
                      <span>{new Date(story.time * 1000).toLocaleString()}</span>
                    </div>
                    <h5 className="news-info-bottom">
                      <span>Points: {story.score}</span>
                      <span>Source: HackerRank</span>
                      <span><button onClick={(e) => { setBookmarks(story.id) }} className="bookmark-btn"><FontAwesomeIcon className="bookmark-icon" icon={faBookmark} /></button></span>
                    </h5>
                  </div>
                ))
            )}
          </div>

          {/* Pagination Dots */}
          {!loading ?
            (<div className="pagination-dots">
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  className={`dot ${i === page ? "active" : ""}`}
                  onClick={() => setPage(i)}
                />
              ))}
            </div>) : null
          }
        </div>



        {/* Right Sidebar */}
        <aside className="right-sidebar">
          <div className="logo-box">
            <p style={{ fontSize: "large", paddingLeft: "10px", paddingRight: "10px" }}>Use mouse,keypad or touch to play with me</p>
            <Robot />
            <p style={{ fontSize: "large", paddingLeft: "10px", paddingRight: "10px" }}>Hi, Iam <span style={{ color: selectedColor, fontWeight: "Bold" }}>HUD</span>. Play with me when you are free</p>
          </div>
          <div className="news-detail">
            <h4>Arrow Up/W: <span style={{ color: "yellowgreen" }}> Take HUD Forword</span></h4>
            <h4>Arrow Down/S: <span style={{ color: "yellowgreen" }}>Take HUD Backward</span></h4>
            <h4>Arrow Left/A:<span style={{ color: "yellowgreen" }}> Take HUD Left</span></h4>
            <h4>Arrow Right/D:<span style={{ color: "yellowgreen" }}> Take HUD Right</span></h4>
            <h4>Q: <span style={{ color: "yellowgreen" }}>Rotate Left</span></h4>
            <h4>E:<span style={{ color: "yellowgreen" }}> Rotate Right</span></h4>

          </div>
        </aside>
      </div>
    </div>
  );
}
