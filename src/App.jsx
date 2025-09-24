import './App.css'
import Home from './Pages/Home/Home'
import { Route, Routes, useNavigate } from 'react-router-dom'
import Dashboard from './Pages/Dashboard/Dashboard'
import Protected from './Components/Utils/Protected'
import Bookmarks from './Pages/Bookmark/Bookmarks'
import { useEffect } from 'react'

function App() {

  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("user"); // or "authToken", etc.
    if (user) {
      navigate("/dashboard", { replace: true }); // skip login page
    }
  }, [navigate]);

  return (
    <>

      <Routes>
        <Route path="/" element={<Home />} />

        <Route element={<Protected />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/bookmarks" element={<Bookmarks />} />
        </Route>

        {/* <Route path="/settings" element={<Settings />} /> */}
      </Routes>

    </>
  )
}

export default App
