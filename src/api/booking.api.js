import { 
  db, 
  collection, 
  getDocs, 
  addDoc, 
  doc, 
  deleteDoc, 
  updateDoc, 
  query, 
  orderBy, 
  onSnapshot 
} from '../firebase/firestore';

export const bookingApi = {
  // Add a consultation/booking request
  async createConsultation(bookingData) {
    const docRef = await addDoc(collection(db, 'consultations'), {
      ...bookingData,
      createdDate: new Date().toISOString()
    });
    return { id: docRef.id, ...bookingData };
  },

  // Subscribe to live consultations for admin
  subscribeToConsultations(onUpdate, onError) {
    const q = query(collection(db, 'consultations'), orderBy('createdDate', 'desc'));
    return onSnapshot(q, (snapshot) => {
      const bookings = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      onUpdate(bookings);
    }, onError);
  },

  // Update booking status
  async updateConsultationStatus(bookingId, status) {
    const docRef = doc(db, 'consultations', bookingId);
    await updateDoc(docRef, { status });
    return { id: bookingId, status };
  },

  // Delete booking request
  async deleteConsultation(bookingId) {
    const docRef = doc(db, 'consultations', bookingId);
    await deleteDoc(docRef);
    return bookingId;
  },

  // Add savings scheme enrollment
  async enrollInSavingsScheme(enrollmentData) {
    const docRef = await addDoc(collection(db, 'savings_enrollments'), {
      ...enrollmentData,
      createdDate: new Date().toISOString(),
      status: 'pending'
    });
    return { id: docRef.id, ...enrollmentData };
  },

  // Create new customer order
  async createOrder(orderData) {
    const docRef = await addDoc(collection(db, 'orders'), {
      ...orderData,
      createdDate: new Date().toISOString(),
      orderStatus: 'pending'
    });
    return { id: docRef.id, ...orderData };
  },

  // Subscribe to live orders
  subscribeToOrders(onUpdate, onError) {
    const q = query(collection(db, 'orders'), orderBy('createdDate', 'desc'));
    return onSnapshot(q, (snapshot) => {
      const orders = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      onUpdate(orders);
    }, onError);
  },

  // Update order status
  async updateOrderStatus(orderId, orderStatus) {
    const docRef = doc(db, 'orders', orderId);
    await updateDoc(docRef, { orderStatus });
    return { id: orderId, orderStatus };
  },

  // Delete order
  async deleteOrder(orderId) {
    const docRef = doc(db, 'orders', orderId);
    await deleteDoc(docRef);
    return orderId;
  }
};
