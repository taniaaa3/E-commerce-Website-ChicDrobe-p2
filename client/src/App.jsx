import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Header from './components/Header';
import Login from './pages/Login';
import Logout from './pages/Logout';
import Footer from './components/Footer';
import Contact from './pages/Contact';
import AddProduct from './pages/addProduct';
import AllProducts from './pages/AllProducts';
import Register from './pages/Register';
import Pagenotfound from './pages/Pagenotfound';
import ProductRedirect from './pages/ProductRedirect';
import W_All from './pages/W_All';
import M_All from './pages/M_All';
import W_dress from './pages/W_dress';
import W_pants from './pages/W_pants';
import W_skirts from './pages/W_skirts';
import M_shirts from './pages/M_shirts';
import M_pants from './pages/M_pants';
import M_hoodies from './pages/M_hoodies';
import Cart from './pages/Cart';
import User from './pages/User';
import Kids from './pages/Kids';
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import Shipping from './pages/Shipping';
import Payment from './pages/Payment';

function App() {
  
  return (
    <BrowserRouter>
      <Header />
        <ToastContainer/>
      <Routes>
        {/* Navbar links */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/contact" element={<Contact />} />
        <Route path='/logout' element={<Logout />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/user' element={<User />} />

        {/* Add Product Page only for admin */}
        <Route path='/addproduct' element={<AddProduct />} />

        {/* All Product Page */}
        <Route path='/allproducts' element={<AllProducts />} />
        <Route path={`/allproducts/:id`} element={<ProductRedirect />} />
        <Route path={`/allproducts/:id/shipping`} element={<Shipping />} />
        <Route path={`/allproducts/:id/payment`} element={<Payment />} />

        {/* Women pages */}
        <Route path='/women/all' element={<W_All />} />
        <Route path={`/women/all/:id`} element={<ProductRedirect />} />
        <Route path={`/women/all/:id/shipping`} element={<Shipping />} />
        <Route path={`/women/all/:id/payment`} element={<Payment />} />

        <Route path='/women/dress' element={<W_dress />} />
        <Route path={`/women/dress/:id`} element={<ProductRedirect />} />
        <Route path={`/women/dress/:id/shipping`} element={<Shipping />} />
        <Route path={`/women/dress/:id/payment`} element={<Payment />} />

        <Route path='/women/pants' element={<W_pants />} />
        <Route path={`/women/pants/:id`} element={<ProductRedirect />} />
        <Route path={`/women/pants/:id/shipping`} element={<Shipping />} />
        <Route path={`/women/pants/:id/payment`} element={<Payment />} />

        <Route path='/women/skirts' element={<W_skirts />} />
        <Route path={`/women/skirts/:id`} element={<ProductRedirect />} />
        <Route path={`/women/skirts/:id/shipping`} element={<Shipping />} />
        <Route path={`/women/skirts/:id/payment`} element={<Payment />} />

        {/* Men Pages */}
        <Route path='/men/all' element={<M_All />} />
        <Route path={`/men/all/:id`} element={<ProductRedirect />} />
        <Route path={`/men/all/:id/shipping`} element={<Shipping />} />
        <Route path={`/men/all/:id/payment`} element={<Payment />} />

        <Route path='/men/hoodies' element={<M_hoodies />} />
        <Route path={`/men/hoodies/:id`} element={<ProductRedirect />} />
        <Route path={`/men/hoodies/:id/shipping`} element={<Shipping />} />
        <Route path={`/men/hoodies/:id/payment`} element={<Payment />} />

        <Route path='/men/pants' element={<M_pants />} />
        <Route path={`/men/pants/:id`} element={<ProductRedirect />} />
        <Route path={`/men/pants/:id/shipping`} element={<Shipping />} />
        <Route path={`/men/pants/:id/payment`} element={<Payment />} />

        <Route path='/men/shirts' element={<M_shirts />} />
        <Route path={`/men/shirts/:id`} element={<ProductRedirect />} />
        <Route path={`/men/shirts/:id/shipping`} element={<Shipping />} />
        <Route path={`/men/shirts/:id/payment`} element={<Payment />} />

        {/* Kids Page */}
        <Route path='/kids' element={<Kids />} />
        <Route path={`/kids/:id`} element={<ProductRedirect />} />
        <Route path={`/kids/:id/shipping`} element={<Shipping />} />
        <Route path={`/kids/:id/payment`} element={<Payment />} />

        {/* Page not found */}
        <Route path="*" element={<Pagenotfound />} />

        {/* Sidebar Links */}
        <Route path="/user/edit" element={<User/>}/>
        <Route path="/user/wishlist" element={<User/>}/>
        <Route path="/user/cart" element={<User/>}/>
        <Route path="/user/orders" element={<User/>}/>
        <Route path="/user/addresses" element={<User/>}/>
        <Route path="/user/reviews" element={<User/>}/>

        
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
