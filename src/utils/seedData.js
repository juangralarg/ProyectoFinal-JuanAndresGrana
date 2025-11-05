import { collection, addDoc } from 'firebase/firestore';
import { db } from '../services/firestoreService';

const products = [
  {
    name: 'Laptop HP Pavilion',
    price: 899.99,
    category: 'computadoras',
    description: 'Laptop HP Pavilion 15.6" con procesador Intel Core i5, 8GB RAM, 256GB SSD',
    stock: 10,
    img: 'https://via.placeholder.com/300x200/4299e1/ffffff?text=Laptop+HP'
  },
  {
    name: 'Mouse Logitech MX',
    price: 49.99,
    category: 'perifericos',
    description: 'Mouse inalámbrico Logitech MX Master 3 con sensor de alta precisión',
    stock: 25,
    img: 'https://via.placeholder.com/300x200/48bb78/ffffff?text=Mouse+Logitech'
  },
  {
    name: 'Teclado Mecánico RGB',
    price: 129.99,
    category: 'perifericos',
    description: 'Teclado mecánico gaming con switches Cherry MX e iluminación RGB',
    stock: 15,
    img: 'https://via.placeholder.com/300x200/ed8936/ffffff?text=Teclado+RGB'
  },
  {
    name: 'Monitor LG 27"',
    price: 299.99,
    category: 'monitores',
    description: 'Monitor LG UltraGear 27" Full HD 144Hz con tecnología IPS',
    stock: 8,
    img: 'https://via.placeholder.com/300x200/9f7aea/ffffff?text=Monitor+LG'
  },
  {
    name: 'Laptop Dell XPS',
    price: 1299.99,
    category: 'computadoras',
    description: 'Dell XPS 13" con procesador Intel Core i7, 16GB RAM, 512GB SSD',
    stock: 5,
    img: 'https://via.placeholder.com/300x200/4299e1/ffffff?text=Laptop+Dell'
  },
  {
    name: 'Auriculares Sony',
    price: 199.99,
    category: 'perifericos',
    description: 'Auriculares Sony WH-1000XM4 con cancelación de ruido',
    stock: 20,
    img: 'https://via.placeholder.com/300x200/f56565/ffffff?text=Auriculares+Sony'
  },
  {
    name: 'Monitor Samsung 32"',
    price: 449.99,
    category: 'monitores',
    description: 'Monitor Samsung 32" 4K UHD con tecnología HDR10',
    stock: 12,
    img: 'https://via.placeholder.com/300x200/9f7aea/ffffff?text=Monitor+Samsung'
  },
  {
    name: 'Webcam Logitech',
    price: 79.99,
    category: 'perifericos',
    description: 'Webcam Logitech C920 Full HD 1080p con micrófono integrado',
    stock: 30,
    img: 'https://via.placeholder.com/300x200/48bb78/ffffff?text=Webcam'
  }
];

export const seedProducts = async () => {
  try {
    const productsCollection = collection(db, 'products');
    
    for (const product of products) {
      await addDoc(productsCollection, product);
      console.log(`Producto ${product.name} agregado`);
    }
    
    console.log('Todos los productos fueron agregados exitosamente!');
  } catch (error) {
    console.error('Error agregando productos:', error);
  }
};

// Para ejecutar: Importa y llama esta función una vez desde tu componente
// import { seedProducts } from './utils/seedData';
// seedProducts();