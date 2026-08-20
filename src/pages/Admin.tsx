import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Plus, Trash2, Edit2, X, Check, Package } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Product } from '../types';
import { products as defaultProducts } from '../data/products';

interface ProductForm {
  name: string;
  slug: string;
  description: string;
  price: string;
  category: string;
  images: string;
  colors: string;
  sizes: string;
  material: string;
  careInstructions: string;
  isNew: boolean;
  isBestseller: boolean;
}

const Admin = () => {
  const { isAdmin, user } = useAuth();
  const navigate = useNavigate();
  const [customProducts, setCustomProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('customProducts');
    return saved ? JSON.parse(saved) : [];
  });

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<ProductForm>({
    name: '',
    slug: '',
    description: '',
    price: '',
    category: 't-shirts',
    images: '',
    colors: '',
    sizes: 'S, M, L',
    material: '',
    careInstructions: '',
    isNew: false,
    isBestseller: false,
  });

  const allProducts = [...customProducts, ...defaultProducts];

  if (!isAdmin) {
    return (
      <div className="container-north py-20 text-center">
        <h1 className="text-3xl font-display mb-4">Access Denied</h1>
        <p className="text-gray-600 mb-8">You need admin access to view this page.</p>
        <button onClick={() => navigate('/login')} className="btn-primary">
          Go to Login
        </button>
      </div>
    );
  }

  const handleInputChange = (field: keyof ProductForm, value: any) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.name || !form.price || !form.category) {
      alert('Please fill in name, price and category');
      return;
    }

    const newProduct: Product = {
      id: editingId || `custom-${Date.now()}`,
      slug: form.slug || form.name.toLowerCase().replace(/\s+/g, '-'),
      name: form.name,
      description: form.description || 'No description',
      price: parseFloat(form.price),
      category: form.category,
      images: form.images ? form.images.split(',').map(s => s.trim()).filter(Boolean) : ['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80'],
      colors: form.colors ? form.colors.split(',').map(s => s.trim()).filter(Boolean) : ['Black'],
      sizes: form.sizes.split(',').map(s => s.trim()).filter(Boolean),
      material: form.material || 'Not specified',
      careInstructions: form.careInstructions || 'Not specified',
      isNew: form.isNew,
      isBestseller: form.isBestseller,
    };

    if (editingId) {
      setCustomProducts(prev => prev.map(p => p.id === editingId ? newProduct : p));
    } else {
      setCustomProducts(prev => [...prev, newProduct]);
    }

    localStorage.setItem('customProducts', JSON.stringify(
      editingId
        ? customProducts.map(p => p.id === editingId ? newProduct : p)
        : [...customProducts, newProduct]
    ));

    resetForm();
  };

  const handleEdit = (product: Product) => {
    setEditingId(product.id);
    setForm({
      name: product.name,
      slug: product.slug,
      description: product.description,
      price: String(product.price),
      category: product.category,
      images: product.images.join(', '),
      colors: product.colors.join(', '),
      sizes: product.sizes.join(', '),
      material: product.material,
      careInstructions: product.careInstructions,
      isNew: product.isNew || false,
      isBestseller: product.isBestseller || false,
    });
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this product?')) {
      const filtered = customProducts.filter(p => p.id !== id);
      setCustomProducts(filtered);
      localStorage.setItem('customProducts', JSON.stringify(filtered));
    }
  };

  const resetForm = () => {
    setEditingId(null);
    setShowForm(false);
    setForm({
      name: '',
      slug: '',
      description: '',
      price: '',
      category: 't-shirts',
      images: '',
      colors: '',
      sizes: 'S, M, L',
      material: '',
      careInstructions: '',
      isNew: false,
      isBestseller: false,
    });
  };

  return (
    <div className="container-north py-12">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-display font-bold">Admin Panel</h1>
          <p className="text-gray-600 mt-2">Welcome, {user?.name}</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="btn-primary"
        >
          <Plus size={18} className="mr-2" />
          {showForm ? 'Cancel' : 'Add Product'}
        </button>
      </div>

      {/* Product Form */}
      {showForm && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="border border-north-light-gray p-6 mb-8"
        >
          <h2 className="text-xl font-display font-bold mb-6">
            {editingId ? 'Edit Product' : 'Add New Product'}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Name *</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="w-full px-4 py-2 border border-north-light-gray focus:border-north-black outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Slug</label>
                <input
                  type="text"
                  value={form.slug}
                  onChange={(e) => handleInputChange('slug', e.target.value)}
                  placeholder="auto-generated if empty"
                  className="w-full px-4 py-2 border border-north-light-gray focus:border-north-black outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Price *</label>
                <input
                  type="number"
                  step="0.01"
                  value={form.price}
                  onChange={(e) => handleInputChange('price', e.target.value)}
                  className="w-full px-4 py-2 border border-north-light-gray focus:border-north-black outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Category *</label>
                <select
                  value={form.category}
                  onChange={(e) => handleInputChange('category', e.target.value)}
                  className="w-full px-4 py-2 border border-north-light-gray focus:border-north-black outline-none"
                >
                  <option value="t-shirts">T-shirts</option>
                  <option value="hoodies">Hoodies</option>
                  <option value="jackets">Jackets</option>
                  <option value="pants">Pants</option>
                  <option value="shirts">Shirts</option>
                  <option value="outerwear">Outerwear</option>
                  <option value="accessories">Accessories</option>
                  <option value="footwear">Footwear</option>
                  <option value="knitwear">Knitwear</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Sizes (comma-separated)</label>
                <input
                  type="text"
                  value={form.sizes}
                  onChange={(e) => handleInputChange('sizes', e.target.value)}
                  className="w-full px-4 py-2 border border-north-light-gray focus:border-north-black outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Image URLs (comma-separated)</label>
              <input
                type="text"
                value={form.images}
                onChange={(e) => handleInputChange('images', e.target.value)}
                placeholder="https://example.com/image1.jpg, https://example.com/image2.jpg"
                className="w-full px-4 py-2 border border-north-light-gray focus:border-north-black outline-none"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Colors (comma-separated)</label>
                <input
                  type="text"
                  value={form.colors}
                  onChange={(e) => handleInputChange('colors', e.target.value)}
                  placeholder="Black, Olive, Brown"
                  className="w-full px-4 py-2 border border-north-light-gray focus:border-north-black outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Material</label>
                <input
                  type="text"
                  value={form.material}
                  onChange={(e) => handleInputChange('material', e.target.value)}
                  className="w-full px-4 py-2 border border-north-light-gray focus:border-north-black outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Description</label>
              <textarea
                value={form.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                rows={3}
                className="w-full px-4 py-2 border border-north-light-gray focus:border-north-black outline-none"
              />
            </div>

            <div className="flex gap-6">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={form.isNew}
                  onChange={(e) => handleInputChange('isNew', e.target.checked)}
                />
                <span className="text-sm">New</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={form.isBestseller}
                  onChange={(e) => handleInputChange('isBestseller', e.target.checked)}
                />
                <span className="text-sm">Bestseller</span>
              </label>
            </div>

            <div className="flex gap-4">
              <button type="submit" className="btn-primary">
                <Check size={18} className="mr-2" />
                {editingId ? 'Update Product' : 'Add Product'}
              </button>
              <button type="button" onClick={resetForm} className="btn-secondary">
                Cancel
              </button>
            </div>
          </form>
        </motion.div>
      )}

      {/* Products List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {allProducts.map((product) => (
          <div key={product.id} className="border border-north-light-gray p-4 flex gap-4">
            <img
              src={product.images[0]}
              alt={product.name}
              className="w-20 h-24 object-cover flex-shrink-0"
            />
            <div className="flex-1">
              <h3 className="font-medium">{product.name}</h3>
              <p className="text-sm text-gray-600">${product.price.toFixed(2)}</p>
              <p className="text-xs text-gray-500 capitalize">{product.category}</p>
              <div className="flex gap-2 mt-2">
                <button
                  onClick={() => handleEdit(product)}
                  className="p-2 hover:bg-north-light-gray transition-colors"
                  aria-label="Edit product"
                >
                  <Edit2 size={16} />
                </button>
                {product.id.startsWith('custom-') && (
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="p-2 hover:bg-red-100 text-red-600 transition-colors"
                    aria-label="Delete product"
                  >
                    <Trash2 size={16} />
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Admin;