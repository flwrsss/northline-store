import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface SizeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SizeGuideModal = ({ isOpen, onClose }: SizeGuideModalProps) => {
  const sizeData = [
    { size: 'XS', chest: '86-89', waist: '71-74', hips: '86-89' },
    { size: 'S', chest: '91-94', waist: '76-79', hips: '91-94' },
    { size: 'M', chest: '96-99', waist: '81-84', hips: '96-99' },
    { size: 'L', chest: '101-104', waist: '86-89', hips: '101-104' },
    { size: 'XL', chest: '106-109', waist: '91-94', hips: '106-109' },
    { size: 'XXL', chest: '111-114', waist: '96-99', hips: '111-114' },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[150] flex items-center justify-center p-4"
          onClick={onClose}
        >
          <div className="absolute inset-0 bg-black bg-opacity-50" />

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="relative bg-north-milk max-w-2xl w-full p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 hover:bg-north-light-gray transition-colors"
              aria-label="Close size guide"
            >
              <X size={24} />
            </button>

            <h2 className="text-2xl font-display font-bold mb-6">Size Guide</h2>
            <p className="text-gray-600 mb-6">All measurements are in centimeters</p>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b-2 border-north-black">
                    <th className="py-3 text-left">Size</th>
                    <th className="py-3 text-left">Chest</th>
                    <th className="py-3 text-left">Waist</th>
                    <th className="py-3 text-left">Hips</th>
                  </tr>
                </thead>
                <tbody>
                  {sizeData.map((row) => (
                    <tr key={row.size} className="border-b border-north-light-gray">
                      <td className="py-3 font-medium">{row.size}</td>
                      <td className="py-3">{row.chest}</td>
                      <td className="py-3">{row.waist}</td>
                      <td className="py-3">{row.hips}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="text-sm text-gray-500 mt-6">
              If you're between sizes, we recommend sizing up for a more relaxed fit.
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SizeGuideModal;