import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag } from 'lucide-react';
import { Product } from '../types';

interface QuickAddModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, size: string, color: string) => void;
}

const QuickAddModal = ({ product, onClose, onAddToCart }: QuickAddModalProps) => {
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (!product) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [product, onClose]);

  useEffect(() => {
    if (product) {
      setSelectedSize('');
      setSelectedColor('');
      setError('');
    }
  }, [product]);

  const handleAddToCart = () => {
    if (!selectedSize) {
      setError('Please select a size');
      return;
    }
    if (!selectedColor) {
      setError('Please select a color');
      return;
    }

    onAddToCart(product!, selectedSize, selectedColor);
    onClose();
  };

  return (
    <AnimatePresence>
      {product && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label={`Quick add ${product.name}`}
        >
          <div className="absolute inset-0 bg-black bg-opacity-50" />

          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative bg-north-milk max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 hover:bg-north-light-gray transition-colors z-10 min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-label="Close modal"
            >
              <X size={24} aria-hidden="true" />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="aspect-[3/4] bg-north-light-gray">
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-4 sm:p-6 md:p-8">
                <h3 className="text-xl sm:text-2xl font-display font-bold mb-2">{product.name}</h3>
                <p className="text-gray-600 capitalize mb-4 text-sm sm:text-base">{product.category}</p>
                <p className="text-xl sm:text-2xl font-medium mb-6">${product.price.toFixed(2)}</p>

                {/* Size selection */}
                <div className="mb-6">
                  <h4 className="font-medium mb-3 text-sm sm:text-base">Select Size</h4>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => {
                          setSelectedSize(size);
                          setError('');
                        }}
                        className={`px-3 sm:px-4 py-2 border text-sm min-h-[44px] min-w-[44px] ${
                          selectedSize === size
                            ? 'border-north-black bg-north-black text-north-milk'
                            : 'border-north-light-gray hover:border-north-black'
                        } transition-colors`}
                        aria-pressed={selectedSize === size}
                        aria-label={`Size ${size}`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Color selection */}
                <div className="mb-6">
                  <h4 className="font-medium mb-3 text-sm sm:text-base">Select Color</h4>
                  <div className="flex flex-wrap gap-2">
                    {product.colors.map((color) => (
                      <button
                        key={color}
                        onClick={() => {
                          setSelectedColor(color);
                          setError('');
                        }}
                        className={`px-3 sm:px-4 py-2 border text-sm min-h-[44px] ${
                          selectedColor === color
                            ? 'border-north-black bg-north-black text-north-milk'
                            : 'border-north-light-gray hover:border-north-black'
                        } transition-colors`}
                        aria-pressed={selectedColor === color}
                        aria-label={`Color ${color}`}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>

                {error && (
                  <p className="text-red-600 text-sm mb-4" role="alert">
                    {error}
                  </p>
                )}

                <button
                  onClick={handleAddToCart}
                  className="w-full bg-north-black text-north-milk py-3 text-sm font-medium tracking-wider uppercase flex items-center justify-center gap-2 hover:bg-north-graphite transition-colors min-h-[44px]"
                >
                  <ShoppingBag size={18} aria-hidden="true" />
                  Add to Cart
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default QuickAddModal;