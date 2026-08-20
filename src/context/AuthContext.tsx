import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'customer';
  createdAt: string;
}

type UserWithoutPassword = Omit<User, 'password'>;

interface AuthContextType {
  user: UserWithoutPassword | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  register: (name: string, email: string, password: string) => { success: boolean; message: string };
  login: (email: string, password: string) => { success: boolean; message: string };
  logout: () => void;
  getAllUsers: () => UserWithoutPassword[];
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserWithoutPassword | null>(() => {
    const saved = localStorage.getItem('currentUser');
    return saved ? JSON.parse(saved) : null;
  });

  const [users, setUsers] = useState<User[]>(() => {
    const saved = localStorage.getItem('users');
    if (saved) return JSON.parse(saved);

    const defaultAdmin: User = {
      id: 'admin-1',
      name: 'Admin',
      email: 'admin@northline.com',
      password: 'admin123',
      role: 'admin',
      createdAt: new Date().toISOString(),
    };
    localStorage.setItem('users', JSON.stringify([defaultAdmin]));
    return [defaultAdmin];
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user));
    } else {
      localStorage.removeItem('currentUser');
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem('users', JSON.stringify(users));
  }, [users]);

  const register = (name: string, email: string, password: string) => {
    if (!name.trim() || !email.trim() || !password.trim()) {
      return { success: false, message: 'All fields are required' };
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return { success: false, message: 'Invalid email address' };
    }

    if (password.length < 6) {
      return { success: false, message: 'Password must be at least 6 characters' };
    }

    if (users.some(u => u.email === email)) {
      return { success: false, message: 'Email already registered' };
    }

    const newUser: User = {
      id: `user-${Date.now()}`,
      name,
      email,
      password,
      role: 'customer',
      createdAt: new Date().toISOString(),
    };

    setUsers(prev => [...prev, newUser]);

    const { password: _, ...userWithoutPassword } = newUser;
    setUser(userWithoutPassword);

    return { success: true, message: 'Registration successful' };
  };

  const login = (email: string, password: string) => {
    const foundUser = users.find(u => u.email === email && u.password === password);

    if (!foundUser) {
      return { success: false, message: 'Invalid email or password' };
    }

    const { password: _, ...userWithoutPassword } = foundUser;
    setUser(userWithoutPassword);

    return { success: true, message: 'Login successful' };
  };

  const logout = () => {
    setUser(null);
  };

  const getAllUsers = () => {
    return users.map(({ password, ...rest }) => rest);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isAdmin: user?.role === 'admin',
        register,
        login,
        logout,
        getAllUsers,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};