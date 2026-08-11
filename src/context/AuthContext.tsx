import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

export type LumyDevice = {
  code: string;
  addedAt: string;
};

export type User = {
  id: string;
  name: string;
  devices: LumyDevice[];
  createdAt: string;
};

type StoredUser = { user: User; passwordHash: string };

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  login: (name: string, password: string) => Promise<{ error?: string }>;
  register: (name: string, password: string) => Promise<{ error?: string }>;
  logout: () => void;
  deleteAccount: () => void;
  addDevice: (code: string) => Promise<{ error?: string }>;
  removeDevice: (code: string) => void;
};

const SESSION_KEY = 'lumy_session';
const USERS_KEY = 'lumy_users';

const AuthContext = createContext<AuthContextType | null>(null);

function normalizeCode(code: string): string {
  return code.toUpperCase().replace(/[^A-Z0-9]/g, '').trim();
}

function getUsers(): Record<string, StoredUser> {
  try {
    const raw = sessionStorage.getItem(USERS_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function saveUsers(users: Record<string, StoredUser>) {
  sessionStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const raw = sessionStorage.getItem(SESSION_KEY);
    if (raw) {
      try {
        setUser(JSON.parse(raw));
      } catch {
        sessionStorage.removeItem(SESSION_KEY);
      }
    }
    setIsLoading(false);
  }, []);

  const syncUser = (updated: User) => {
    setUser(updated);
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(updated));
  };

  const login = async (name: string, password: string): Promise<{ error?: string }> => {
    const users = getUsers();
    const key = name.toLowerCase().trim();
    const entry = users[key];
    if (!entry) return { error: 'No existe una cuenta con ese nombre.' };
    if (entry.passwordHash !== btoa(password)) return { error: 'Contraseña incorrecta.' };
    syncUser(entry.user);
    return {};
  };

  const register = async (name: string, password: string): Promise<{ error?: string }> => {
    const trimmedName = name.trim();
    if (!trimmedName) return { error: 'El nombre es obligatorio.' };
    if (password.length < 6) return { error: 'La contraseña debe tener al menos 6 caracteres.' };
    const users = getUsers();
    const key = trimmedName.toLowerCase();
    if (users[key]) return { error: 'Ya existe una cuenta con ese nombre.' };
    const newUser: User = {
      id: crypto.randomUUID(),
      name: trimmedName,
      devices: [],
      createdAt: new Date().toISOString(),
    };
    users[key] = { user: newUser, passwordHash: btoa(password) };
    saveUsers(users);
    syncUser(newUser);
    return {};
  };

  const addDevice = async (code: string): Promise<{ error?: string }> => {
    if (!user) return { error: 'No hay sesión activa.' };
    const normalized = normalizeCode(code);
    if (normalized.length !== 16) return { error: 'El código debe tener exactamente 16 caracteres alfanuméricos.' };

    // Check if already added to this account
    if (user.devices.some((d) => d.code === normalized)) {
      return { error: 'Este dispositivo ya está añadido a tu cuenta.' };
    }

    // Check if claimed by another account
    const users = getUsers();
    const takenByOther = Object.values(users).some(
      (u) => u.user.id !== user.id && u.user.devices.some((d) => d.code === normalized)
    );
    if (takenByOther) return { error: 'Este código Lumy ya está vinculado a otra cuenta.' };

    const newDevice: LumyDevice = { code: normalized, addedAt: new Date().toISOString() };
    const updatedUser: User = { ...user, devices: [...user.devices, newDevice] };
    const key = user.name.toLowerCase().trim();
    users[key] = { ...users[key], user: updatedUser };
    saveUsers(users);
    syncUser(updatedUser);
    return {};
  };

  const removeDevice = (code: string) => {
    if (!user) return;
    const updatedUser: User = { ...user, devices: user.devices.filter((d) => d.code !== code) };
    const users = getUsers();
    const key = user.name.toLowerCase().trim();
    users[key] = { ...users[key], user: updatedUser };
    saveUsers(users);
    syncUser(updatedUser);
  };

  const logout = () => {
    setUser(null);
    sessionStorage.removeItem(SESSION_KEY);
  };

  const deleteAccount = () => {
    if (!user) return;
    const users = getUsers();
    delete users[user.name.toLowerCase().trim()];
    saveUsers(users);
    setUser(null);
    sessionStorage.removeItem(SESSION_KEY);
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, logout, deleteAccount, addDevice, removeDevice }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
}
