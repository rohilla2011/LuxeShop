export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
  isTrending?: boolean;
};

export const products: Product[] = [
  // ELECTRONICS
  { id: "1", name: "Premium Wireless Headphones", description: "High-fidelity audio with active noise cancellation and 30-hour battery life.", price: 24999, imageUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=60", category: "Electronics", isTrending: true },
  { id: "2", name: "Minimalist Smartwatch", description: "Track fitness and notifications with a sleek AMOLED display and 7-day battery.", price: 16999, imageUrl: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=60", category: "Electronics" },
  { id: "3", name: "Ergonomic Mechanical Keyboard", description: "Satisfying tactile feedback with RGB lighting and hot-swappable switches.", price: 12499, imageUrl: "https://images.unsplash.com/photo-1595225476474-87563907a212?w=800&auto=format&fit=crop&q=60", category: "Electronics" },
  { id: "5", name: "Portable Bluetooth Speaker", description: "360° surround sound, IPX7 waterproof, and 20-hour battery life.", price: 6999, imageUrl: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=800&auto=format&fit=crop&q=60", category: "Electronics", isTrending: true },
  { id: "7", name: "Noise-Cancelling Earbuds", description: "True wireless earbuds with ANC, transparency mode, and premium sound.", price: 14999, imageUrl: "https://images.unsplash.com/photo-1590658268037-6bf12f032f55?w=800&auto=format&fit=crop&q=60", category: "Electronics" },
  
  // FASHION
  { id: "13", name: "Classic Aviator Sunglasses", description: "Polarized lenses with a premium lightweight metal frame.", price: 2999, imageUrl: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800&auto=format&fit=crop&q=60", category: "Fashion", isTrending: true },
  { id: "14", name: "Minimalist Leather Sneaker", description: "Everyday comfort with genuine Italian leather and orthotic insoles.", price: 5499, imageUrl: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=800&auto=format&fit=crop&q=60", category: "Fashion" },
  { id: "15", name: "Oversized Cotton Hoodie", description: "Ultra-soft, heavy-weight organic cotton hoodie for premium comfort.", price: 3499, imageUrl: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&auto=format&fit=crop&q=60", category: "Fashion" },
  { id: "16", name: "Vintage Denim Jacket", description: "Classic rugged denim jacket that perfectly fits any style.", price: 4999, imageUrl: "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=800&auto=format&fit=crop&q=60", category: "Fashion", isTrending: true },
  { id: "9", name: "Premium Canvas Backpack", description: "Water-resistant canvas with leather accents. Fits 15\" laptops.", price: 4499, imageUrl: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&auto=format&fit=crop&q=60", category: "Fashion" },

  // BEAUTY & HEALTH
  { id: "17", name: "Hydrating Facial Serum", description: "Hyaluronic acid serum for deep hydration and glowing skin.", price: 1899, imageUrl: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800&auto=format&fit=crop&q=60", category: "Beauty", isTrending: true },
  { id: "18", name: "Luxury Eau de Parfum", description: "A sophisticated fragrance with notes of sandalwood, vanilla, and bergamot.", price: 6499, imageUrl: "https://images.unsplash.com/photo-1594035910387-fea47794261f?w=800&auto=format&fit=crop&q=60", category: "Beauty" },
  { id: "19", name: "Organic Matte Lipstick", description: "Long-lasting, cruelty-free matte lipstick with nourishing oils.", price: 1299, imageUrl: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=800&auto=format&fit=crop&q=60", category: "Beauty" },
  { id: "20", name: "Jade Roller Set", description: "100% natural jade stone roller and Gua Sha set for facial massage.", price: 1499, imageUrl: "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=800&auto=format&fit=crop&q=60", category: "Beauty" },

  // ACCESSORIES
  { id: "12", name: "Minimalist Leather Wallet", description: "Slim RFID-blocking genuine leather wallet. Holds 8 cards.", price: 2199, imageUrl: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=800&auto=format&fit=crop&q=60", category: "Accessories" },
  { id: "4", name: "Leather Workspace Mat", description: "Premium vegan leather desk mat. Water-resistant and ultra-durable.", price: 2499, imageUrl: "https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=800&auto=format&fit=crop&q=60", category: "Accessories" },
  { id: "11", name: "Titanium Water Bottle", description: "Double-wall vacuum insulated. Cold 24hrs, hot 12hrs. BPA-free.", price: 1999, imageUrl: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=800&auto=format&fit=crop&q=60", category: "Accessories", isTrending: true },
  { id: "10", name: "Smart LED Desk Lamp", description: "Touch-controlled brightness, 5 color temperatures, USB charging port.", price: 3499, imageUrl: "https://images.unsplash.com/photo-1507473885765-e6ed057ab6fe?w=800&auto=format&fit=crop&q=60", category: "Accessories" },
];
