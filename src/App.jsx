import './App.css'
import Home from './Pages/Home/Home'
import { Route, Routes } from 'react-router-dom'
import Dashboard from './Pages/Dashboard/Dashboard'
import Settings from './Pages/Settings/Settings'
import Protected from './Components/Utils/Protected'

function App() {
  return (
    <>

      <Routes>
        <Route path="/" element={<Home />} />

        <Route element={<Protected />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>

        {/* <Route path="/settings" element={<Settings />} /> */}
      </Routes>

    </>
  )
}

export default App
