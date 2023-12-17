import './App.css';
import './index.css'
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Details from './pages/Details';
import Cart from './pages/Cart';
import Admin from './pages/Admin';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function App() {
  return (
    <div className='flex flex-col min-h-screen bg-gray-100'>
      <Navbar/>
      <div className='flex-grow flex justify-center items-center h-full'>
      <Routes>
        <Route path='/'element={<Home/>}/>
        <Route path='/details' element={<Details/>}/>
        <Route path='/cart' element={<Cart/>}/>
				<Route path='/admin' element={<Admin />} />
      </Routes>
      </div>
      <Footer/>
    </div>
  );
};

export default App;
