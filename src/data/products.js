// Popdrop product catalog seed data.
// Images are stable Unsplash URLs sized for cards.

export const CATEGORIES = ['All', 'Electronics', 'Clothing', 'Accessories']

/** Shop grid: 5 columns × 3 rows per page */
export const SHOP_PAGE_SIZE = 15

// Square frame with white matte so the product reads on a plain white field.
const img = (id, w = 900) =>
  `https://images.unsplash.com/${id}?auto=format&fit=min&w=${w}&h=${w}&q=82&bg=ffffff`

export const products = [
  {
    id: 'bubble-beam-lamp',
    name: 'Bubble Beam Lamp',
    category: 'Electronics',
    price: 38,
    image: img('photo-1507473885765-e6ed057f782c'),
    description: 'A glowy little mood-maker for your desk and late-night vibes.',
    tag: 'New In'
  },
  {
    id: 'mini-mood-speaker',
    name: 'Mini Mood Speaker',
    category: 'Electronics',
    price: 54,
    image: img('photo-1608043152269-423dbba4e7e1'),
    description: 'Pocket-sized sound with a punchy bass and 12 hours of fun.',
    tag: 'Most Wanted'
  },
  {
    id: 'cloud-charge-pad',
    name: 'Cloud Charge Pad',
    category: 'Electronics',
    price: 29,
    image: img('photo-1583863788434-e58a36330cf0'),
    description: 'Soft-touch wireless charger that powers up while you chill.',
    tag: null
  },
  {
    id: 'pixel-pop-earbuds',
    name: 'Pixel Pop Earbuds',
    category: 'Electronics',
    price: 72,
    image: img('photo-1606220588913-b3aacb4d2f46'),
    description: 'Crisp audio, tiny case, big personality. Tap-to-vibe ready.',
    tag: 'New In'
  },
  {
    id: 'sunday-hoodie',
    name: 'Sunday Hoodie',
    category: 'Clothing',
    price: 64,
    image: img('photo-1556821840-3a63f95609a7'),
    description: 'The cozy oversized hoodie you will live in all season.',
    tag: 'Most Wanted'
  },
  {
    id: 'pop-tee',
    name: 'Pop Tee',
    category: 'Clothing',
    price: 28,
    image: img('photo-1521572163474-6864f9cf17ab'),
    description: 'A soft cotton tee with a tiny logo and a big main-character feel.',
    tag: null
  },
  {
    id: 'soft-set-joggers',
    name: 'Soft Set Joggers',
    category: 'Clothing',
    price: 58,
    image: img('photo-1552902865-b72c031ac5ea'),
    description: 'Buttery-soft loungers that are absolutely outfit-eligible.',
    tag: 'New In'
  },
  {
    id: 'jelly-keychain',
    name: 'Jelly Keychain',
    category: 'Accessories',
    price: 9,
    image: img('photo-1612817288484-6f916006741a'),
    description: 'A squishy little charm that makes your keys way cuter.',
    tag: null
  },
  {
    id: 'pocket-pouch',
    name: 'Pocket Pouch',
    category: 'Accessories',
    price: 18,
    image: img('photo-1591561954557-26941169b49e'),
    description: 'Tiny zip pouch for cards, lip balm, and main-character vibes.',
    tag: null
  },
  {
    id: 'glossy-tote',
    name: 'Glossy Tote',
    category: 'Accessories',
    price: 24,
    image: img('photo-1591561954555-607968c989ab'),
    description: 'A glossy everyday tote that fits your laptop and your snacks.',
    tag: 'Most Wanted'
  },
  {
    id: 'sticker-pack',
    name: 'Sticker Pack',
    category: 'Accessories',
    price: 6,
    image: img('photo-1607344645866-009c320b63e0'),
    description: '12 colorful stickers to deck out your laptop, bottle, or journal.',
    tag: null
  },
  {
    id: 'sunset-sunnies',
    name: 'Sunset Sunnies',
    category: 'Accessories',
    price: 32,
    image: img('photo-1572635196237-14b3f281503f'),
    description: 'Warm-tinted shades that turn any afternoon golden.',
    tag: 'New In'
  },
  {
    id: 'desk-mat-pop',
    name: 'Desk Mat Pop',
    category: 'Accessories',
    price: 22,
    image: img('photo-1591561954557-26941169b49e'),
    description: 'A soft desk mat that makes WFH feel a little more you.',
    tag: null
  },
  {
    id: 'loop-water-bottle',
    name: 'Loop Water Bottle',
    category: 'Accessories',
    price: 26,
    image: img('photo-1608043152269-423dbba4e7e1'),
    description: 'Sleek bottle, happy hydration, zero boring beige.',
    tag: 'New In'
  },
  {
    id: 'zip-hoodie-lite',
    name: 'Zip Hoodie Lite',
    category: 'Clothing',
    price: 59,
    image: img('photo-1552902865-b72c031ac5ea'),
    description: 'Lightweight zip layer for in-between weather days.',
    tag: null
  },
  {
    id: 'desk-clock-mini',
    name: 'Desk Clock Mini',
    category: 'Electronics',
    price: 34,
    image: img('photo-1507473885765-e6ed057f782c'),
    description: 'Tiny analog vibes for your shelf or nightstand.',
    tag: null
  }
]

export const SORT_OPTIONS = [
  { value: 'featured', label: 'Featured' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'name-asc', label: 'Name: A to Z' }
]

// Top announcement bar messages (rotated).
export const ANNOUNCEMENTS = [
  'Free shipping on orders over $40',
  'New SS26 drop is live',
  '30-day easy returns',
  'Member rewards: join the loop'
]

// Marquee strip between hero and catalog.
export const MARQUEE_WORDS = [
  'Everyday Finds',
  'Made Fun',
  'Colorful Essentials',
  'Cozy Staples',
  'Tiny Upgrades',
  'Made to Pop'
]

// Stats block (Grüns-style "Modern Living…" feel).
export const STATS = [
  {
    value: '12k+',
    label: 'happy people popping daily'
  },
  {
    value: '4.9★',
    label: 'average review across the catalog'
  },
  {
    value: '60%',
    label: 'of customers come back within a month'
  },
  {
    value: '100%',
    label: 'feel-good, made to last vibes'
  }
]

// Customer love. `productId` must match an entry in `products`.
export const TESTIMONIALS = [
  {
    quote:
      'Honestly, every single thing I’ve ordered just makes my desk feel more like me.',
    author: 'Maya L.',
    location: 'Brooklyn, NY',
    productId: 'desk-mat-pop'
  },
  {
    quote:
      'The hoodie is my Roman empire. Wearing it three times a week and zero regrets.',
    author: 'Jordan P.',
    location: 'Austin, TX',
    productId: 'sunday-hoodie'
  },
  {
    quote:
      'Cute packaging, fast shipping, and the speaker actually slaps. 10/10 vibe.',
    author: 'Eli R.',
    location: 'Toronto, ON',
    productId: 'mini-mood-speaker'
  },
  {
    quote:
      'Finally a brand that gets it — fun without being loud, and quality that holds up.',
    author: 'Sam K.',
    location: 'Portland, OR',
    productId: 'pixel-pop-earbuds'
  },
  {
    quote:
      'The lamp is my whole mood for evening work. Guests always ask where it’s from.',
    author: 'Priya N.',
    location: 'London, UK',
    productId: 'bubble-beam-lamp'
  },
  {
    quote:
      'Returns were painless and support actually replied in like an hour. Rare.',
    author: 'Chris D.',
    location: 'Chicago, IL',
    productId: 'loop-water-bottle'
  }
]
