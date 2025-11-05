// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { 
  getFirestore, 
  collection, 
  getDocs, 
  doc, 
  getDoc,
  query,
  where,
  addDoc
} from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAEzm8apL34lXovCoQGZ7RZLDxZ1N2Ew0Y",
  authDomain: "mi-app-codhouse.firebaseapp.com",
  projectId: "mi-app-codhouse",
  storageBucket: "mi-app-codhouse.firebasestorage.app",
  messagingSenderId: "128994090672",
  appId: "1:128994090672:web:15a25427649e0bf15fe575"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);

// Función para obtener todos los productos
export const getProducts = async () => {
  try {
    const productsCollection = collection(db, "products");
    const productsSnapshot = await getDocs(productsCollection);
    const productsList = productsSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    return productsList;
  } catch (error) {
    console.error("Error al obtener productos:", error);
    throw error;
  }
};

// Función para obtener productos por categoría
export const getProductsByCategory = async (categoryId) => {
  try {
    const productsCollection = collection(db, "products");
    const q = query(productsCollection, where("category", "==", categoryId));
    const querySnapshot = await getDocs(q);
    const productsList = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    return productsList;
  } catch (error) {
    console.error("Error al obtener productos por categoría:", error);
    throw error;
  }
};

// Función para obtener un producto por ID
export const getProductById = async (itemId) => {
  try {
    const productDoc = doc(db, "products", itemId);
    const productSnapshot = await getDoc(productDoc);
    
    if (productSnapshot.exists()) {
      return {
        id: productSnapshot.id,
        ...productSnapshot.data()
      };
    } else {
      console.log("Producto no encontrado");
      return null;
    }
  } catch (error) {
    console.error("Error al obtener producto:", error);
    throw error;
  }
};

// Función para crear una orden de compra
export const createOrder = async (orderData) => {
  try {
    const ordersCollection = collection(db, "orders");
    const docRef = await addDoc(ordersCollection, {
      ...orderData,
      date: new Date().toISOString()
    });
    return docRef.id;
  } catch (error) {
    console.error("Error al crear orden:", error);
    throw error;
  }
};