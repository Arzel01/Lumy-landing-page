import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from 'react';

export type MetodoEnvio = 'express' | 'standard';

export type ShippingInfo = {
  nombre: string;
  apellido: string;
  email: string;
  telefono: string;
  direccion: string;
  ciudad: string;
  estado: string;
  pais: string;
  cp: string;
  metodoEnvio: MetodoEnvio;
};

export type MetodoPago = 'card' | 'paypal';

export type PaymentInfo = {
  metodo: MetodoPago;
  cardNumero: string;
  cardNombre: string;
  cardExpiry: string;
  cardCvv: string;
};

type CheckoutContextType = {
  shipping: Partial<ShippingInfo>;
  payment: Partial<PaymentInfo>;
  orderNumber: string;
  setShipping: (info: Partial<ShippingInfo>) => void;
  setPayment: (info: Partial<PaymentInfo>) => void;
  confirmOrder: () => string;
};

const CheckoutContext = createContext<CheckoutContextType | null>(null);

export function CheckoutProvider({ children }: { children: ReactNode }) {
  const [shipping, setShipping] = useState<Partial<ShippingInfo>>({
    metodoEnvio: 'express',
  });
  const [payment, setPayment] = useState<Partial<PaymentInfo>>({
    metodo: 'card',
  });
  const [orderNumber, setOrderNumber] = useState('');

  const confirmOrder = () => {
    const num = `LMY-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderNumber(num);
    return num;
  };

  return (
    <CheckoutContext.Provider
      value={{ shipping, payment, orderNumber, setShipping, setPayment, confirmOrder }}
    >
      {children}
    </CheckoutContext.Provider>
  );
}

export function useCheckout() {
  const ctx = useContext(CheckoutContext);
  if (!ctx) throw new Error('useCheckout must be used within CheckoutProvider');
  return ctx;
}
