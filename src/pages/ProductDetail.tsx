import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, ShoppingBag, Minus, Plus, Star, Truck, RotateCcw, Ruler } from 'lucide-react';
import { getProductBySlug } from '../data/products';
import { products } from '../data/products';
import ProductCard from '../components/ProductCard';
import Accordion from '../components/Accordion';
import SizeGuideModal from '../components/SizeGuideModal';
import Lightbox from '../components/Lightbox';
import Toast from '../components/Toast';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useFavorites } from '../context/FavoritesContext';
import { useCart } from '../context/CartContext';
import { Product } from '../types';

const ProductDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const product = getProductBySlug(slug || '');

  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [currentImage, setCurrentImage] = useState(0);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [error, setError] = useState('');
  const [toast, setToast] = useState('');
  const [showToast, setShowToast] = useState(false);

  const { toggleFavorite, isFavorite } = useFavorites();
  const { addToCart } = useCart();
  const [recentlyViewed, setRecentlyViewed] = useLocalStorage<Product[]>('recentlyViewed', []);

  useEffect(() => {
    if (product) {
      // Add to recently viewed
      setRecentlyViewed(prev => {
        const filtered = prev.filter(p => p.id !== product.id);
        return [product, ...filtered].slice(0, 8);
      });
    }
  }, [product?.id]);

  if (!product) {
    return (
      <div className="container-north py-20 text-center">
        <h1 className="text-4xl font-display mb-4">Product not found</h1>
        <p className="text-gray-600 mb-8">The product you're looking for doesn't exist.</p>
        <Link to="/catalog" className="btn-primary">Back to Catalog</Link>
      </div>
    );
  }

  const similarProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const accordionItems = [
    {
      title: 'Materials & Care',
      content: `Material: ${product.material}. ${product.careInstructions}.`
    },
    {
      title: 'Shipping & Returns',
      content: 'Free shipping on orders over $100. Returns accepted within 14 days of delivery. Items must be unworn with original tags.'
    },
    {
      title: 'Fit & Sizing',
      content: 'True to size. Model is 185cm wearing size M. Refer to our size guide for detailed measurements.'
    }
  ];

  const handleAddToCart = (redirectToCheckout = false) => {
    if (!selectedSize) {
      setError('Please select a size');
      return;
    }
    if (!selectedColor) {
      setError('Please select a color');
      return;
    }

    setError('');
    addToCart(product, selectedSize, selectedColor, quantity);
    setToast(`${product.name} added to cart`);
    setShowToast(true);

    if (redirectToCheckout) {
      setTimeout(() => navigate('/checkout'), 1000);
    }
  };

  const handleFavorite = () => {
    toggleFavorite(product);
    setToast(isFavorite(product.id) ? 'Removed from favorites' : 'Added to favorites');
    setShowToast(true);
  };

  const handleNextImage = () => {
    setCurrentImage(prev => (prev + 1) % product.images.length);
  };

  const handlePrevImage = () => {
    setCurrentImage(prev => (prev - 1 + product.images.length) % product.images.length);
  };

  return (
    <div className="container-north py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Gallery */}
        <div>
          <div
            className="aspect-[3/4] overflow-hidden bg-north-light-gray mb-4 cursor-pointer"
            onClick={() => setIsLightboxOpen(true)}
          >
            <motion.img
              key={currentImage}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              src={product.images[currentImage]}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="grid grid-cols-4 gap-4">
            {product.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setCurrentImage(index)}
                className={`aspect-[3/4] overflow-hidden bg-north-light-gray ${
                  currentImage === index ? 'ring-2 ring-north-black' : 'opacity-70 hover:opacity-100'
                } transition-all`}
              >
                <img src={image} alt={`${product.name} view ${index + 1}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div>
          <p className="text-sm text-gray-500 capitalize mb-2">{product.category}</p>
          <h1 className="text-3xl md:text-4xl font-display font-bold mb-4">{product.name}</h1>

          {/* Rating */}
          <div className="flex items-center gap-2 mb-4">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={16} className="fill-north-rust text-north-rust" />
              ))}
            </div>
            <span className="text-sm text-gray-600">4.8 (24 reviews)</span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-3 mb-6">
            <p className="text-3xl font-medium">${product.price.toFixed(2)}</p>
            {product.price < 100 && (
              <p className="text-xl text-gray-400 line-through">
                ${(product.price * 1.3).toFixed(2)}
              </p>
            )}
          </div>

          <p className="text-gray-600 mb-8 leading-relaxed">{product.description}</p>

          {/* Colors */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-medium">Color: {selectedColor || 'Select color'}</h3>
            </div>
            <div className="flex flex-wrap gap-3">
              {product.colors.map((color) => (
                <button
                  key={color}
                  onClick={() => {
                    setSelectedColor(color);
                    setError('');
                  }}
                  className={`px-4 py-2 border ${
                    selectedColor === color
                      ? 'border-north-black bg-north-black text-north-milk'
                      : 'border-north-light-gray hover:border-north-black'
                  } transition-colors`}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>

          {/* Sizes */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-medium">Size: {selectedSize || 'Select size'}</h3>
              <button
                onClick={() => setIsSizeGuideOpen(true)}
                className="flex items-center gap-1 text-sm text-gray-600 hover:text-north-brown transition-colors"
              >
                <Ruler size={16} />
                Size Guide
              </button>
            </div>
            <div className="flex flex-wrap gap-3">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => {
                    setSelectedSize(size);
                    setError('');
                  }}
                  className={`px-4 py-2 border ${
                    selectedSize === size
                      ? 'border-north-black bg-north-black text-north-milk'
                      : 'border-north-light-gray hover:border-north-black'
                  } transition-colors`}
                >
                  {size}
                </button>
              ))}
            </div>
            {error && (
              <p className="text-red-600 text-sm mt-2">{error}</p>
            )}
          </div>

          {/* Quantity */}
          <div className="mb-6">
            <h3 className="font-medium mb-3">Quantity</h3>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="p-2 border border-north-light-gray hover:border-north-black transition-colors"
                aria-label="Decrease quantity"
              >
                <Minus size={18} />
              </button>
              <span className="text-lg font-medium w-8 text-center">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="p-2 border border-north-light-gray hover:border-north-black transition-colors"
                aria-label="Increase quantity"
              >
                <Plus size={18} />
              </button>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <button
              onClick={() => handleAddToCart(false)}
              className="flex-1 bg-north-black text-north-milk py-4 text-sm font-medium tracking-wider uppercase flex items-center justify-center gap-2 hover:bg-north-graphite transition-colors"
            >
              <ShoppingBag size={20} />
              Add to Cart
            </button>
            <button
              onClick={() => handleAddToCart(true)}
              className="flex-1 border border-north-black py-4 text-sm font-medium tracking-wider uppercase hover:bg-north-black hover:text-north-milk transition-colors"
            >
              Buy Now
            </button>
            <button
              onClick={handleFavorite}
              className={`p-4 border ${
                isFavorite(product.id)
                  ? 'border-north-rust bg-north-rust text-north-milk'
                  : 'border-north-light-gray hover:border-north-black'
              } transition-colors`}
              aria-label="Add to favorites"
            >
              <Heart size={20} className={isFavorite(product.id) ? 'fill-current' : ''} />
            </button>
          </div>

          {/* Shipping Info */}
          <div className="flex gap-6 mb-8 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <Truck size={18} />
              <span>Free shipping over $100</span>
            </div>
            <div className="flex items-center gap-2">
              <RotateCcw size={18} />
              <span>14-day returns</span>
            </div>
          </div>

          {/* Accordion */}
          <Accordion items={accordionItems} />
        </div>
      </div>

      {/* Similar Products */}
      {similarProducts.length > 0 && (
        <section className="mt-20">
          <h2 className="text-2xl md:text-3xl font-display font-bold mb-8">You May Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {similarProducts.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        </section>
      )}

      {/* Recently Viewed */}
      {recentlyViewed.length > 1 && (
        <section className="mt-20">
          <h2 className="text-2xl md:text-3xl font-display font-bold mb-8">Recently Viewed</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {recentlyViewed.slice(1, 5).map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        </section>
      )}

      {/* Modals */}
      <SizeGuideModal
        isOpen={isSizeGuideOpen}
        onClose={() => setIsSizeGuideOpen(false)}
      />

      {isLightboxOpen && (
        <Lightbox
          images={product.images}
          currentIndex={currentImage}
          onClose={() => setIsLightboxOpen(false)}
          onNext={handleNextImage}
          onPrev={handlePrevImage}
        />
      )}

      <Toast
        message={toast}
        isVisible={showToast}
        onClose={() => setShowToast(false)}
      />
    </div>
  );
};

export default ProductDetail;