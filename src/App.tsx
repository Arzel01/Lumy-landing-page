import { Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CaracteristicasPage from './pages/CaracteristicasPage';
import HardwarePage from './pages/HardwarePage';
import TiendaPage from './pages/TiendaPage';
import SoportePage from './pages/SoportePage';
import CheckoutLayout from './layouts/CheckoutLayout';
import CartPage from './pages/checkout/CartPage';
import ShippingPage from './pages/checkout/ShippingPage';
import PaymentPage from './pages/checkout/PaymentPage';
import ConfirmationPage from './pages/checkout/ConfirmationPage';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/caracteristicas" element={<CaracteristicasPage />} />
      <Route path="/hardware" element={<HardwarePage />} />
      <Route path="/tienda" element={<TiendaPage />} />
      <Route path="/soporte" element={<SoportePage />} />

      <Route path="/checkout" element={<CheckoutLayout />}>
        <Route index element={<Navigate to="/checkout/carrito" replace />} />
        <Route path="carrito" element={<CartPage />} />
        <Route path="envio" element={<ShippingPage />} />
        <Route path="pago" element={<PaymentPage />} />
        <Route path="confirmacion" element={<ConfirmationPage />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
