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
    goldRate20k:  65417,
    goldRate18k:  58875,
    goldRate14k:  45788,
    purityPercentages: {
      '24k': 100.00,
      '22k': 91.67,
      '20k': 83.33,
      '18k': 75.00,
      '14k': 58.33,
    },
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
  const p22 = Number(ratesData.purityPercentages?.['22k'] ?? ratesData.purityPercentages?.['22K'] ?? 91.67);
  const p20 = Number(ratesData.purityPercentages?.['20k'] ?? ratesData.purityPercentages?.['20K'] ?? 83.33);
  const p18 = Number(ratesData.purityPercentages?.['18k'] ?? ratesData.purityPercentages?.['18K'] ?? 75.00);
  const p14 = Number(ratesData.purityPercentages?.['14k'] ?? ratesData.purityPercentages?.['14K'] ?? 58.33);

  return {
    goldRate24k:  rate24k,
    goldRate22k:  Number(ratesData.goldRate22k) || Math.round(rate24k * (p22 / 100)),
    goldRate20k:  Number(ratesData.goldRate20k) || Math.round(rate24k * (p20 / 100)),
    goldRate18k:  Number(ratesData.goldRate18k) || Math.round(rate24k * (p18 / 100)),
    goldRate14k:  Number(ratesData.goldRate14k) || Math.round(rate24k * (p14 / 100)),
    purityPercentages: {
      '24k': 100.00,
      '22k': p22,
      '20k': p20,
      '18k': p18,
      '14k': p14,
    },
    silverRate:   Number(ratesData.silverRate)   || 92000,
    platinumRate: Number(ratesData.platinumRate) || 3500,
    lastUpdated:  now,
    updatedBy:    adminEmail,
    isPublished:  publish,
    publishedAt:  publish ? (publishedAt || now) : (ratesData.publishedAt || null),
  };
}
