// Централизованная конфигурация всех изображений
// Все URL можно легко заменить на свои

export const media = {
  hero: {
    desktop: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1920&q=80',
    mobile: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=800&q=80',
    fallback: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=1600&q=80',
  },

  editorial: {
    campaign: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=1200&q=80',
    dailyUniform: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=1200&q=80',
    texture: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=800&q=80',
    detail: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80',
  },

  lookbook: [
    {
      src: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=1200&q=80',
      alt: 'Lookbook image 1 - urban style',
      caption: 'URBAN / 01',
    },
    {
      src: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=800&q=80',
      alt: 'Lookbook image 2 - streetwear',
      caption: 'STREET / 02',
    },
    {
      src: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80',
      alt: 'Lookbook image 3 - casual',
      caption: 'CASUAL / 03',
    },
    {
      src: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&q=80',
      alt: 'Lookbook image 4 - fashion',
      caption: 'DAILY / 04',
    },
    {
      src: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=800&q=80',
      alt: 'Lookbook image 5 - style',
      caption: 'MOTION / 05',
    },
    {
      src: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=800&q=80',
      alt: 'Lookbook image 6 - outfit',
      caption: 'FIELD / 06',
    },
  ],

  categories: {
    't-shirts': 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&q=80',
    'hoodies': 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&q=80',
    'jackets': 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&q=80',
    'pants': 'https://images.unsplash.com/photo-1517438476312-10d79c077509?w=600&q=80',
    'accessories': 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&q=80',
  },

  materials: {
    texture: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=800&q=80',
    seam: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80',
    hardware: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80',
  },

  instagram: [
    'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=400&q=80',
    'https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&q=80',
    'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&q=80',
    'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=400&q=80',
    'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=400&q=80',
    'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=400&q=80',
  ],
};

export const productImages: Record<string, string[]> = {
  'olive-canvas-jacket': [
    'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&q=80',
    'https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=800&q=80',
  ],
  'graphite-wool-overcoat': [
    'https://images.unsplash.com/photo-1544923246-77307dd654cb?w=800&q=80',
    'https://images.unsplash.com/photo-1539533113208-f6df8cc8b543?w=800&q=80',
  ],
  // ... можно добавить остальные товары
};