/* global process */
import admin from 'firebase-admin';
import fs from 'fs';
import crypto from 'crypto';

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
    credential: admin.credential.cert(serviceAccount)
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

  // GET Diagnostics Endpoint
  if (req.method === 'GET') {
    try {
      if (!serviceAccount) {
        return res.status(500).json({
          success: false,
          error: 'Firebase service account credentials key file is missing on local/env. Please download your service account key.'
        });
      }

      let bucketName = 'None';
      let storageStatus = 'Not Connected';
      let errorDetail = null;

      try {
        console.log("DEBUG [Diagnostics]: Listing active storage buckets dynamically...");
        const [buckets] = await admin.storage().getBuckets();
        if (buckets && buckets.length > 0) {
          bucketName = buckets[0].name;
          storageStatus = 'Connected';
        } else {
          storageStatus = 'No Buckets Found';
          errorDetail = 'No active storage buckets found. Please open your Firebase Console Storage tab and click "Get Started" to initialize it!';
        }
      } catch (err) {
        console.error("DEBUG [Diagnostics]: Storage connection check failed:", err);
        storageStatus = 'Connection Failed';
        errorDetail = err.message;
      }

      return res.status(200).json({
        success: storageStatus === 'Connected',
        projectId: serviceAccount.project_id,
        bucketName: bucketName,
        authStatus: 'Authenticated (Admin SDK)',
        storageStatus,
        error: errorDetail
      });
    } catch (err) {
      return res.status(500).json({ success: false, error: err.message });
    }
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { fileName, fileData } = req.body;

    if (!fileData) {
      return res.status(400).json({ error: 'Missing fileData' });
    }

    // Parse the base64 string
    const matches = fileData.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
    if (!matches || matches.length !== 3) {
      return res.status(400).json({ error: 'Invalid base64 fileData' });
    }

    const contentType = matches[1];
    const base64Data = matches[2];
    const buffer = Buffer.from(base64Data, 'base64');

    // Dynamically detect the active storage bucket to prevent "bucket does not exist" errors
    let bucket;
    let bucketName;
    try {
      console.log("DEBUG: Querying active storage buckets dynamically...");
      const [buckets] = await admin.storage().getBuckets();
      if (buckets && buckets.length > 0) {
        bucket = buckets[0];
        bucketName = bucket.name;
        console.log("DEBUG: Dynamically detected active storage bucket:", bucketName);
      } else {
        throw new Error("No active storage buckets found. Click \"Get Started\" in the Storage tab of your Firebase Console.");
      }
    } catch (listErr) {
      console.warn("Could not list buckets dynamically, falling back to default:", listErr);
      bucketName = serviceAccount ? `${serviceAccount.project_id}.appspot.com` : "hr-jewellery.appspot.com";
      bucket = admin.storage().bucket(bucketName);
    }
    
    const name = `custom-designs/${Date.now()}_${fileName}`;
    const file = bucket.file(name);
    
    // Generate UUID token for permanent download access
    const downloadToken = crypto.randomUUID();
    
    await file.save(buffer, {
      metadata: {
        contentType: contentType,
        metadata: {
          firebaseStorageDownloadTokens: downloadToken
        }
      }
    });

    // Make the file publicly readable
    try {
      await file.makePublic();
    } catch (e) {
      console.warn("Could not make file public (continuing with token-based access):", e);
    }

    // Construct permanent public media URL
    const downloadUrl = `https://firebasestorage.googleapis.com/v0/b/${bucketName}/o/${encodeURIComponent(name)}?alt=media&token=${downloadToken}`;

    console.log("DEBUG: Secure server-side Firebase Storage upload succeeded. public URL:", downloadUrl);

    return res.status(200).json({ success: true, downloadURL: downloadUrl });
  } catch (error) {
    console.error('Serverless Secure Upload Error:', error);
    return res.status(500).json({ error: error.message });
  }
}
