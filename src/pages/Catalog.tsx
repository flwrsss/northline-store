import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Filter, Grid, LayoutGrid, LayoutList, ChevronDown } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import QuickAddModal from '../components/QuickAddModal';
import { useCatalogFilters } from '../hooks/useCatalogFilters';
import { products } from '../data/products';
import { getAllSizes, getAllColors, getPriceRange } from '../utils/filterProducts';
import { Product } from '../types';

const Catalog = () => {
  const { filters, filteredProducts, updateFilters, resetFilters } = useCatalogFilters(products);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [columns, setColumns] = useState(3);
  const [visibleCount, setVisibleCount] = useState(9);
  const [quickAddProduct, setQuickAddProduct] = useState<Product | null>(null);

  const allSizes = getAllSizes(products);
  const allColors = getAllColors(products);
  const priceRange = getPriceRange(products);

  const categories = [
    { value: 't-shirts', label: 'T-shirts' },
    { value: 'hoodies', label: 'Hoodies' },
    { value: 'jackets', label: 'Jackets' },
    { value: 'pants', label: 'Pants' },
    { value: 'shirts', label: 'Shirts' },
    { value: 'outerwear', label: 'Outerwear' },
    { value: 'accessories', label: 'Accessories' },
    { value: 'footwear', label: 'Footwear' },
    { value: 'knitwear', label: 'Knitwear' },
  ];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsMobileFilterOpen(false);
        setQuickAddProduct(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileFilterOpen || quickAddProduct ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileFilterOpen, quickAddProduct]);

  const handleQuickAdd = (product: Product) => {
    setQuickAddProduct(product);
  };

  const handleAddToCart = (product: Product, size: string, color: string) => {
    console.log('Added to cart:', product.name, size, color);
  };

  const handleLoadMore = () => {
    setVisibleCount(prev => prev + 9);
  };

  const toggleCategory = (category: string) => {
    const newCategories = filters.categories.includes(category)
      ? filters.categories.filter(c => c !== category)
      : [...filters.categories, category];
    updateFilters({ categories: newCategories });
  };

  const toggleSize = (size: string) => {
    const newSizes = filters.sizes.includes(size)
      ? filters.sizes.filter(s => s !== size)
      : [...filters.sizes, size];
    updateFilters({ sizes: newSizes });
  };

  const toggleColor = (color: string) => {
    const newColors = filters.colors.includes(color)
      ? filters.colors.filter(c => c !== color)
      : [...filters.colors, color];
    updateFilters({ colors: newColors });
  };

  const FilterPanel = ({ isMobile = false }: { isMobile?: boolean }) => (
    <div className="space-y-6 sm:space-y-8">
      {/* Categories */}
      <div>
        <h3 className="font-medium mb-3 text-sm sm:text-base">Categories</h3>
        <div className="space-y-2 max-h-48 overflow-y-auto">
          {categories.map((category) => (
            <label
              key={category.value}
              className="flex items-center gap-2 cursor-pointer py-1 px-1 hover:bg-north-light-gray rounded transition-colors"
            >
              <input
                type="checkbox"
                checked={filters.categories.includes(category.value)}
                onChange={() => toggleCategory(category.value)}
                className="rounded border-north-light-gray min-w-[18px] min-h-[18px]"
                aria-label={`Filter by ${category.label}`}
              />
              <span className="text-sm">{category.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Sizes */}
      <div>
        <h3 className="font-medium mb-3 text-sm sm:text-base">Sizes</h3>
        <div className="flex flex-wrap gap-2">
          {allSizes.map((size) => (
            <button
              key={size}
              onClick={() => toggleSize(size)}
              className={`px-3 py-2 text-sm border min-h-[44px] min-w-[44px] ${
                filters.sizes.includes(size)
                  ? 'bg-north-black text-north-milk border-north-black'
                  : 'border-north-light-gray hover:border-north-black'
              } transition-colors`}
              aria-pressed={filters.sizes.includes(size)}
              aria-label={`Filter by size ${size}`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* Colors */}
      <div>
        <h3 className="font-medium mb-3 text-sm sm:text-base">Colors</h3>
        <div className="flex flex-wrap gap-2">
          {allColors.map((color) => (
            <button
              key={color}
              onClick={() => toggleColor(color)}
              className={`px-3 py-2 text-sm border min-h-[44px] ${
                filters.colors.includes(color)
                  ? 'bg-north-black text-north-milk border-north-black'
                  : 'border-north-light-gray hover:border-north-black'
              } transition-colors`}
              aria-pressed={filters.colors.includes(color)}
              aria-label={`Filter by color ${color}`}
            >
              {color}
            </button>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <h3 className="font-medium mb-3 text-sm sm:text-base">Price Range</h3>
        <div className="space-y-3">
          <div>
            <label htmlFor="min-price" className="text-sm text-gray-600 block mb-1">
              Min: ${filters.minPrice}
            </label>
            <input
              id="min-price"
              type="range"
              min={priceRange.min}
              max={priceRange.max}
              value={filters.minPrice}
              onChange={(e) => updateFilters({ minPrice: Number(e.target.value) })}
              className="w-full accent-north-black"
              aria-label="Minimum price"
            />
          </div>
          <div>
            <label htmlFor="max-price" className="text-sm text-gray-600 block mb-1">
              Max: ${filters.maxPrice}
            </label>
            <input
              id="max-price"
              type="range"
              min={priceRange.min}
              max={priceRange.max}
              value={filters.maxPrice}
              onChange={(e) => updateFilters({ maxPrice: Number(e.target.value) })}
              className="w-full accent-north-black"
              aria-label="Maximum price"
            />
          </div>
          <div className="flex justify-between text-sm text-gray-600">
            <span>${priceRange.min}</span>
            <span>${priceRange.max}</span>
          </div>
        </div>
      </div>

      {/* Reset */}
      <button
        onClick={resetFilters}
        className="w-full border border-north-black py-3 text-sm font-medium uppercase hover:bg-north-black hover:text-north-milk transition-colors min-h-[44px]"
        aria-label="Reset all filters"
      >
        Reset Filters
      </button>
    </div>
  );

  return (
    <div className="container-north py-8 sm:py-12">
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-3 sm:mb-4">
          Catalog
        </h1>
        <p className="text-gray-600 text-base sm:text-lg">
          Explore our collection of functional clothing designed for everyday motion.
        </p>
        <p className="text-sm text-gray-500 mt-2" aria-live="polite">
          {filteredProducts.length} products
        </p>
      </div>

      {/* Controls */}
      <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
        <button
          onClick={() => setIsMobileFilterOpen(true)}
          className="lg:hidden flex items-center gap-2 px-4 py-2 border border-north-black min-h-[44px]"
          aria-label="Open filters"
        >
          <Filter size={18} aria-hidden="true" />
          Filters
        </button>

        {/* Search */}
        <div className="flex-1 min-w-[150px] sm:min-w-[200px]">
          <label htmlFor="catalog-search" className="sr-only">Search products</label>
          <input
            id="catalog-search"
            type="text"
            placeholder="Search products..."
            value={filters.search}
            onChange={(e) => updateFilters({ search: e.target.value })}
            className="w-full px-4 py-2 border border-north-light-gray focus:border-north-black outline-none min-h-[44px]"
          />
        </div>

        {/* Sort */}
        <div className="relative">
          <label htmlFor="sort-select" className="sr-only">Sort products</label>
          <select
            id="sort-select"
            value={filters.sortBy}
            onChange={(e) => updateFilters({ sortBy: e.target.value as any })}
            className="appearance-none px-4 py-2 pr-10 border border-north-light-gray focus:border-north-black outline-none bg-transparent min-h-[44px]"
          >
            <option value="popularity">Most Popular</option>
            <option value="newest">Newest</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </select>
          <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" aria-hidden="true" />
        </div>

        {/* Column switcher */}
        <div className="hidden lg:flex items-center gap-2" role="group" aria-label="Grid columns">
          <button
            onClick={() => setColumns(2)}
            className={`p-2 min-h-[44px] min-w-[44px] flex items-center justify-center ${
              columns === 2 ? 'bg-north-black text-north-milk' : 'hover:bg-north-light-gray'
            } transition-colors`}
            aria-label="2 columns"
            aria-pressed={columns === 2}
          >
            <LayoutGrid size={18} aria-hidden="true" />
          </button>
          <button
            onClick={() => setColumns(3)}
            className={`p-2 min-h-[44px] min-w-[44px] flex items-center justify-center ${
              columns === 3 ? 'bg-north-black text-north-milk' : 'hover:bg-north-light-gray'
            } transition-colors`}
            aria-label="3 columns"
            aria-pressed={columns === 3}
          >
            <Grid size={18} aria-hidden="true" />
          </button>
          <button
            onClick={() => setColumns(4)}
            className={`p-2 min-h-[44px] min-w-[44px] flex items-center justify-center ${
              columns === 4 ? 'bg-north-black text-north-milk' : 'hover:bg-north-light-gray'
            } transition-colors`}
            aria-label="4 columns"
            aria-pressed={columns === 4}
          >
            <LayoutList size={18} aria-hidden="true" />
          </button>
        </div>
      </div>

      <div className="flex gap-6 lg:gap-8">
        {/* Desktop Filters */}
        <aside className="hidden lg:block w-64 flex-shrink-0" aria-label="Filters">
          <div className="sticky top-24">
            <FilterPanel />
          </div>
        </aside>

        {/* Products */}
        <div className="flex-1 min-w-0">
          <div
            className={`grid gap-4 sm:gap-6 ${
              columns === 2
                ? 'grid-cols-1 sm:grid-cols-2'
                : columns === 3
                ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
                : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
            }`}
          >
            {filteredProducts.slice(0, visibleCount).map((product, index) => (
              <ProductCard
                key={product.id}
                product={product}
                index={index}
                onQuickAdd={handleQuickAdd}
              />
            ))}
          </div>

          {/* Empty state */}
          {filteredProducts.length === 0 && (
            <div className="text-center py-12 sm:py-20">
              <p className="text-xl sm:text-2xl font-display mb-4">No products found</p>
              <p className="text-gray-600 mb-8">Try adjusting your filters</p>
              <button
                onClick={resetFilters}
                className="btn-primary"
              >
                Reset Filters
              </button>
            </div>
          )}

          {/* Load more */}
          {filteredProducts.length > visibleCount && (
            <div className="text-center mt-8 sm:mt-12">
              <button
                onClick={handleLoadMore}
                className="btn-secondary"
              >
                Load More
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      <AnimatePresence>
        {isMobileFilterOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[90] lg:hidden"
            role="dialog"
            aria-label="Filters"
            aria-modal="true"
          >
            <div
              className="absolute inset-0 bg-black bg-opacity-50"
              onClick={() => setIsMobileFilterOpen(false)}
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="absolute left-0 top-0 bottom-0 w-80 max-w-[90vw] bg-north-milk p-4 sm:p-6 overflow-y-auto"
            >
              <div className="flex justify-between items-center mb-6 sticky top-0 bg-north-milk z-10 py-2">
                <h2 className="text-xl sm:text-2xl font-display font-bold">Filters</h2>
                <button
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="p-2 hover:bg-north-light-gray rounded min-h-[44px] min-w-[44px] flex items-center justify-center"
                  aria-label="Close filters"
                >
                  <X size={24} aria-hidden="true" />
                </button>
              </div>
              <FilterPanel isMobile />
              <div className="mt-6 pb-8">
                <button
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="w-full bg-north-black text-north-milk py-3 text-sm font-medium uppercase hover:bg-north-graphite transition-colors min-h-[44px]"
                >
                  Show Results ({filteredProducts.length})
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Quick Add Modal */}
      <QuickAddModal
        product={quickAddProduct}
        onClose={() => setQuickAddProduct(null)}
        onAddToCart={handleAddToCart}
      />
    </div>
  );
};

export default Catalog;