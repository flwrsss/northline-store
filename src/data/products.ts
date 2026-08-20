import { Product } from '../types';

export const products: Product[] = [
  {
    id: '1',
    slug: 'olive-canvas-jacket',
    name: 'Olive Canvas Jacket',
    description: 'Heavy-duty canvas jacket with reinforced stitching. Inspired by classic workwear silhouettes with a modern streetwear fit.',
    price: 189.00,
    category: 'jackets',
    images: [
      'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&q=80',
      'https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=800&q=80'
    ],
    colors: ['Olive', 'Black'],
    sizes: ['S', 'M', 'L', 'XL'],
    material: '100% Cotton Canvas',
    careInstructions: 'Machine wash cold, hang dry',
    isNew: true,
    isBestseller: true
  },
  {
    id: '2',
    slug: 'graphite-wool-overcoat',
    name: 'Graphite Wool Overcoat',
    description: 'Premium wool blend overcoat with clean lines and minimalist design. Perfect for layering in colder months.',
    price: 349.00,
    category: 'outerwear',
    images: [
      'https://images.unsplash.com/photo-1544923246-77307dd654cb?w=800&q=80',
      'https://images.unsplash.com/photo-1539533113208-f6df8cc8b543?w=800&q=80'
    ],
    colors: ['Graphite', 'Black'],
    sizes: ['S', 'M', 'L', 'XL'],
    material: '70% Wool, 30% Polyester',
    careInstructions: 'Dry clean only',
    isNew: true
  },
  {
    id: '3',
    slug: 'milk-heavyweight-tee',
    name: 'Milk Heavyweight Tee',
    description: 'Boxy-fit heavyweight t-shirt made from organic cotton. Features a subtle embroidered chest logo.',
    price: 49.00,
    category: 't-shirts',
    images: [
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80',
      'https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=800&q=80'
    ],
    colors: ['Milk', 'Black', 'Olive'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    material: '100% Organic Cotton',
    careInstructions: 'Machine wash cold',
    isBestseller: true
  },
  {
    id: '4',
    slug: 'black-cargo-pants',
    name: 'Black Cargo Pants',
    description: 'Modern cargo pants with tapered fit and multiple utility pockets. Made from durable ripstop fabric.',
    price: 129.00,
    category: 'pants',
    images: [
      'https://images.unsplash.com/photo-1517438476312-10d79c077509?w=800&q=80',
      'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=800&q=80'
    ],
    colors: ['Black', 'Olive', 'Brown'],
    sizes: ['S', 'M', 'L', 'XL'],
    material: 'Ripstop Cotton',
    careInstructions: 'Machine wash cold',
    isBestseller: true
  },
  {
    id: '5',
    slug: 'brown-leather-belt',
    name: 'Brown Leather Belt',
    description: 'Handcrafted leather belt with antique brass buckle. Ages beautifully with wear.',
    price: 79.00,
    category: 'accessories',
    images: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80',
      'https://images.unsplash.com/photo-1624222247344-550fb60583dc?w=800&q=80'
    ],
    colors: ['Brown', 'Black'],
    sizes: ['S', 'M', 'L'],
    material: 'Full-grain Leather',
    careInstructions: 'Wipe clean with damp cloth'
  },
  {
    id: '6',
    slug: 'olive-field-shirt',
    name: 'Olive Field Shirt',
    description: 'Versatile field shirt with military-inspired design. Features multiple chest pockets and reinforced elbows.',
    price: 119.00,
    category: 'shirts',
    images: [
      'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&q=80',
      'https://images.unsplash.com/photo-1603252109303-2751441dd157?w=800&q=80'
    ],
    colors: ['Olive', 'Brown'],
    sizes: ['S', 'M', 'L', 'XL'],
    material: 'Cotton Twill',
    careInstructions: 'Machine wash cold, hang dry',
    isNew: true
  },
  {
    id: '7',
    slug: 'black-denim-jacket',
    name: 'Black Denim Jacket',
    description: 'Classic denim jacket in deep black wash. Features corduroy collar and custom hardware.',
    price: 159.00,
    category: 'jackets',
    images: [
      'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=800&q=80',
      'https://images.unsplash.com/photo-1543076447-215ad9ba6923?w=800&q=80'
    ],
    colors: ['Black', 'Indigo'],
    sizes: ['S', 'M', 'L', 'XL'],
    material: '100% Cotton Denim',
    careInstructions: 'Machine wash cold, inside out'
  },
  {
    id: '8',
    slug: 'milk-hoodie',
    name: 'Milk Hoodie',
    description: 'Premium heavyweight hoodie with brushed interior. Features minimal branding and reinforced seams.',
    price: 109.00,
    category: 'hoodies',
    images: [
      'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&q=80',
      'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=800&q=80'
    ],
    colors: ['Milk', 'Black', 'Graphite'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    material: '80% Cotton, 20% Polyester',
    careInstructions: 'Machine wash cold',
    isBestseller: true
  },
  {
    id: '9',
    slug: 'graphite-wool-beanie',
    name: 'Graphite Wool Beanie',
    description: 'Chunky knit wool beanie with folded cuff. Perfect for cold weather styling.',
    price: 39.00,
    category: 'accessories',
    images: [
      'https://images.unsplash.com/photo-1576871337622-98d48d1cf531?w=800&q=80',
      'https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?w=800&q=80'
    ],
    colors: ['Graphite', 'Black', 'Brown'],
    sizes: ['One Size'],
    material: '100% Wool',
    careInstructions: 'Hand wash cold'
  },
  {
    id: '10',
    slug: 'brown-work-boots',
    name: 'Brown Work Boots',
    description: 'Rugged work boots with Goodyear welt construction. Built to last with premium leather uppers.',
    price: 249.00,
    category: 'footwear',
    images: [
      'https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=800&q=80',
      'https://images.unsplash.com/photo-1520639888713-7851133b1ed0?w=800&q=80'
    ],
    colors: ['Brown', 'Black'],
    sizes: ['40', '41', '42', '43', '44', '45'],
    material: 'Full-grain Leather',
    careInstructions: 'Clean with leather conditioner',
    isBestseller: true
  },
  {
    id: '11',
    slug: 'black-technical-parka',
    name: 'Black Technical Parka',
    description: 'Water-resistant technical parka with multiple pockets and adjustable hood. Urban-ready for any weather.',
    price: 299.00,
    category: 'outerwear',
    images: [
      'https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=800&q=80',
      'https://images.unsplash.com/photo-1544923246-77307dd654cb?w=800&q=80'
    ],
    colors: ['Black', 'Graphite', 'Olive'],
    sizes: ['S', 'M', 'L', 'XL'],
    material: 'Nylon/Polyester Blend',
    careInstructions: 'Machine wash cold, tumble dry low',
    isNew: true
  },
  {
    id: '12',
    slug: 'milk-linen-shirt',
    name: 'Milk Linen Shirt',
    description: 'Relaxed-fit linen shirt for warmer weather. Breathable and naturally wrinkled for a casual look.',
    price: 89.00,
    category: 'shirts',
    images: [
      'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=800&q=80',
      'https://images.unsplash.com/photo-1603252109303-2751441dd157?w=800&q=80'
    ],
    colors: ['Milk', 'White'],
    sizes: ['S', 'M', 'L', 'XL'],
    material: '100% Linen',
    careInstructions: 'Machine wash gentle, hang dry'
  },
  {
    id: '13',
    slug: 'olive-canvas-backpack',
    name: 'Olive Canvas Backpack',
    description: 'Durable canvas backpack with leather details. Features laptop compartment and multiple organization pockets.',
    price: 139.00,
    category: 'accessories',
    images: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80',
      'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=800&q=80'
    ],
    colors: ['Olive', 'Brown'],
    sizes: ['One Size'],
    material: 'Canvas & Leather',
    careInstructions: 'Spot clean only'
  },
  {
    id: '14',
    slug: 'graphite-chinos',
    name: 'Graphite Chinos',
    description: 'Slim-fit chinos in versatile graphite color. Dress them up or down for any occasion.',
    price: 99.00,
    category: 'pants',
    images: [
      'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=800&q=80',
      'https://images.unsplash.com/photo-1517438476312-10d79c077509?w=800&q=80'
    ],
    colors: ['Graphite', 'Brown', 'Black'],
    sizes: ['S', 'M', 'L', 'XL'],
    material: 'Cotton Stretch',
    careInstructions: 'Machine wash cold'
  },
  {
    id: '15',
    slug: 'black-turtleneck',
    name: 'Black Turtleneck',
    description: 'Classic turtleneck in premium merino wool. Sleek and warm for sophisticated layering.',
    price: 119.00,
    category: 'knitwear',
    images: [
      'https://images.unsplash.com/photo-1576871337622-98d48d1cf531?w=800&q=80',
      'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&q=80'
    ],
    colors: ['Black', 'Graphite'],
    sizes: ['S', 'M', 'L', 'XL'],
    material: '100% Merino Wool',
    careInstructions: 'Hand wash cold or dry clean',
    isNew: true
  },
  {
    id: '16',
    slug: 'brown-leather-watch',
    name: 'Brown Leather Watch',
    description: 'Minimalist watch with brown leather strap. Japanese quartz movement and scratch-resistant glass.',
    price: 179.00,
    category: 'accessories',
    images: [
      'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=800&q=80',
      'https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?w=800&q=80'
    ],
    colors: ['Brown', 'Black'],
    sizes: ['One Size'],
    material: 'Stainless Steel & Leather',
    careInstructions: 'Avoid water exposure'
  }
];

export const getProductBySlug = (slug: string): Product | undefined => {
  return products.find(product => product.slug === slug);
};

export const getProductsByCategory = (category: string): Product[] => {
  return products.filter(product => product.category === category);
};