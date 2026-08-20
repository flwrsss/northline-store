import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, ShoppingBag } from 'lucide-react';
import { Product } from '../types';
import { useFavorites } from '../context/FavoritesContext';
import { useCart } from '../context/CartContext';

interface ProductCardProps {
  product: Product;
  index?: number;
  onQuickAdd?: (product: Product) => void;
}

const ProductCard = ({ product, index = 0, onQuickAdd }: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);
  const { isFavorite, toggleFavorite } = useFavorites();
  const { addToCart } = useCart();

  const isProductFavorite = isFavorite(product.id);

  const handleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(product);
  };

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    // Добавляем товар с первым доступным размером и цветом
    if (product.sizes.length > 0 && product.colors.length > 0) {
      addToCart(product, product.sizes[0], product.colors[0]);
    }
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setCurrentImage(0);
      }}
      aria-label={product.name}
    >
      <div className="relative overflow-hidden aspect-[3/4] bg-north-light-gray">
        <Link to={`/product/${product.slug}`} aria-label={`View ${product.name}`}>
          <img
            src={product.images[currentImage]}
            alt={`${product.name} - view ${currentImage + 1}`}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            onMouseEnter={() => {
              if (product.images.length > 1) setCurrentImage(1);
            }}
            onMouseLeave={() => setCurrentImage(0)}
          />
        </Link>

        {/* Badges */}
        <div className="absolute top-2 sm:top-4 left-2 sm:left-4 flex flex-col gap-1 sm:gap-2">
          {product.isNew && (
            <span className="bg-north-milk text-north-black px-2 sm:px-3 py-0.5 sm:py-1 text-[10px] sm:text-xs font-medium tracking-wider">
              NEW
            </span>
          )}
          {product.isBestseller && (
            <span className="bg-north-black text-north-milk px-2 sm:px-3 py-0.5 sm:py-1 text-[10px] sm:text-xs font-medium tracking-wider">
              BESTSELLER
            </span>
          )}
          {product.price < 100 && (
            <span className="bg-north-rust text-north-milk px-2 sm:px-3 py-0.5 sm:py-1 text-[10px] sm:text-xs font-medium tracking-wider">
              SALE
            </span>
          )}
        </div>

        {/* Favorite button */}
        <button
          onClick={handleFavorite}
          className="absolute top-2 sm:top-4 right-2 sm:right-4 p-2 bg-north-milk/80 backdrop-blur-sm hover:bg-north-milk transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
          aria-label={isProductFavorite ? 'Remove from favorites' : 'Add to favorites'}
          aria-pressed={isProductFavorite}
        >
          <Heart
            size={20}
            className={isProductFavorite ? 'fill-north-rust text-north-rust' : 'text-north-black'}
            aria-hidden="true"
          />
        </button>

        {/* Quick add button */}
        {isHovered && (
          <button
            onClick={handleQuickAdd}
            className="absolute bottom-0 left-0 right-0 bg-north-black text-north-milk py-3 text-sm font-medium tracking-wider uppercase flex items-center justify-center gap-2 hover:bg-north-graphite transition-colors min-h-[44px]"
            aria-label={`Quick add ${product.name} to cart`}
          >
            <ShoppingBag size={18} aria-hidden="true" />
            Quick Add
          </button>
        )}
      </div>

      <div className="mt-3 sm:mt-4">
        <Link to={`/product/${product.slug}`}>
          <h3 className="font-medium text-base sm:text-lg group-hover:text-north-brown transition-colors line-clamp-1">
            {product.name}
          </h3>
        </Link>
        <p className="text-gray-500 text-xs sm:text-sm capitalize mt-1">{product.category}</p>

        <div className="flex items-center gap-2 mt-2">
          <p className="font-medium text-sm sm:text-base">${product.price.toFixed(2)}</p>
          {product.price < 100 && (
            <p className="text-gray-400 line-through text-xs sm:text-sm">
              ${(product.price * 1.3).toFixed(2)}
            </p>
          )}
        </div>

        {/* Color variants */}
        <div className="flex gap-1.5 sm:gap-2 mt-2 sm:mt-3" aria-label="Available colors">
          {product.colors.slice(0, 4).map((color) => (
            <div
              key={color}
              className="w-4 h-4 sm:w-5 sm:h-5 rounded-full border border-gray-300"
              style={{
                backgroundColor:
                  color.toLowerCase() === 'black' ? '#111111' :
                  color.toLowerCase() === 'milk' ? '#F1EEE8' :
                  color.toLowerCase() === 'olive' ? '#5C624E' :
                  color.toLowerCase() === 'graphite' ? '#252525' :
                  color.toLowerCase() === 'brown' ? '#756457' :
                  color.toLowerCase() === 'rust' ? '#A45132' :
                  color.toLowerCase() === 'white' ? '#ffffff' :
                  color.toLowerCase() === 'indigo' ? '#4b0082' :
                  '#cccccc',
              }}
              title={color}
              role="img"
              aria-label={`Color: ${color}`}
            />
          ))}
        </div>
      </div>
    </motion.article>
  );
};

export default ProductCard;