import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowDown, Shield, Layers, Wind, Recycle } from 'lucide-react';
import { products } from '../data/products';
import { media } from '../data/media';
import ProductCard from '../components/ProductCard';
import SectionTitle from '../components/SectionTitle';

const Home = () => {
  const newArrivals = products.filter(p => p.isNew).slice(0, 4);
  const bestsellers = products.filter(p => p.isBestseller).slice(0, 4);
  const featuredProduct = newArrivals[0];

  const categories = [
    { name: 'T-shirts', count: 3, image: media.categories['t-shirts'], link: '/catalog?category=t-shirts', size: 'large' },
    { name: 'Hoodies', count: 2, image: media.categories['hoodies'], link: '/catalog?category=hoodies', size: 'small' },
    { name: 'Jackets', count: 4, image: media.categories['jackets'], link: '/catalog?category=jackets', size: 'small' },
    { name: 'Pants', count: 3, image: media.categories['pants'], link: '/catalog?category=pants', size: 'medium' },
    { name: 'Accessories', count: 4, image: media.categories['accessories'], link: '/catalog?category=accessories', size: 'medium' },
  ];

  const slogans = ['BUILT TO LAST', 'EVERYDAY UTILITY', 'NORTHLINE SUPPLY', 'FIELD TESTED', 'MADE FOR MOTION'];

  const materials = [
    {
      image: media.materials.texture,
      title: 'Heavyweight Canvas',
      description: 'Durable 12oz cotton canvas',
      technical: 'MAT-01',
    },
    {
      image: media.materials.seam,
      title: 'Reinforced Seams',
      description: 'Double-stitched construction',
      technical: 'MAT-02',
    },
    {
      image: media.materials.hardware,
      title: 'Metal Hardware',
      description: 'Rust-resistant fittings',
      technical: 'MAT-03',
    },
  ];

  const lookbookImages = media.lookbook.slice(0, 6);

  const values = [
    { icon: Shield, title: 'Durable Materials', description: 'Premium fabrics built to withstand daily wear' },
    { icon: Layers, title: 'Considered Design', description: 'Every detail serves a purpose' },
    { icon: Wind, title: 'Everyday Comfort', description: 'Comfortable fits for all-day wear' },
    { icon: Recycle, title: 'Responsible Production', description: 'Ethical manufacturing processes' },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[90vh] min-h-[600px] bg-north-black overflow-hidden">
        <motion.img
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 20, ease: "easeOut" }}
          src={media.hero.desktop}
          alt="NORTHLINE campaign - urban fashion"
          className="absolute inset-0 w-full h-full object-cover object-center opacity-50 hidden md:block"
          loading="eager"
        />
        <img
          src={media.hero.mobile}
          alt="NORTHLINE campaign - urban fashion"
          className="absolute inset-0 w-full h-full object-cover object-center opacity-50 md:hidden"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-north-black via-north-black/70 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-north-black via-transparent to-transparent"></div>

        <div className="relative container-north h-full flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-2xl"
          >
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="tech-label text-north-milk/60 mb-4"
            >
              NORTHLINE / FIELD SYSTEM 01
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="editorial-heading text-north-milk mb-6 text-5xl md:text-7xl lg:text-8xl"
            >
              BUILT FOR<br />EVERYDAY<br />MOTION
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="text-lg md:text-xl text-north-milk/70 mb-8 max-w-xl"
            >
              Functional clothing for modern urban life. Designed to perform, built to last.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link
                to="/catalog?sort=new"
                className="bg-north-milk text-north-black px-8 py-4 text-sm font-medium tracking-wider uppercase hover:bg-white transition-colors duration-300 inline-flex items-center justify-center"
              >
                Shop new arrivals
                <ArrowRight size={18} className="ml-2" />
              </Link>
              <Link
                to="/lookbook"
                className="border border-north-milk text-north-milk px-8 py-4 text-sm font-medium tracking-wider uppercase hover:bg-north-milk hover:text-north-black transition-colors duration-300 inline-flex items-center justify-center"
              >
                View lookbook
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-north-milk/60"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex flex-col items-center gap-2"
          >
            <span className="text-xs tracking-widest uppercase">Scroll</span>
            <ArrowDown size={16} />
          </motion.div>
        </motion.div>
      </section>

      {/* Marquee Section */}
      <section className="bg-north-graphite text-north-milk py-5 overflow-hidden border-y border-north-black">
        <div className="flex whitespace-nowrap animate-marquee" aria-label="Brand slogans">
          {[...slogans, ...slogans].map((slogan, index) => (
            <span key={index} className="text-xl md:text-2xl font-display font-bold mx-8 tracking-wider">
              {slogan} <span className="text-north-rust mx-4">/</span>
            </span>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="py-20 md:py-28">
        <div className="container-north">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="collection-number mb-3">COLLECTION 01</p>
              <SectionTitle title="Shop by Category" subtitle="Find your style" />
            </div>
            <Link to="/catalog" className="hidden md:flex items-center text-sm font-medium hover:text-north-brown transition-colors">
              View all <ArrowRight size={16} className="ml-2" />
            </Link>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-[200px] md:auto-rows-[250px]">
            {categories.map((category, index) => (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`${
                  category.size === 'large' ? 'col-span-2 row-span-2' :
                  category.size === 'medium' ? 'col-span-1 row-span-2' :
                  'col-span-1 row-span-1'
                }`}
              >
                <Link
                  to={category.link}
                  className="block relative overflow-hidden h-full group"
                >
                  <img
                    src={category.image}
                    alt={category.name}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-30 group-hover:bg-opacity-20 transition-all duration-300"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
                    <p className="text-north-milk/80 text-xs mb-1">{category.count} items</p>
                    <h3 className="text-north-milk font-display text-xl md:text-2xl tracking-wider">
                      {category.name}
                    </h3>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="py-20 bg-north-light-gray/30">
        <div className="container-north">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="collection-number mb-3">JUST DROPPED</p>
              <SectionTitle title="New Arrivals" subtitle="Fresh pieces for the season" />
            </div>
            <Link to="/catalog?sort=new" className="hidden md:flex items-center text-sm font-medium hover:text-north-brown transition-colors">
              View all <ArrowRight size={16} className="ml-2" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Featured product - larger */}
            {featuredProduct && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="md:col-span-2 md:row-span-2"
              >
                <ProductCard product={featuredProduct} index={0} />
              </motion.div>
            )}

            {/* Regular products */}
            {newArrivals.slice(1, 4).map((product, index) => (
              <ProductCard key={product.id} product={product} index={index + 1} />
            ))}
          </div>
        </div>
      </section>

      {/* Editorial Campaign */}
      <section className="py-20 md:py-28 bg-north-black text-north-milk overflow-hidden">
        <div className="container-north">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative order-2 lg:order-1"
            >
              <div className="relative overflow-hidden">
                <img
                  src={media.editorial.campaign}
                  alt="NORTHLINE campaign - The Daily Uniform"
                  loading="lazy"
                  className="w-full h-[400px] md:h-[500px] object-cover"
                />
                <div className="absolute bottom-4 left-4 bg-north-milk/90 backdrop-blur-sm px-4 py-2">
                  <p className="text-xs tracking-widest uppercase">CAMPAIGN 01</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="order-1 lg:order-2"
            >
              <p className="collection-number text-north-milk/50 mb-3">EDITORIAL</p>
              <h2 className="editorial-heading text-north-milk mb-6 text-4xl md:text-5xl">
                THE DAILY<br />UNIFORM
              </h2>
              <div className="decorative-line mb-6"></div>
              <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                Clothing designed for the rhythm of the city. Every piece is made to move with you, from morning commute to late nights.
              </p>
              <Link
                to="/lookbook"
                className="inline-flex items-center text-north-milk border border-north-milk px-8 py-4 text-sm font-medium tracking-wider uppercase hover:bg-north-milk hover:text-north-black transition-colors duration-300"
              >
                Explore the story
                <ArrowRight size={18} className="ml-2" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Materials & Details */}
      <section className="py-20 md:py-28">
        <div className="container-north">
          <div className="text-center mb-12">
            <p className="collection-number mb-3">MATERIALS</p>
            <SectionTitle title="Made to be worn" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {materials.map((material, index) => (
              <motion.div
                key={material.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="group"
              >
                <div className="relative overflow-hidden aspect-[4/5] mb-4">
                  <img
                    src={material.image}
                    alt={material.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4 bg-north-milk/90 px-3 py-1">
                    <p className="text-xs tracking-widest">{material.technical}</p>
                  </div>
                </div>
                <h3 className="font-display text-xl mb-2">{material.title}</h3>
                <p className="text-gray-600 text-sm">{material.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Lookbook */}
      <section className="py-20 bg-north-light-gray/30">
        <div className="container-north">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="collection-number mb-3">LOOKBOOK 01</p>
              <SectionTitle title="Lookbook" subtitle="The latest collection" />
            </div>
            <Link to="/lookbook" className="hidden md:flex items-center text-sm font-medium hover:text-north-brown transition-colors">
              View lookbook <ArrowRight size={16} className="ml-2" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {lookbookImages.map((image, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`${
                  index === 0 ? 'md:col-span-2 lg:col-span-2 lg:row-span-2' :
                  index === 1 ? 'lg:col-span-1' :
                  'lg:col-span-1'
                }`}
              >
                <div className="relative overflow-hidden group">
                  <img
                    src={image.src}
                    alt={image.alt}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300"></div>
                  <div className="absolute bottom-3 left-3 bg-north-milk/90 px-3 py-1">
                    <p className="text-xs tracking-widest">{image.caption}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Bestsellers */}
      <section className="py-20">
        <div className="container-north">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="collection-number mb-3">MOST LOVED</p>
              <SectionTitle title="Bestsellers" subtitle="Customer favorites" />
            </div>
            <Link to="/catalog?sort=bestsellers" className="hidden md:flex items-center text-sm font-medium hover:text-north-brown transition-colors">
              View all <ArrowRight size={16} className="ml-2" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {bestsellers.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Brand Values */}
      <section className="py-20 bg-north-graphite text-north-milk">
        <div className="container-north">
          <div className="text-center mb-12">
            <SectionTitle title="Our Values" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="text-center"
              >
                <value.icon size={40} className="mx-auto mb-4 text-north-rust" strokeWidth={1.5} />
                <h3 className="font-display text-xl mb-3">{value.title}</h3>
                <p className="text-gray-400 text-sm">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20 bg-north-olive text-north-milk">
        <div className="container-north text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="editorial-heading text-north-milk mb-4 text-4xl md:text-5xl">
              Join the Newsletter
            </h2>
            <p className="text-north-milk/80 text-lg mb-8">
              Get 10% off your first order and stay updated on new drops
            </p>
            <form className="max-w-md mx-auto flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 px-4 py-3 bg-transparent border border-north-milk/40 focus:border-north-milk outline-none text-north-milk placeholder-north-milk/50"
                aria-label="Email address"
              />
              <button
                type="submit"
                className="bg-north-milk text-north-black px-6 py-3 text-sm font-medium tracking-wider uppercase hover:bg-white transition-colors duration-300"
              >
                Subscribe
              </button>
            </form>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;