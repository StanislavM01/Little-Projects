import Catalog from './components/Catalog/Catalog';
import Details from './components/Details/Details';
import NavBar from './components/NavBar/NavBar';
import MyProducts from './components/MyProducts/MyProducts';
import { Routes, Route } from 'react-router-dom';
import { useEffect } from 'react'
function App() {
  useEffect(() => {
    document.body.style.backgroundColor = 'azure'
  }, [])
  return (
    <>
      <NavBar />
      <Routes>
        <Route path='/' element={<Catalog />} />
        <Route path='/details/:productId' element={<Details />} />
        <Route path='/my-products' element={<MyProducts />} />

      </Routes>
    </>
  );
}

export default App;
