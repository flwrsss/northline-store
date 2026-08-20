import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Minus, Plus, X, ShoppingBag, Tag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { products } from '../data/products';
import ProductCard from '../components/ProductCard';

const Cart = () => {
  const { items, removeFromCart, updateQuantity, subtotal, discount, total, shipping, applyPromoCode, removePromoCode, promoCode, clearCart } = useCart();
  const [promoInput, setPromoInput] = useState('');
  const [promoMessage, setPromoMessage] = useState('');
  const [promoError, setPromoError] = useState(false);
  const navigate = useNavigate();

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoInput.trim()) return;

    const result = applyPromoCode(promoInput);
    setPromoMessage(result.message);
    setPromoError(!result.success);

    if (result.success) {
      setPromoInput('');
    }
  };

  const similarProducts = products
    .filter(p => items.some(item => item.product.category === p.category))
    .filter(p => !items.some(item => item.product.id === p.id))
    .slice(0, 4);

  if (items.length === 0) {
    return (
      <div className="container-north py-20">
        <div className="text-center py-20">
          <ShoppingBag size={64} className="mx-auto mb-6 text-gray-400" />
          <h1 className="text-3xl font-display mb-4">Your cart is empty</h1>
          <p className="text-gray-600 mb-8">Looks like you haven't added anything yet.</p>
          <Link to="/catalog" className="btn-primary">
            Start Shopping
          </Link>
        </div>

        {similarProducts.length > 0 && (
          <section className="mt-20">
            <h2 className="text-2xl font-display font-bold mb-8">You might like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {similarProducts.slice(0, 4).map((product, index) => (
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
      <h1 className="text-4xl font-display font-bold mb-8">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <motion.div
              key={`${item.product.id}-${item.size}-${item.color}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex gap-4 border border-north-light-gray p-4"
            >
              <Link to={`/product/${item.product.slug}`} className="w-24 h-32 flex-shrink-0">
                <img
                  src={item.product.images[0]}
                  alt={item.product.name}
                  className="w-full h-full object-cover"
                />
              </Link>

              <div className="flex-1">
                <div className="flex justify-between">
                  <div>
                    <Link to={`/product/${item.product.slug}`} className="font-medium hover:text-north-brown transition-colors">
                      {item.product.name}
                    </Link>
                    <p className="text-sm text-gray-600 mt-1">Size: {item.size}</p>
                    <p className="text-sm text-gray-600">Color: {item.color}</p>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.product.id, item.size, item.color)}
                    className="p-1 hover:text-north-brown transition-colors"
                    aria-label="Remove item"
                  >
                    <X size={20} />
                  </button>
                </div>

                <div className="flex justify-between items-center mt-4">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => updateQuantity(item.product.id, item.size, item.color, item.quantity - 1)}
                      className="p-1 border border-north-light-gray hover:border-north-black transition-colors"
                      aria-label="Decrease quantity"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="w-8 text-center">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.product.id, item.size, item.color, item.quantity + 1)}
                      className="p-1 border border-north-light-gray hover:border-north-black transition-colors"
                      aria-label="Increase quantity"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                  <p className="font-medium">
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}

          <button
            onClick={clearCart}
            className="text-sm text-gray-600 hover:text-north-brown transition-colors"
          >
            Clear Cart
          </button>
        </div>

        {/* Summary */}
        <div className="lg:col-span-1">
          <div className="border border-north-light-gray p-6 sticky top-24">
            <h2 className="text-xl font-display font-bold mb-6">Order Summary</h2>

            {/* Promo Code */}
            <form onSubmit={handleApplyPromo} className="mb-6">
              <label className="block text-sm font-medium mb-2">Promo Code</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={promoInput}
                  onChange={(e) => setPromoInput(e.target.value)}
                  placeholder="Enter code"
                  className="flex-1 px-3 py-2 border border-north-light-gray focus:border-north-black outline-none text-sm"
                  disabled={!!promoCode}
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-north-black text-north-milk text-sm font-medium hover:bg-north-graphite transition-colors"
                  disabled={!!promoCode}
                >
                  Apply
                </button>
              </div>
              {promoMessage && (
                <p className={`text-sm mt-2 ${promoError ? 'text-red-600' : 'text-green-600'}`}>
                  {promoMessage}
                </p>
              )}
              {promoCode && (
                <div className="flex items-center gap-2 mt-2">
                  <Tag size={16} className="text-north-brown" />
                  <span className="text-sm">{promoCode}</span>
                  <button
                    onClick={removePromoCode}
                    className="text-sm text-gray-600 hover:text-north-brown transition-colors"
                  >
                    Remove
                  </button>
                </div>
              )}
            </form>

            <div className="space-y-3 text-sm mb-6">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Discount</span>
                  <span>-${discount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
              </div>
              <div className="border-t border-north-light-gray pt-3">
                <div className="flex justify-between font-medium text-lg">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => navigate('/checkout')}
              className="w-full bg-north-black text-north-milk py-3 text-sm font-medium tracking-wider uppercase hover:bg-north-graphite transition-colors"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;