import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Search, X, TrendingUp } from 'lucide-react';
import { products } from '../data/products';
import ProductCard from '../components/ProductCard';
import { useDebounce } from '../hooks/useDebounce';

const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [searchResults, setSearchResults] = useState(products);
  const debouncedSearch = useDebounce(searchQuery, 500);

  const popularSearches = ['jacket', 'hoodie', 'olive', 'black', 'cotton', 'wool'];

  useEffect(() => {
    if (debouncedSearch.trim()) {
      const query = debouncedSearch.toLowerCase();
      const results = products.filter(
        p =>
          p.name.toLowerCase().includes(query) ||
          p.category.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query) ||
          p.colors.some(color => color.toLowerCase().includes(query))
      );
      setSearchResults(results);

      // Update URL
      setSearchParams({ q: debouncedSearch });
    } else {
      setSearchResults(products);
      setSearchParams({});
    }
  }, [debouncedSearch, setSearchParams]);

  const handleClear = () => {
    setSearchQuery('');
    setSearchResults(products);
    setSearchParams({});
  };

  const handlePopularSearch = (term: string) => {
    setSearchQuery(term);
  };

  return (
    <div className="container-north py-12">
      <h1 className="text-4xl md:text-5xl font-display font-bold mb-8">Search</h1>

      {/* Search Input */}
      <div className="relative mb-8">
        <Search size={24} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search products, categories, colors..."
          className="w-full pl-12 pr-12 py-4 text-lg border border-north-light-gray focus:border-north-black outline-none bg-transparent"
          autoFocus
        />
        {searchQuery && (
          <button
            onClick={handleClear}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:text-north-brown transition-colors"
            aria-label="Clear search"
          >
            <X size={20} />
          </button>
        )}
      </div>

      {/* Popular Searches */}
      {!searchQuery && (
        <div className="mb-8">
          <h2 className="text-sm font-medium text-gray-600 mb-3 flex items-center gap-2">
            <TrendingUp size={16} />
            Popular Searches
          </h2>
          <div className="flex flex-wrap gap-2">
            {popularSearches.map((term) => (
              <button
                key={term}
                onClick={() => handlePopularSearch(term)}
                className="px-4 py-2 border border-north-light-gray hover:border-north-black hover:bg-north-black hover:text-north-milk transition-colors text-sm"
              >
                {term}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Results Info */}
      {searchQuery && (
        <div className="mb-8">
          <p className="text-gray-600">
            {searchResults.length} results for "{searchQuery}"
          </p>
        </div>
      )}

      {/* Results Grid */}
      {searchResults.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {searchResults.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <Search size={64} className="mx-auto mb-6 text-gray-400" />
          <h2 className="text-2xl font-display mb-4">No results found</h2>
          <p className="text-gray-600 mb-8">
            Try different keywords or check the spelling
          </p>
          <button
            onClick={handleClear}
            className="btn-primary"
          >
            Clear Search
          </button>
        </div>
      )}
    </div>
  );
};

export default SearchPage;