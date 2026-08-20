import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Shield, Layers, Wind } from 'lucide-react';
import { products } from '../data/products';
import ProductCard from '../components/ProductCard';
import SectionTitle from '../components/SectionTitle';

const Home = () => {
  const newArrivals = products.filter(p => p.isNew).slice(0, 4);
  const bestsellers = products.filter(p => p.isBestseller).slice(0, 4);

  const categories = [
    { name: 'T-shirts', image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&q=80', link: '/catalog?category=t-shirts' },
    { name: 'Hoodies', image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&q=80', link: '/catalog?category=hoodies' },
    { name: 'Jackets', image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&q=80', link: '/catalog?category=jackets' },
    { name: 'Pants', image: 'https://images.unsplash.com/photo-1517438476312-10d79c077509?w=600&q=80', link: '/catalog?category=pants' },
    { name: 'Accessories', image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&q=80', link: '/catalog?category=accessories' },
  ];

  const slogans = ['BUILT TO LAST', 'EVERYDAY UTILITY', 'NORTHLINE SUPPLY'];

  const testimonials = [
    {
      name: 'Alex K.',
      text: 'Качество превосходит ожидания. Куртка служит уже второй сезон и выглядит только лучше.',
      rating: 5
    },
    {
      name: 'Maria S.',
      text: 'Наконец-то нашла бренд, который сочетает стиль и функциональность. Рекомендую!',
      rating: 5
    },
    {
      name: 'Dmitry V.',
      text: 'Отличная посадка и материалы. Заказывал худи и футболку - всё идеально.',
      rating: 4
    }
  ];

  const instagramImages = [
    'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=400&q=80',
    'https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&q=80',
    'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&q=80',
    'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=400&q=80',
    'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=400&q=80',
    'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=400&q=80',
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-screen min-h-[600px] bg-north-black overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1920&q=80"
          alt="NORTHLINE collection"
          className="absolute inset-0 w-full h-full object-cover opacity-40"
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
              className="text-north-milk/80 text-sm tracking-[0.3em] uppercase mb-4"
            >
              New Season 2024
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-5xl md:text-7xl lg:text-8xl font-display font-bold text-north-milk leading-tight mb-6"
            >
              BUILT FOR<br />EVERYDAY<br />MOTION
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="text-xl md:text-2xl text-north-milk/70 mb-8 max-w-xl"
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
                to="/catalog"
                className="border border-north-milk text-north-milk px-8 py-4 text-sm font-medium tracking-wider uppercase hover:bg-north-milk hover:text-north-black transition-colors duration-300 inline-flex items-center justify-center"
              >
                Explore collection
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Marquee Section */}
      <section className="bg-north-black text-north-milk py-6 overflow-hidden border-t border-north-graphite">
        <div className="flex whitespace-nowrap animate-marquee">
          {[...slogans, ...slogans, ...slogans].map((slogan, index) => (
            <span key={index} className="text-2xl md:text-3xl font-display font-bold mx-8 tracking-wider">
              {slogan} <span className="text-north-brown mx-4">•</span>
            </span>
          ))}
        </div>
      </section>

      {/* New Arrivals */}
      <section className="py-20 md:py-28">
        <div className="container-north">
          <div className="flex items-end justify-between mb-12">
            <SectionTitle title="New Arrivals" subtitle="Fresh drops for the season" />
            <Link
              to="/catalog?sort=new"
              className="hidden md:flex items-center text-sm font-medium hover:text-north-brown transition-colors mb-12"
            >
              View all <ArrowRight size={16} className="ml-2" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {newArrivals.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-20 bg-north-light-gray/50">
        <div className="container-north">
          <SectionTitle title="Shop by Category" subtitle="Find your style" />
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {categories.map((category, index) => (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link
                  to={category.link}
                  className="block relative overflow-hidden aspect-[3/4] group"
                >
                  <img
                    src={category.image}
                    alt={category.name}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-30 group-hover:bg-opacity-20 transition-all duration-300"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-north-milk font-medium text-lg tracking-wider">
                      {category.name}
                    </h3>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Editorial Section */}
      <section className="py-20 md:py-28 bg-north-black text-north-milk overflow-hidden">
        <div className="container-north">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative"
            >
              <img
                src="https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=800&q=80"
                alt="NORTHLINE editorial"
                loading="lazy"
                className="w-full h-[500px] object-cover"
              />
              <div className="absolute -bottom-6 -right-6 bg-north-brown text-north-milk p-6 hidden md:block">
                <p className="text-4xl font-display font-bold">EST.</p>
                <p className="text-sm tracking-wider">2024</p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
                Designed for the<br />modern explorer
              </h2>
              <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                Every NORTHLINE piece is crafted with intention. From durable fabrics to functional details, our designs are made to move with you through the city and beyond.
              </p>
              <Link
                to="/catalog"
                className="inline-flex items-center text-north-milk border border-north-milk px-8 py-4 text-sm font-medium tracking-wider uppercase hover:bg-north-milk hover:text-north-black transition-colors duration-300"
              >
                Explore collection
                <ArrowRight size={18} className="ml-2" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20">
        <div className="container-north">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Shield, title: 'Durable Materials', description: 'Premium fabrics built to withstand daily wear and tear' },
              { icon: Layers, title: 'Functional Design', description: 'Thoughtful details and practical features for everyday use' },
              { icon: Wind, title: 'Everyday Comfort', description: 'Comfortable fits that move with you throughout the day' },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="text-center p-8 border border-north-light-gray hover:border-north-black transition-colors duration-300"
              >
                <feature.icon size={48} className="mx-auto mb-6 text-north-brown" strokeWidth={1.5} />
                <h3 className="text-xl font-display font-bold mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Bestsellers */}
      <section className="py-20 bg-north-light-gray/50">
        <div className="container-north">
          <div className="flex items-end justify-between mb-12">
            <SectionTitle title="Bestsellers" subtitle="Most loved pieces" />
            <Link
              to="/catalog?sort=bestsellers"
              className="hidden md:flex items-center text-sm font-medium hover:text-north-brown transition-colors mb-12"
            >
              View all <ArrowRight size={16} className="ml-2" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {bestsellers.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="container-north">
          <SectionTitle title="What Our Customers Say" subtitle="Real reviews from real people" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="border border-north-light-gray p-8"
              >
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <span
                      key={i}
                      className={`text-xl ${i < testimonial.rating ? 'text-north-brown' : 'text-gray-300'}`}
                    >
                      ★
                    </span>
                  ))}
                </div>
                <p className="text-gray-700 mb-6 italic">"{testimonial.text}"</p>
                <p className="font-medium">{testimonial.name}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20 bg-north-black text-north-milk">
        <div className="container-north text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
              Join the Newsletter
            </h2>
            <p className="text-gray-400 text-lg mb-8">
              Get 10% off your first order and stay updated on new drops
            </p>
            <form className="max-w-md mx-auto flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 px-4 py-3 bg-transparent border border-gray-600 focus:border-north-milk outline-none text-north-milk placeholder-gray-500"
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

      {/* Instagram Grid */}
      <section className="py-20">
        <div className="container-north">
          <SectionTitle title="Follow Us" subtitle="@northline" />
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
            {instagramImages.map((image, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="relative overflow-hidden aspect-square group cursor-pointer"
              >
                <img
                  src={image}
                  alt={`Instagram post ${index + 1}`}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                  <span className="text-north-milk opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    View
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-north-brown text-north-milk">
        <div className="container-north text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-6xl font-display font-bold mb-6">
              Ready to upgrade<br />your wardrobe?
            </h2>
            <Link
              to="/catalog"
              className="inline-flex items-center bg-north-milk text-north-black px-8 py-4 text-sm font-medium tracking-wider uppercase hover:bg-white transition-colors duration-300"
            >
              Shop now
              <ArrowRight size={18} className="ml-2" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;