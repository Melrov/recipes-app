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
import Search from './components/Search/Search';
import ShoppingList from './components/ShoppingList/ShoppingList';
import Recipes from './components/Recipes/Recipes';


function App() {
  const [querry, setQuerry] = useState(null)

  return (
    <Router>
    <NavBar />
      <Routes>
        <Route exact path="/" element={<ProtectedRoutes isPrivate={true}><Recipes /></ProtectedRoutes>} />
        <Route path="/login" element={<ProtectedRoutes isPrivate={false}><Login></Login></ProtectedRoutes>} />
        <Route path='/settings' element={<ProtectedRoutes isPrivate={true}><Settings /></ProtectedRoutes>} />
        <Route path='/settings/diet' element={<ProtectedRoutes isPrivate={true}><Diet /></ProtectedRoutes>} />
        <Route path='/search/:id' element={<ProtectedRoutes isPrivate={true}><MoreInfo /></ProtectedRoutes>} />
        <Route path='/search/' element={<ProtectedRoutes isPrivate={true}><Search /></ProtectedRoutes>} />
        <Route path='/pantry' element={<ProtectedRoutes isPrivate={true}><Pantry /></ProtectedRoutes>} />
        <Route path='/shoppinglist' element={<ProtectedRoutes isPrivate={true}><ShoppingList /></ProtectedRoutes>} />
      </Routes>
    </Router>
  );
}

export default App;
