import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="container-north py-20 text-center">
      <h1 className="text-6xl md:text-8xl font-display mb-6">404</h1>
      <p className="text-xl text-gray-600 mb-8">Страница не найдена</p>
      <Link to="/" className="btn-primary">
        Вернуться на главную
      </Link>
    </div>
  );
};

export default NotFound;