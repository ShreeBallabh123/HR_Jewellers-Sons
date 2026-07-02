import { 
  db, 
  doc, 
  getDoc, 
  setDoc, 
  onSnapshot 
} from '../firebase/firestore';

export const ratesApi = {
  // Get active rates document
  async getRates() {
    const docRef = doc(db, 'system_configs', 'metal_rates');
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data();
    }
    // Fallback constants
    return {
      goldRate24k: 78500,
      silverRate1kg: 92000,
      lastUpdated: new Date().toISOString()
    };
  },

  // Listen to live rates changes
  subscribeToRates(onUpdate, onError) {
    const docRef = doc(db, 'system_configs', 'metal_rates');
    return onSnapshot(docRef, (docSnap) => {
      if (docSnap.exists()) {
        onUpdate(docSnap.data());
      } else {
        onUpdate({
          goldRate24k: 78500,
          silverRate1kg: 92000,
          lastUpdated: new Date().toISOString()
        });
      }
    }, onError);
  },

  // Save rates
  async saveRates(ratesData) {
    const docRef = doc(db, 'system_configs', 'metal_rates');
    await setDoc(docRef, {
      ...ratesData,
      lastUpdated: new Date().toISOString()
    }, { merge: true });
    return ratesData;
  }
};
