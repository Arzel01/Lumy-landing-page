import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

export type User = {
  id: string;
  name: string;
  email: string;
  createdAt: string;
};

type StoredUser = { user: User; passwordHash: string };

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ error?: string }>;
  register: (name: string, email: string, password: string) => Promise<{ error?: string }>;
  logout: () => void;
  deleteAccount: () => void;
};

const SESSION_KEY = 'lumy_session';
const USERS_KEY = 'lumy_users';

const AuthContext = createContext<AuthContextType | null>(null);

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

  const login = async (email: string, password: string): Promise<{ error?: string }> => {
    const users = getUsers();
    const entry = users[email.toLowerCase().trim()];
    if (!entry) return { error: 'No existe una cuenta con ese correo.' };
    if (entry.passwordHash !== btoa(password)) return { error: 'Contraseña incorrecta.' };
    setUser(entry.user);
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(entry.user));
    return {};
  };

  const register = async (
    name: string,
    email: string,
    password: string
  ): Promise<{ error?: string }> => {
    const users = getUsers();
    const key = email.toLowerCase().trim();
    if (users[key]) return { error: 'Ya existe una cuenta con ese correo.' };
    const newUser: User = {
      id: crypto.randomUUID(),
      name: name.trim(),
      email: key,
      createdAt: new Date().toISOString(),
    };
    users[key] = { user: newUser, passwordHash: btoa(password) };
    saveUsers(users);
    setUser(newUser);
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(newUser));
    return {};
  };

  const logout = () => {
    setUser(null);
    sessionStorage.removeItem(SESSION_KEY);
  };

  const deleteAccount = () => {
    if (!user) return;
    const users = getUsers();
    delete users[user.email];
    saveUsers(users);
    setUser(null);
    sessionStorage.removeItem(SESSION_KEY);
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, logout, deleteAccount }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
}
