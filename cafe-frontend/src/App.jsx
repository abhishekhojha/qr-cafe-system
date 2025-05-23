import { BrowserRouter as Router, Routes, Route, Link } from 'react-router';
import Customer from './pages/Customer';
import Kitchen from './pages/Kitchen';
import Admin from './pages/Admin';
import NavBar from './components/Navbar';
import Checkout from './pages/Checkout';

export default function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Customer />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/kitchen" element={<Kitchen />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </Router>
  );
}
