import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { useEffect, useState } from 'react';
import useFetch from './hooks/useFetch';
import Login from './components/Login';
import ProtectedRoutes from './components/ProtectedRoutes';
import Home from './components/Home';
import NavBar from './components/Nav/NavBar';
import Settings from './components/Settings/Settings';
import Diet from './components/Settings/Diet';
import SearchResults from './components/Search/SearchResults';
import MoreInfo from './components/Search/MoreInfo';
import Pantry from './components/Pantry/Pantry';

function App() {
  const [querry, setQuerry] = useState(null)

  return (
    <Router>
    <NavBar />
      <Routes>
        <Route exact path="/" element={<ProtectedRoutes isPrivate={true}><Home /></ProtectedRoutes>} />
        <Route path='/search' element={<SearchResults />} />
        <Route path="/login" element={<ProtectedRoutes isPrivate={false}><Login></Login></ProtectedRoutes>} />
        <Route path='/settings' element={<Settings />} />
        <Route path='/settings/diet' element={<Diet />} />
        <Route path='/search/:id' element={<MoreInfo />} />
        <Route path='/pantry' element={<Pantry />} />
      </Routes>
    </Router>
  );
}

export default App;
