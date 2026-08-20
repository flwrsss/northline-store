import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingBag, Check, ChevronLeft } from 'lucide-react';
import { useCart } from '../context/CartContext';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  country: string;
  city: string;
  address: string;
  postalCode: string;
  comment: string;
  deliveryMethod: 'standard' | 'express' | 'pickup';
  paymentMethod: 'card' | 'cash' | 'transfer';
  agreeToTerms: boolean;
}

interface FormErrors {
  [key: string]: string;
}

const Checkout = () => {
  const { items, subtotal, discount, shipping, total, clearCart } = useCart();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    country: '',
    city: '',
    address: '',
    postalCode: '',
    comment: '',
    deliveryMethod: 'standard',
    paymentMethod: 'card',
    agreeToTerms: false,
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email address';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone is required';
    } else if (!/^[\d\s\+\-\(\)]{10,}$/.test(formData.phone)) {
      newErrors.phone = 'Invalid phone number';
    }

    if (!formData.country.trim()) newErrors.country = 'Country is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.postalCode.trim()) newErrors.postalCode = 'Postal code is required';

    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = 'You must agree to the terms and conditions';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof FormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    // Generate order number
    const orderNumber = `NL-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substring(2, 7).toUpperCase()}`;

    // Save order to localStorage
    const order = {
      id: orderNumber,
      items,
      total,
      customerInfo: {
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        city: formData.city,
        postalCode: formData.postalCode,
        country: formData.country,
      },
      deliveryMethod: formData.deliveryMethod,
      paymentMethod: formData.paymentMethod,
      comment: formData.comment,
      createdAt: new Date().toISOString(),
    };

    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    orders.push(order);
    localStorage.setItem('orders', JSON.stringify(orders));
    localStorage.setItem('lastOrder', JSON.stringify(order));

    // Simulate processing
    setTimeout(() => {
      clearCart();
      setIsSubmitting(false);
      navigate(`/order-confirmation?order=${orderNumber}`);
    }, 1500);
  };

  if (items.length === 0) {
    return (
      <div className="container-north py-20">
        <div className="text-center py-20">
          <ShoppingBag size={64} className="mx-auto mb-6 text-gray-400" />
          <h1 className="text-3xl font-display mb-4">Your cart is empty</h1>
          <p className="text-gray-600 mb-8">Add items to your cart before checkout.</p>
          <Link to="/catalog" className="btn-primary">
            Go to Catalog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container-north py-12">
      <button
        onClick={() => navigate('/cart')}
        className="flex items-center gap-2 text-gray-600 hover:text-north-brown transition-colors mb-6"
      >
        <ChevronLeft size={20} />
        Back to Cart
      </button>

      <h1 className="text-4xl font-display font-bold mb-8">Checkout</h1>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Form */}
          <div className="lg:col-span-2 space-y-8">
            {/* Personal Information */}
            <div>
              <h2 className="text-xl font-display font-bold mb-4">Personal Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <input
                    type="text"
                    placeholder="First Name *"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    className={`w-full px-4 py-3 border ${
                      errors.firstName ? 'border-red-500' : 'border-north-light-gray focus:border-north-black'
                    } outline-none`}
                  />
                  {errors.firstName && (
                    <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
                  )}
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="Last Name *"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    className={`w-full px-4 py-3 border ${
                      errors.lastName ? 'border-red-500' : 'border-north-light-gray focus:border-north-black'
                    } outline-none`}
                  />
                  {errors.lastName && (
                    <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
                  )}
                </div>
                <div>
                  <input
                    type="email"
                    placeholder="Email *"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className={`w-full px-4 py-3 border ${
                      errors.email ? 'border-red-500' : 'border-north-light-gray focus:border-north-black'
                    } outline-none`}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                  )}
                </div>
                <div>
                  <input
                    type="tel"
                    placeholder="Phone *"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className={`w-full px-4 py-3 border ${
                      errors.phone ? 'border-red-500' : 'border-north-light-gray focus:border-north-black'
                    } outline-none`}
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Shipping Address */}
            <div>
              <h2 className="text-xl font-display font-bold mb-4">Shipping Address</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <input
                    type="text"
                    placeholder="Country *"
                    value={formData.country}
                    onChange={(e) => handleInputChange('country', e.target.value)}
                    className={`w-full px-4 py-3 border ${
                      errors.country ? 'border-red-500' : 'border-north-light-gray focus:border-north-black'
                    } outline-none`}
                  />
                  {errors.country && (
                    <p className="text-red-500 text-sm mt-1">{errors.country}</p>
                  )}
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="City *"
                    value={formData.city}
                    onChange={(e) => handleInputChange('city', e.target.value)}
                    className={`w-full px-4 py-3 border ${
                      errors.city ? 'border-red-500' : 'border-north-light-gray focus:border-north-black'
                    } outline-none`}
                  />
                  {errors.city && (
                    <p className="text-red-500 text-sm mt-1">{errors.city}</p>
                  )}
                </div>
                <div className="md:col-span-2">
                  <input
                    type="text"
                    placeholder="Address *"
                    value={formData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    className={`w-full px-4 py-3 border ${
                      errors.address ? 'border-red-500' : 'border-north-light-gray focus:border-north-black'
                    } outline-none`}
                  />
                  {errors.address && (
                    <p className="text-red-500 text-sm mt-1">{errors.address}</p>
                  )}
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="Postal Code *"
                    value={formData.postalCode}
                    onChange={(e) => handleInputChange('postalCode', e.target.value)}
                    className={`w-full px-4 py-3 border ${
                      errors.postalCode ? 'border-red-500' : 'border-north-light-gray focus:border-north-black'
                    } outline-none`}
                  />
                  {errors.postalCode && (
                    <p className="text-red-500 text-sm mt-1">{errors.postalCode}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Delivery Method */}
            <div>
              <h2 className="text-xl font-display font-bold mb-4">Delivery Method</h2>
              <div className="space-y-3">
                {[
                  { value: 'standard', label: 'Standard Delivery', time: '3-5 business days', price: '$15' },
                  { value: 'express', label: 'Express Delivery', time: '1-2 business days', price: '$25' },
                  { value: 'pickup', label: 'Pickup', time: 'From our store', price: 'Free' },
                ].map((method) => (
                  <label
                    key={method.value}
                    className={`flex items-center justify-between p-4 border cursor-pointer ${
                      formData.deliveryMethod === method.value
                        ? 'border-north-black bg-north-light-gray'
                        : 'border-north-light-gray hover:border-north-black'
                    } transition-colors`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="deliveryMethod"
                        value={method.value}
                        checked={formData.deliveryMethod === method.value}
                        onChange={(e) => handleInputChange('deliveryMethod', e.target.value)}
                        className="hidden"
                      />
                      <div>
                        <p className="font-medium">{method.label}</p>
                        <p className="text-sm text-gray-600">{method.time}</p>
                      </div>
                    </div>
                    <span className="font-medium">{method.price}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Payment Method */}
            <div>
              <h2 className="text-xl font-display font-bold mb-4">Payment Method</h2>
              <div className="space-y-3">
                {[
                  { value: 'card', label: 'Credit Card', description: 'Visa, Mastercard' },
                  { value: 'cash', label: 'Cash on Delivery', description: 'Pay when you receive' },
                  { value: 'transfer', label: 'Bank Transfer', description: 'Manual transfer' },
                ].map((method) => (
                  <label
                    key={method.value}
                    className={`flex items-center justify-between p-4 border cursor-pointer ${
                      formData.paymentMethod === method.value
                        ? 'border-north-black bg-north-light-gray'
                        : 'border-north-light-gray hover:border-north-black'
                    } transition-colors`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value={method.value}
                        checked={formData.paymentMethod === method.value}
                        onChange={(e) => handleInputChange('paymentMethod', e.target.value)}
                        className="hidden"
                      />
                      <div>
                        <p className="font-medium">{method.label}</p>
                        <p className="text-sm text-gray-600">{method.description}</p>
                      </div>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Comment */}
            <div>
              <h2 className="text-xl font-display font-bold mb-4">Additional Information</h2>
              <textarea
                placeholder="Order comment (optional)"
                value={formData.comment}
                onChange={(e) => handleInputChange('comment', e.target.value)}
                rows={4}
                className="w-full px-4 py-3 border border-north-light-gray focus:border-north-black outline-none"
              />
            </div>

            {/* Terms */}
            <div>
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.agreeToTerms}
                  onChange={(e) => handleInputChange('agreeToTerms', e.target.checked)}
                  className="mt-1"
                />
                <span className="text-sm text-gray-600">
                  I agree to the terms and conditions and privacy policy *
                </span>
              </label>
              {errors.agreeToTerms && (
                <p className="text-red-500 text-sm mt-1">{errors.agreeToTerms}</p>
              )}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="border border-north-light-gray p-6 sticky top-24">
              <h2 className="text-xl font-display font-bold mb-6">Order Summary</h2>

              <div className="space-y-3 max-h-64 overflow-y-auto mb-6">
                {items.map((item) => (
                  <div key={`${item.product.id}-${item.size}-${item.color}`} className="flex justify-between text-sm">
                    <span>
                      {item.product.name} × {item.quantity}
                      <span className="text-gray-500 block text-xs">
                        {item.size} / {item.color}
                      </span>
                    </span>
                    <span>${(item.product.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>

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
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-3 text-sm font-medium tracking-wider uppercase transition-colors ${
                  isSubmitting
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-north-black text-north-milk hover:bg-north-graphite'
                }`}
              >
                {isSubmitting ? 'Processing...' : 'Place Order'}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Checkout;