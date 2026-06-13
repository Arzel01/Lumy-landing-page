import {
  createContext,
  useContext,
  useReducer,
  type ReactNode,
} from 'react';

export type CartItem = {
  id: string;
  name: string;
  colorId: string;
  colorLabel: string;
  colorHex: string;
  quantity: number;
  unitPrice: number;
  imageLabel: string;
};

type CartState = { items: CartItem[] };

type CartAction =
  | { type: 'ADD_ITEM'; payload: CartItem }
  | { type: 'UPDATE_QTY'; payload: { id: string; quantity: number } }
  | { type: 'REMOVE_ITEM'; payload: { id: string } }
  | { type: 'CLEAR' };

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existing = state.items.find((i) => i.id === action.payload.id);
      if (existing) {
        return {
          items: state.items.map((i) =>
            i.id === action.payload.id
              ? { ...i, quantity: i.quantity + action.payload.quantity }
              : i
          ),
        };
      }
      return { items: [...state.items, action.payload] };
    }
    case 'UPDATE_QTY':
      return {
        items: state.items.map((i) =>
          i.id === action.payload.id
            ? { ...i, quantity: action.payload.quantity }
            : i
        ),
      };
    case 'REMOVE_ITEM':
      return { items: state.items.filter((i) => i.id !== action.payload.id) };
    case 'CLEAR':
      return { items: [] };
  }
}

type CartContextType = {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  updateQty: (id: string, quantity: number) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  total: number;
  itemCount: number;
};

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [] });

  const total = state.items.reduce(
    (sum, i) => sum + i.unitPrice * i.quantity,
    0
  );
  const itemCount = state.items.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items: state.items,
        addItem: (item) => dispatch({ type: 'ADD_ITEM', payload: item }),
        updateQty: (id, quantity) =>
          dispatch({ type: 'UPDATE_QTY', payload: { id, quantity } }),
        removeItem: (id) =>
          dispatch({ type: 'REMOVE_ITEM', payload: { id } }),
        clearCart: () => dispatch({ type: 'CLEAR' }),
        total,
        itemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
