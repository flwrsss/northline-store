import { Product } from '../types';

export interface FilterOptions {
  categories: string[];
  sizes: string[];
  colors: string[];
  minPrice: number;
  maxPrice: number;
  search: string;
  sortBy: 'popularity' | 'newest' | 'price-asc' | 'price-desc';
}

export const defaultFilters: FilterOptions = {
  categories: [],
  sizes: [],
  colors: [],
  minPrice: 0,
  maxPrice: 1000,
  search: '',
  sortBy: 'popularity',
};

export const filterProducts = (products: Product[], filters: FilterOptions): Product[] => {
  let filtered = [...products];

  // Filter by search
  if (filters.search) {
    const searchTerm = filters.search.toLowerCase();
    filtered = filtered.filter(
      p =>
        p.name.toLowerCase().includes(searchTerm) ||
        p.description.toLowerCase().includes(searchTerm) ||
        p.category.toLowerCase().includes(searchTerm)
    );
  }

  // Filter by categories
  if (filters.categories.length > 0) {
    filtered = filtered.filter(p => filters.categories.includes(p.category));
  }

  // Filter by sizes
  if (filters.sizes.length > 0) {
    filtered = filtered.filter(p =>
      p.sizes.some(size => filters.sizes.includes(size))
    );
  }

  // Filter by colors
  if (filters.colors.length > 0) {
    filtered = filtered.filter(p =>
      p.colors.some(color => filters.colors.includes(color))
    );
  }

  // Filter by price
  filtered = filtered.filter(
    p => p.price >= filters.minPrice && p.price <= filters.maxPrice
  );

  // Sort
  switch (filters.sortBy) {
    case 'popularity':
      filtered.sort((a, b) => {
        const aScore = (a.isBestseller ? 1 : 0) + (a.isNew ? 0.5 : 0);
        const bScore = (b.isBestseller ? 1 : 0) + (b.isNew ? 0.5 : 0);
        return bScore - aScore;
      });
      break;
    case 'newest':
      filtered.sort((a, b) => {
        const aNew = a.isNew ? 1 : 0;
        const bNew = b.isNew ? 1 : 0;
        return bNew - aNew;
      });
      break;
    case 'price-asc':
      filtered.sort((a, b) => a.price - b.price);
      break;
    case 'price-desc':
      filtered.sort((a, b) => b.price - a.price);
      break;
  }

  return filtered;
};

export const getAllSizes = (products: Product[]): string[] => {
  const sizes = new Set<string>();
  products.forEach(p => p.sizes.forEach(s => sizes.add(s)));
  return Array.from(sizes).sort();
};

export const getAllColors = (products: Product[]): string[] => {
  const colors = new Set<string>();
  products.forEach(p => p.colors.forEach(c => colors.add(c)));
  return Array.from(colors).sort();
};

export const getPriceRange = (products: Product[]): { min: number; max: number } => {
  if (products.length === 0) return { min: 0, max: 1000 };
  const prices = products.map(p => p.price);
  return {
    min: Math.floor(Math.min(...prices)),
    max: Math.ceil(Math.max(...prices)),
  };
};