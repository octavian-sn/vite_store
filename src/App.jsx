import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Details from './pages/Details';
import Cart from './pages/Cart';
import Admin from './pages/Admin';

function App() {
  return (
    <>
      <Routes>
        <Route path='/'element={<Home/>}/>
        <Route path='/details' element={<Details/>}/>
        <Route path='/cart' element={<Cart/>}/>
				<Route path='/admin' element={<Admin />} />
      </Routes>
    </>
  );
};

export default App;
