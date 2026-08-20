import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, Package, Truck } from 'lucide-react';

interface Order {
  id: string;
  total: number;
  customerInfo: {
    name: string;
    email: string;
  };
  deliveryMethod: string;
  createdAt: string;
}

const OrderConfirmation = () => {
  const [searchParams] = useSearchParams();
  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    const lastOrder = localStorage.getItem('lastOrder');
    if (lastOrder) {
      setOrder(JSON.parse(lastOrder));
    }
  }, []);

  if (!order) {
    return (
      <div className="container-north py-20 text-center">
        <h1 className="text-3xl font-display mb-4">No order found</h1>
        <Link to="/catalog" className="btn-primary">Go to Catalog</Link>
      </div>
    );
  }

  return (
    <div className="container-north py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl mx-auto text-center"
      >
        <CheckCircle size={80} className="mx-auto mb-6 text-green-600" />
        <h1 className="text-4xl font-display font-bold mb-4">Order Confirmed!</h1>
        <p className="text-gray-600 text-lg mb-2">
          Thank you for your order, {order.customerInfo.name}!
        </p>
        <p className="text-gray-600 mb-8">
          A confirmation email has been sent to {order.customerInfo.email}
        </p>

        <div className="border border-north-light-gray p-8 mb-8">
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-gray-600">Order Number</span>
              <span className="font-medium">{order.id}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Total</span>
              <span className="font-medium">${order.total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Delivery Method</span>
              <span className="font-medium capitalize">{order.deliveryMethod}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Order Date</span>
              <span className="font-medium">
                {new Date(order.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center gap-8 mb-8 text-gray-600">
          <div className="flex items-center gap-2">
            <Package size={24} />
            <span>Processing</span>
          </div>
          <div className="flex items-center gap-2">
            <Truck size={24} />
            <span>Shipping Soon</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/catalog" className="btn-primary">
            Continue Shopping
          </Link>
          <Link to="/" className="btn-secondary">
            Back to Home
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default OrderConfirmation;