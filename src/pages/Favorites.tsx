import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, ShoppingBag } from 'lucide-react';
import { useFavorites } from '../context/FavoritesContext';
import { useCart } from '../context/CartContext';
import { products } from '../data/products';
import ProductCard from '../components/ProductCard';
import { Product } from '../types';

const Favorites = () => {
  const { favorites, removeFromFavorites } = useFavorites();
  const { addToCart } = useCart();
  const [addedToCart, setAddedToCart] = useState<string[]>([]);

  const handleAddToCart = (product: Product) => {
    addToCart(product, product.sizes[0], product.colors[0]);
    setAddedToCart(prev => [...prev, product.id]);
    setTimeout(() => {
      setAddedToCart(prev => prev.filter(id => id !== product.id));
    }, 2000);
  };

  const similarProducts = products
    .filter(p => !favorites.some(f => f.id === p.id))
    .slice(0, 4);

  if (favorites.length === 0) {
    return (
      <div className="container-north py-20">
        <div className="text-center py-20">
          <Heart size={64} className="mx-auto mb-6 text-gray-400" />
          <h1 className="text-3xl font-display mb-4">No favorites yet</h1>
          <p className="text-gray-600 mb-8">Save your favorite items here.</p>
          <Link to="/catalog" className="btn-primary">
            Browse Catalog
          </Link>
        </div>

        {similarProducts.length > 0 && (
          <section className="mt-20">
            <h2 className="text-2xl font-display font-bold mb-8">Recommended for you</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {similarProducts.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
            </div>
          </section>
        )}
      </div>
    );
  }

  return (
    <div className="container-north py-12">
      <h1 className="text-4xl font-display font-bold mb-8">Favorites ({favorites.length})</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {favorites.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
            className="group relative"
          >
            <Link to={`/product/${product.slug}`}>
              <div className="relative overflow-hidden aspect-[3/4] bg-north-light-gray">
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="mt-4">
                <h3 className="font-medium group-hover:text-north-brown transition-colors">
                  {product.name}
                </h3>
                <p className="text-gray-600 mt-1">${product.price.toFixed(2)}</p>
              </div>
            </Link>

            <div className="flex gap-2 mt-3">
              <button
                onClick={() => handleAddToCart(product)}
                className="flex-1 bg-north-black text-north-milk py-2 text-sm font-medium uppercase flex items-center justify-center gap-1 hover:bg-north-graphite transition-colors"
              >
                <ShoppingBag size={16} />
                {addedToCart.includes(product.id) ? 'Added!' : 'Add to Cart'}
              </button>
              <button
                onClick={() => removeFromFavorites(product.id)}
                className="p-2 border border-north-light-gray hover:border-north-brown hover:text-north-brown transition-colors"
                aria-label="Remove from favorites"
              >
                <Heart size={18} className="fill-north-brown text-north-brown" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Favorites;