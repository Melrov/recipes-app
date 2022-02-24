import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { useEffect, useState } from 'react';
import useFetch from './hooks/useFetch';
import Login from './components/Login';
import ProtectedRoutes from './components/ProtectedRoutes';
import Home from './components/Home';
import NavBar from './components/NavBar';
import Settings from './components/Settings';
import Diet from './components/Diet';

function App() {
  const [querry, setQuerry] = useState(null)

  return (
    <Router>
    <NavBar />
      <Routes>
        <Route exact path="/" element={<ProtectedRoutes isPrivate={true}><Home /></ProtectedRoutes>} />
        <Route path="/login" element={<Login></Login>} />
        <Route path='/settings' element={<Settings />} />
        <Route path='/settings/diet' element={<Diet />} />
      </Routes>
    </Router>
  );
}

export default App;
