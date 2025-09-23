import './App.css'
import Home from './Pages/Home/Home'
import { Route, Routes } from 'react-router-dom'
import Dashboard from './Pages/Dashboard/Dashboard'
import Protected from './Components/Utils/Protected'
import Bookmarks from './Pages/Bookmark/Bookmarks'

function App() {
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
