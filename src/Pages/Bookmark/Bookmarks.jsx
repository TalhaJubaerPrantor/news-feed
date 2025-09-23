import React, { useEffect, useState } from "react";
import "./Bookmarks.css"; // vanilla CSS file
import { Center } from "@react-three/drei";
import { Link } from "react-router-dom";

export default function Bookmarks() {
    const [bookmarks, setBookmarks] = useState([]);
    const [loading, setLoading] = useState(true);

    const loggedEmail = localStorage.getItem("user")

    useEffect(() => {
        fetch(`http://localhost:3000/bookmarks/${loggedEmail}`)
            .then(res => res.json())
            .then(data => {
                setBookmarks(data)
                setLoading(false);
            })

    })

    return (
        <div className="bookmark-page">
            <h1 className="title">My Bookmarked News</h1>
            <Link className="go-home" to="/dashboard">Back to home</Link>
            <br /><br />

            {loading ? (<h1 style={{ textAlign: "center" }}>Loading</h1>) : (<p></p>)

            }

            {bookmarks.length === 0 ? (
                <p className="empty-text">No bookmarks yet.</p>
            ) : (
                <div className="bookmark-container">
                    {bookmarks.map((item) => (
                        <div key={item.id} className="bookmark-card">
                            <h3 className="bookmark-title">{item.title}</h3>

                            <p className="bookmark-meta">
                                by {item.by} · {new Date(item.time * 1000).toLocaleDateString()}
                            </p>

                            {item.url && (
                                <a
                                    href={item.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="bookmark-link"
                                >
                                    <p>Visit News</p>
                                </a>
                            )}

                            <button
                                className="remove-btn"
                                onClick={() => onRemove(item.id)}
                            >
                                Remove Bookmark
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
