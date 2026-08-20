import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ShoppingBag, Heart, Menu, X, Search, User, LogOut } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useFavorites } from '../context/FavoritesContext';
import { useAuth } from '../context/AuthContext';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { totalItems } = useCart();
  const { totalFavorites } = useFavorites();
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const menuRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsMenuOpen(false);
    setIsUserMenuOpen(false);
  }, [location]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsMenuOpen(false);
        setIsUserMenuOpen(false);
        setSearchQuery('');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsMenuOpen(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
    }
  };

  const handleLogout = () => {
    logout();
    setIsUserMenuOpen(false);
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-50 bg-north-milk bg-opacity-95 backdrop-blur-sm border-b border-north-light-gray" role="banner">
      <div className="container-north">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 min-h-[44px] min-w-[44px]"
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
          >
            {isMenuOpen ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
          </button>

          {/* Logo */}
          <Link
            to="/"
            className="text-xl sm:text-2xl font-display font-bold tracking-widest"
            aria-label="NORTHLINE home"
          >
            NORTHLINE
          </Link>

          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center space-x-8" aria-label="Main navigation">
            <Link to="/catalog" className="text-sm font-medium hover:text-north-brown transition-colors py-2">
              Каталог
            </Link>
            <Link to="/about" className="text-sm font-medium hover:text-north-brown transition-colors py-2">
              О бренде
            </Link>
            <Link to="/delivery" className="text-sm font-medium hover:text-north-brown transition-colors py-2">
              Доставка
            </Link>
            <Link to="/faq" className="text-sm font-medium hover:text-north-brown transition-colors py-2">
              FAQ
            </Link>
            <Link to="/contacts" className="text-sm font-medium hover:text-north-brown transition-colors py-2">
              Контакты
            </Link>
            {isAdmin && (
              <Link to="/admin" className="text-sm font-medium text-north-rust hover:text-north-brown transition-colors py-2">
                Admin
              </Link>
            )}
          </nav>

          {/* Right icons */}
          <div className="flex items-center space-x-1 sm:space-x-3">
            <form onSubmit={handleSearch} className="hidden md:block relative" role="search">
              <label htmlFor="desktop-search" className="sr-only">Search products</label>
              <input
                id="desktop-search"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Поиск..."
                className="pl-3 pr-8 py-2 text-sm border border-north-light-gray focus:border-north-black outline-none bg-transparent w-32 lg:w-48"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2"
                aria-label="Search"
              >
                <Search size={16} aria-hidden="true" />
              </button>
            </form>

            {/* User menu */}
            <div className="relative" ref={userMenuRef}>
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="p-2 hover:text-north-brown transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
                aria-label={isAuthenticated ? 'User menu' : 'Login'}
                aria-expanded={isUserMenuOpen}
              >
                <User size={22} aria-hidden="true" />
              </button>

              {isUserMenuOpen && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-north-milk border border-north-light-gray shadow-lg z-50">
                  {isAuthenticated ? (
                    <div>
                      <div className="px-4 py-3 border-b border-north-light-gray">
                        <p className="font-medium text-sm">{user?.name}</p>
                        <p className="text-xs text-gray-500">{user?.email}</p>
                      </div>
                      {isAdmin && (
                        <Link
                          to="/admin"
                          className="block px-4 py-2 text-sm hover:bg-north-light-gray transition-colors"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          Admin Panel
                        </Link>
                      )}
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-sm hover:bg-north-light-gray transition-colors flex items-center gap-2"
                      >
                        <LogOut size={16} />
                        Logout
                      </button>
                    </div>
                  ) : (
                    <div>
                      <Link
                        to="/login"
                        className="block px-4 py-2 text-sm hover:bg-north-light-gray transition-colors"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        Login
                      </Link>
                      <Link
                        to="/login"
                        className="block px-4 py-2 text-sm hover:bg-north-light-gray transition-colors"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        Register
                      </Link>
                    </div>
                  )}
                </div>
              )}
            </div>

            <Link
              to="/favorites"
              className="relative p-2 hover:text-north-brown transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-label={`Favorites (${totalFavorites} items)`}
            >
              <Heart size={22} aria-hidden="true" />
              {totalFavorites > 0 && (
                <span className="absolute -top-1 -right-1 bg-north-rust text-north-milk text-xs w-5 h-5 rounded-full flex items-center justify-center" aria-hidden="true">
                  {totalFavorites}
                </span>
              )}
            </Link>

            <Link
              to="/cart"
              className="relative p-2 hover:text-north-brown transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-label={`Cart (${totalItems} items)`}
            >
              <ShoppingBag size={22} aria-hidden="true" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-north-black text-north-milk text-xs w-5 h-5 rounded-full flex items-center justify-center" aria-hidden="true">
                  {totalItems}
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div
            id="mobile-menu"
            ref={menuRef}
            className="md:hidden py-4 border-t border-north-light-gray"
            role="dialog"
            aria-label="Mobile menu"
          >
            <form onSubmit={handleSearch} className="relative mb-4" role="search">
              <label htmlFor="mobile-search" className="sr-only">Search products</label>
              <input
                id="mobile-search"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Поиск..."
                className="w-full pl-3 pr-8 py-3 text-sm border border-north-light-gray focus:border-north-black outline-none bg-transparent"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2"
                aria-label="Search"
              >
                <Search size={16} aria-hidden="true" />
              </button>
            </form>
            <nav className="flex flex-col space-y-1" aria-label="Mobile navigation">
              {[
                { to: '/catalog', label: 'Каталог' },
                { to: '/about', label: 'О бренде' },
                { to: '/delivery', label: 'Доставка' },
                { to: '/faq', label: 'FAQ' },
                { to: '/contacts', label: 'Контакты' },
              ].map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="text-sm font-medium py-3 px-2 hover:bg-north-light-gray transition-colors rounded"
                >
                  {link.label}
                </Link>
              ))}
              {isAdmin && (
                <Link
                  to="/admin"
                  className="text-sm font-medium py-3 px-2 hover:bg-north-light-gray transition-colors rounded text-north-rust"
                >
                  Admin Panel
                </Link>
              )}
              {isAuthenticated ? (
                <button
                  onClick={handleLogout}
                  className="text-left text-sm font-medium py-3 px-2 hover:bg-north-light-gray transition-colors rounded"
                >
                  Logout ({user?.name})
                </button>
              ) : (
                <Link
                  to="/login"
                  className="text-sm font-medium py-3 px-2 hover:bg-north-light-gray transition-colors rounded"
                >
                  Login / Register
                </Link>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;