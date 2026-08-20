import { Link } from 'react-router-dom';
import { Instagram, Facebook, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-north-black text-north-milk mt-20">
      <div className="container-north py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <h3 className="text-xl font-display font-bold tracking-widest mb-4">NORTHLINE</h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              Современная одежда для тех, кто ценит качество и стиль. Функциональный дизайн без компромиссов.
            </p>
            <div className="flex space-x-4 mt-6">
              <a href="#" className="hover:text-north-brown transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="hover:text-north-brown transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="hover:text-north-brown transition-colors">
                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider mb-4">Магазин</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link to="/catalog" className="hover:text-north-milk transition-colors">Каталог</Link>
              </li>
              <li>
                <Link to="/catalog?category=jackets" className="hover:text-north-milk transition-colors">Куртки</Link>
              </li>
              <li>
                <Link to="/catalog?category=outerwear" className="hover:text-north-milk transition-colors">Верхняя одежда</Link>
              </li>
              <li>
                <Link to="/catalog?category=accessories" className="hover:text-north-milk transition-colors">Аксессуары</Link>
              </li>
            </ul>
          </div>

          {/* Information */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider mb-4">Информация</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link to="/about" className="hover:text-north-milk transition-colors">О бренде</Link>
              </li>
              <li>
                <Link to="/delivery" className="hover:text-north-milk transition-colors">Доставка</Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-north-milk transition-colors">FAQ</Link>
              </li>
              <li>
                <Link to="/contacts" className="hover:text-north-milk transition-colors">Контакты</Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider mb-4">Новости</h4>
            <p className="text-sm text-gray-400 mb-4">
              Подпишитесь, чтобы узнавать о новых коллекциях и специальных предложениях.
            </p>
            <form className="flex">
              <input
                type="email"
                placeholder="Email"
                className="flex-1 px-3 py-2 text-sm bg-transparent border border-gray-600 focus:border-north-milk outline-none"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-north-milk text-north-black text-sm font-medium hover:bg-gray-200 transition-colors"
              >
                OK
              </button>
            </form>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-sm text-gray-500">
          <p>&copy; 2024 NORTHLINE. Все права защищены.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;