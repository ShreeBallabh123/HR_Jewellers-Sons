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
    const { orderId, newStatus, recipientName, mobile } = req.body;

    if (!orderId || !newStatus || !mobile) {
      return res.status(400).json({ error: 'Missing orderId, newStatus, or mobile' });
    }

    if (!admin.apps.length) {
      return res.status(500).json({ error: 'Firebase Admin SDK not initialized' });
    }

    const cleanMobile = String(mobile).replace(/\D/g, '');
    const db = admin.firestore();

    // Query Firestore for tokens belonging to this mobile number
    const tokensSnapshot = await db.collection('fcm_tokens')
      .where('mobile', '==', cleanMobile)
      .get();

    const tokens = [];
    tokensSnapshot.forEach(doc => {
      const data = doc.data();
      if (data.token) {
        tokens.push(data.token);
      }
    });

    if (tokens.length === 0) {
      console.log(`FCM: No active device tokens found for mobile: ${cleanMobile}`);
      return res.status(200).json({ success: true, message: 'No registered tokens found for this number' });
    }

    // Prepare Notification content
    const title = 'Order Update — HR Jewellers & Sons';
    // Format status nicely for display
    const formattedStatus = newStatus.charAt(0).toUpperCase() + newStatus.slice(1);
    const body = `Dear ${recipientName || 'Customer'}, your order #${orderId} status has been updated to: ${formattedStatus}.`;

    const message = {
      tokens,
      notification: {
        title,
        body
      },
      data: {
        orderId,
        orderStatus: newStatus,
        click_action: '/collections' // or target PDP/order history page
      }
    };

    // Send multicast push notifications
    const response = await admin.messaging().sendEachForMulticast(message);
    console.log(`FCM: Successfully sent ${response.successCount} messages; ${response.failureCount} failed.`);

    // Clean up expired/invalid tokens from Firestore if any failed
    if (response.failureCount > 0) {
      const deletePromises = [];
      response.responses.forEach((resp, idx) => {
        if (!resp.success) {
          const error = resp.error;
          const badToken = tokens[idx];
          if (error && (
            error.code === 'messaging/registration-token-not-registered' ||
            error.code === 'messaging/invalid-registration-token'
          )) {
            console.log(`FCM: Cleaning up invalid token: ${badToken}`);
            // Query docs matching this bad token and delete them
            deletePromises.push(
              db.collection('fcm_tokens').doc(badToken).delete()
            );
          }
        }
      });
      if (deletePromises.length > 0) {
        await Promise.all(deletePromises);
      }
    }

    return res.status(200).json({
      success: true,
      sentCount: response.successCount,
      failedCount: response.failureCount
    });

  } catch (error) {
    console.error('FCM Notification Dispatch Error:', error);
    return res.status(500).json({ error: error.message });
  }
}
