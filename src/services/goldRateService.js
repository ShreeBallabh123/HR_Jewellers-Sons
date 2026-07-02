/**
 * goldRateService.js — Firestore CRUD for Gold Rate Management
 * Collection: system_configs / Document: metal_rates
 */
import {
  db,
  doc,
  getDoc,
  setDoc,
  onSnapshot,
} from '../firebase/firestore';

const RATE_DOC_REF = () => doc(db, 'system_configs', 'metal_rates');

export const goldRateService = {
  /**
   * Fetch current rates (one-time read)
   */
  async getRates() {
    const snap = await getDoc(RATE_DOC_REF());
    if (snap.exists()) return snap.data();
    return getDefaultRates();
  },

  /**
   * Subscribe to live rate changes
   * @returns unsubscribe function
   */
  subscribeToRates(onUpdate, onError) {
    return onSnapshot(RATE_DOC_REF(), (snap) => {
      onUpdate(snap.exists() ? snap.data() : getDefaultRates());
    }, onError);
  },

  /**
   * Save draft rates (does NOT mark as published)
   */
  async saveRates(ratesData, adminEmail = 'admin') {
    const payload = buildRatePayload(ratesData, adminEmail, false);
    await setDoc(RATE_DOC_REF(), payload, { merge: true });
    return payload;
  },

  /**
   * Publish rates — marks publishedAt timestamp
   */
  async publishRates(ratesData, adminEmail = 'admin') {
    const now = new Date().toISOString();
    const payload = buildRatePayload(ratesData, adminEmail, true, now);
    await setDoc(RATE_DOC_REF(), payload, { merge: true });
    return payload;
  },
};

// ─── Helpers ────────────────────────────────────────────────────────────────

function getDefaultRates() {
  return {
    goldRate24k:  78500,
    goldRate22k:  71958,
    goldRate18k:  58875,
    silverRate:   92000,
    platinumRate: 3500,
    lastUpdated:  new Date().toISOString(),
    publishedAt:  null,
    updatedBy:    'system',
    isPublished:  false,
  };
}

function buildRatePayload(ratesData, adminEmail, publish, publishedAt = null) {
  const now = new Date().toISOString();
  const rate24k = Number(ratesData.goldRate24k) || 78500;

  return {
    goldRate24k:  rate24k,
    goldRate22k:  Number(ratesData.goldRate22k) || Math.round(rate24k * (22 / 24)),
    goldRate18k:  Number(ratesData.goldRate18k) || Math.round(rate24k * (18 / 24)),
    silverRate:   Number(ratesData.silverRate)   || 92000,
    platinumRate: Number(ratesData.platinumRate) || 3500,
    lastUpdated:  now,
    updatedBy:    adminEmail,
    isPublished:  publish,
    publishedAt:  publish ? (publishedAt || now) : (ratesData.publishedAt || null),
  };
}
