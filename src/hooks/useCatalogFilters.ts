import { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FilterOptions, defaultFilters, filterProducts } from '../utils/filterProducts';
import { Product } from '../types';

export const useCatalogFilters = (products: Product[]) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filters, setFilters] = useState<FilterOptions>(defaultFilters);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);

  // Initialize filters from URL
  useEffect(() => {
    const newFilters: FilterOptions = { ...defaultFilters };

    const categories = searchParams.get('categories');
    if (categories) newFilters.categories = categories.split(',');

    const sizes = searchParams.get('sizes');
    if (sizes) newFilters.sizes = sizes.split(',');

    const colors = searchParams.get('colors');
    if (colors) newFilters.colors = colors.split(',');

    const minPrice = searchParams.get('minPrice');
    if (minPrice) newFilters.minPrice = Number(minPrice);

    const maxPrice = searchParams.get('maxPrice');
    if (maxPrice) newFilters.maxPrice = Number(maxPrice);

    const search = searchParams.get('search');
    if (search) newFilters.search = search;

    const sortBy = searchParams.get('sortBy') as FilterOptions['sortBy'];
    if (sortBy) newFilters.sortBy = sortBy;

    setFilters(newFilters);
  }, [searchParams]);

  // Apply filters
  useEffect(() => {
    const filtered = filterProducts(products, filters);
    setFilteredProducts(filtered);
  }, [products, filters]);

  // Update URL when filters change
  const updateFilters = useCallback((newFilters: Partial<FilterOptions>) => {
    setFilters(prev => {
      const updated = { ...prev, ...newFilters };

      const params: Record<string, string> = {};

      if (updated.categories.length > 0) params.categories = updated.categories.join(',');
      if (updated.sizes.length > 0) params.sizes = updated.sizes.join(',');
      if (updated.colors.length > 0) params.colors = updated.colors.join(',');
      if (updated.minPrice > 0) params.minPrice = String(updated.minPrice);
      if (updated.maxPrice < 1000) params.maxPrice = String(updated.maxPrice);
      if (updated.search) params.search = updated.search;
      if (updated.sortBy !== 'popularity') params.sortBy = updated.sortBy;

      setSearchParams(params);

      return updated;
    });
  }, [setSearchParams]);

  const resetFilters = useCallback(() => {
    setFilters(defaultFilters);
    setSearchParams({});
  }, [setSearchParams]);

  return {
    filters,
    filteredProducts,
    updateFilters,
    resetFilters,
  };
};