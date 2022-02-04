import { Routes, BrowserRouter as Router, Route } from 'react-router-dom';
import { GlobalProvider } from "./context/GlobalContext";
import { useEffect } from 'react';
import "./index.css"
import NavBar from "./components/NavBar"
import Explore from "./pages/Explore"
import Orders from './pages/Orders';
import Cart from "./pages/Cart";
import EditProducts from './pages/EditProducts';
function App() {
  /* useEffect(() => {
    window.confirm("On page Load")
  }, []) */
  return (
    <GlobalProvider>
      <Router>
        <NavBar />
        <Routes>
          <Route exact path="/" element={<Explore />} />
          <Route exact path="/orders" element={<Orders />} />
          <Route exact path="/cart" element={<Cart />} />
          <Route exact path="/edit-products" element={<EditProducts />} />
        </Routes>
      </Router>
    </GlobalProvider>
  );
}

export default App;
