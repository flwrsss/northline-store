import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ShoppingBag, Heart, Menu, X, Search } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useFavorites } from '../context/FavoritesContext';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { totalItems } = useCart();
  const { totalFavorites } = useFavorites();
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsMenuOpen(false);
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
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
      setIsSearchFocused(false);
    }
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
            className="text-2xl font-display font-bold tracking-widest"
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
          </nav>

          {/* Right icons */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            <form onSubmit={handleSearch} className="hidden md:block relative" role="search">
              <label htmlFor="desktop-search" className="sr-only">Search products</label>
              <input
                id="desktop-search"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
                placeholder="Поиск..."
                className="pl-3 pr-8 py-2 text-sm border border-north-light-gray focus:border-north-black outline-none bg-transparent w-40 lg:w-48"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2"
                aria-label="Search"
              >
                <Search size={16} aria-hidden="true" />
              </button>
            </form>

            <Link
              to="/favorites"
              className="relative p-2 hover:text-north-brown transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-label={`Favorites (${totalFavorites} items)`}
            >
              <Heart size={22} aria-hidden="true" />
              {totalFavorites > 0 && (
                <span className="absolute -top-1 -right-1 bg-north-brown text-north-milk text-xs w-5 h-5 rounded-full flex items-center justify-center" aria-hidden="true">
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
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;