import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import Login from "./components/Login";
import ProtectedRoutes from "./components/ProtectedRoutes";
import Home from "./components/Home";
import NavBar from "./components/Nav/NavBar";
import Settings from "./components/Settings/Settings";
import Diet from "./components/Settings/Diet";
import SearchResults from "./components/Search/SearchResults";
import MoreInfo from "./components/Search/MoreInfo";
import Pantry from "./components/Pantry/Pantry";
import Search from "./components/Search/Search";
import ShoppingList from "./components/ShoppingList/ShoppingList";
import Recipes from "./components/Recipes/Recipes";
import { UserContext } from "./context/UserContext";
import { PantryContext } from "./context/PantryContext";
import useServerFetch from "./hooks/useServerFetch";
import { SearchContext } from "./context/SearchContext";
import { RecipesContext } from "./context/RecipesContext";
import { ShoppingListContext } from "./context/ShoppingContex";
import SignUp from "./components/SignUp";

function App() {
  const [loading, setLoading] = useState(true)
  const [querry, setQuerry] = useState(null);
  const { user, setUser } = useContext(UserContext);
  const { setIngredients } = useContext(PantryContext);
  const { setShoppingList } = useContext(ShoppingListContext);
  const { setResults, setSearch } = useContext(SearchContext)
  const { setRecipes } = useContext(RecipesContext)
  const { pantryByUserId, verify, favsByUserId, shoppingListByUserId } = useServerFetch();

  useEffect(() => {
    async function init() {
      const res = await pantryByUserId();
      if (res.data.success) {
        setIngredients(res.data.data);
      }
      const newRes = await favsByUserId()
      if(newRes.data.success){
        setRecipes(newRes.data.data)
      }
      const newNewRes = await shoppingListByUserId()
      if(newNewRes.data.success){
        setShoppingList(newNewRes.data.data)
      }
    }
    if (user) {
      init();
    } else {
      setIngredients([]);
      setResults(null);
      setSearch("");
    }
  }, [user]);

  useEffect(() => {
    async function init() {
      const res = await verify();
      //console.log(res)
      if (res.data.success) {
        setUser(res.data.data.username);
      }
      setLoading(false)
    }
    init();
  }, []);

  return (
    <>
    { !loading && <Router>
      <NavBar />
      <Routes>
        <Route
          exact
          path="/"
          element={
            <ProtectedRoutes isPrivate={true}>
              <Recipes />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/login"
          element={
            <ProtectedRoutes isPrivate={false}>
              <Login/>
            </ProtectedRoutes>
          }
        />
        <Route
          path="/signup"
          element={
            <ProtectedRoutes isPrivate={false}>
              <SignUp/>
            </ProtectedRoutes>
          }
        />
        {/* <Route
          path="/settings"
          element={
            <ProtectedRoutes isPrivate={true}>
              <Settings />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/settings/diet"
          element={
            <ProtectedRoutes isPrivate={true}>
              <Diet />
            </ProtectedRoutes>
          }
        /> */}
        <Route
          path="/search/:id"
          element={
            <ProtectedRoutes isPrivate={true}>
              <MoreInfo />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/search/"
          element={
            <ProtectedRoutes isPrivate={true}>
              <Search />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/pantry"
          element={
            <ProtectedRoutes isPrivate={true}>
              <Pantry />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/shoppinglist"
          element={
            <ProtectedRoutes isPrivate={true}>
              <ShoppingList />
            </ProtectedRoutes>
          }
        />
        <Route
          path="*"
          element={
            <ProtectedRoutes isPrivate={true}>
              <Recipes />
            </ProtectedRoutes>
          }
        />
      </Routes>
    </Router> }
    </>
  );
}

export default App;
