import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import ProductDetail from './pages/ProductDetail';
import Favorites from './pages/Favorites';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import OrderConfirmation from './pages/OrderConfirmation';
import Search from './pages/Search';
import Auth from './pages/Auth';
import Admin from './pages/Admin';
import About from './pages/About';
import Delivery from './pages/Delivery';
import FAQ from './pages/FAQ';
import Contacts from './pages/Contacts';
import NotFound from './pages/NotFound';
import { CartProvider } from './context/CartContext';
import { FavoritesProvider } from './context/FavoritesContext';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <FavoritesProvider>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="catalog" element={<Catalog />} />
                <Route path="product/:slug" element={<ProductDetail />} />
                <Route path="favorites" element={<Favorites />} />
                <Route path="cart" element={<Cart />} />
                <Route path="checkout" element={<Checkout />} />
                <Route path="order-confirmation" element={<OrderConfirmation />} />
                <Route path="search" element={<Search />} />
                <Route path="login" element={<Auth />} />
                <Route path="admin" element={<Admin />} />
                <Route path="about" element={<About />} />
                <Route path="delivery" element={<Delivery />} />
                <Route path="faq" element={<FAQ />} />
                <Route path="contacts" element={<Contacts />} />
                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
          </FavoritesProvider>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;