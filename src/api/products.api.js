import { 
  db, 
  collection, 
  getDocs, 
  addDoc, 
  doc, 
  setDoc, 
  deleteDoc, 
  updateDoc, 
  query, 
  orderBy, 
  onSnapshot 
} from '../firebase/firestore';

export const productsApi = {
  // Fetch all products
  async fetchAllProducts() {
    const q = query(collection(db, 'products'), orderBy('createdDate', 'desc'));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  },

  // Listen to live products updates
  subscribeToProducts(onUpdate, onError) {
    const q = query(collection(db, 'products'), orderBy('createdDate', 'desc'));
    return onSnapshot(q, (snapshot) => {
      const products = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      onUpdate(products);
    }, onError);
  },

  // Add a product
  async addProduct(productData) {
    const docRef = await addDoc(collection(db, 'products'), {
      ...productData,
      createdDate: new Date().toISOString()
    });
    return { id: docRef.id, ...productData };
  },

  // Update a product
  async updateProduct(productId, productData) {
    const docRef = doc(db, 'products', productId);
    await updateDoc(docRef, productData);
    return { id: productId, ...productData };
  },

  // Delete a product
  async deleteProduct(productId) {
    const docRef = doc(db, 'products', productId);
    await deleteDoc(docRef);
    return productId;
  },

  // Fetch all categories
  async fetchAllCategories() {
    const querySnapshot = await getDocs(collection(db, 'categories'));
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  },

  // Listen to live categories updates
  subscribeToCategories(onUpdate, onError) {
    const q = collection(db, 'categories');
    return onSnapshot(q, (snapshot) => {
      const categories = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      onUpdate(categories);
    }, onError);
  },

  // Add a category
  async addCategory(categoryData) {
    const docRef = await addDoc(collection(db, 'categories'), categoryData);
    return { id: docRef.id, ...categoryData };
  },

  // Update a category
  async updateCategory(categoryId, categoryData) {
    const docRef = doc(db, 'categories', categoryId);
    await updateDoc(docRef, categoryData);
    return { id: categoryId, ...categoryData };
  },

  // Delete a category
  async deleteCategory(categoryId) {
    const docRef = doc(db, 'categories', categoryId);
    await deleteDoc(docRef);
    return categoryId;
  }
};
