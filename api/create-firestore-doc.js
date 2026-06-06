/* global process */
import admin from 'firebase-admin';
import fs from 'fs';

// Initialize Firebase Admin SDK
let serviceAccount;
const localPath = 'c:\\Users\\kirad\\Downloads\\hr-jewellery-firebase-adminsdk-fbsvc-55cbb6541d.json';

if (fs.existsSync(localPath)) {
  serviceAccount = JSON.parse(fs.readFileSync(localPath, 'utf8'));
} else if (process.env.FIREBASE_SERVICE_ACCOUNT) {
  serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
}

if (serviceAccount && !admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: serviceAccount.project_id + '.appspot.com'
  });
}

export default async function handler(req, res) {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { collectionName, docData } = req.body;

    if (!collectionName || !docData) {
      return res.status(400).json({ error: 'Missing collectionName or docData' });
    }

    const db = admin.firestore();
    
    // Parse timestamps securely
    const documentToWrite = {
      ...docData,
      createdDate: docData.createdDate ? new Date(docData.createdDate) : admin.firestore.FieldValue.serverTimestamp()
    };

    const docRef = await db.collection(collectionName).add(documentToWrite);
    
    console.log(`DEBUG: Secure server-side Firestore write succeeded in collection '${collectionName}'. ID:`, docRef.id);

    return res.status(200).json({ success: true, id: docRef.id });
  } catch (error) {
    console.error('Serverless Secure Firestore Write Error:', error);
    return res.status(500).json({ error: error.message });
  }
}
