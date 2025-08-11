import { Route, Routes } from "react-router-dom";
import { Home,About,Cart,PlaceOrder,Orders,Contact,Login,Product,Collection } from "./pages";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import SearchBar from "./components/SearchBar";
 import { ToastContainer, toast } from 'react-toastify';
import Verify from "./pages/Verify";
import Profile from "./pages/Profile";
function App() {

  return (
    <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
      <ToastContainer />
      <Navbar />
      <SearchBar />
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/collection' element={<Collection/>} />
        <Route path='/about' element={<About/>} />
        <Route path='/contact' element={<Contact/>} />
        <Route path='/product/:productId' element={<Product/>} />
        <Route path='/cart' element={<Cart/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/place-order' element={<PlaceOrder/>} />
        <Route path='/orders' element={<Orders/>} />
        <Route path='/verify' element={<Verify/>} />
        <Route path='/profile' element={<Profile/>} />


      </Routes>
      <Footer />
    </div>
  );
}

export default App;
