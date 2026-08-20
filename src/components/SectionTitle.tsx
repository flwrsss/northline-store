import { motion } from 'framer-motion';

interface SectionTitleProps {
  title: string;
  subtitle?: string;
}

const SectionTitle = ({ title, subtitle }: SectionTitleProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="mb-12"
    >
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold">{title}</h2>
      {subtitle && <p className="text-gray-600 mt-3 text-lg">{subtitle}</p>}
    </motion.div>
  );
};

export default SectionTitle;