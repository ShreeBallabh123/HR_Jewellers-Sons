import admin from 'firebase-admin';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import readline from 'readline';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const localKeyPath = 'c:\\Users\\kirad\\Downloads\\hr-jewellery-firebase-adminsdk-fbsvc-55cbb6541d.json';
const imagesFolder = 'C:\\Users\\kirad\\Downloads\\Jewllery Images';

// Initialize Firebase Admin
if (!fs.existsSync(localKeyPath)) {
  console.error(`Error: Firebase service account key not found at ${localKeyPath}`);
  process.exit(1);
}

const serviceAccount = JSON.parse(fs.readFileSync(localKeyPath, 'utf8'));

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
}

const db = admin.firestore();
const storage = admin.storage();

function getEnvCloudinaryConfig() {
  const config = { cloudName: null, uploadPreset: null };
  const envFiles = [
    path.join(__dirname, '.env.local'),
    path.join(__dirname, '.env'),
    path.resolve('.env.local'),
    path.resolve('.env')
  ];
  for (const envPath of envFiles) {
    if (fs.existsSync(envPath)) {
      const content = fs.readFileSync(envPath, 'utf8');
      const nameMatch = content.match(/VITE_CLOUDINARY_CLOUD_NAME\s*=\s*["']?([^"'\r\n\s]+)["']?/);
      const presetMatch = content.match(/VITE_CLOUDINARY_UPLOAD_PRESET\s*=\s*["']?([^"'\r\n\s]+)["']?/);
      if (nameMatch && nameMatch[1]) {
        config.cloudName = nameMatch[1];
      }
      if (presetMatch && presetMatch[1]) {
        config.uploadPreset = presetMatch[1];
      }
      if (config.cloudName && config.uploadPreset) {
        break;
      }
    }
  }
  return config;
}

function getEnvStorageBucket() {
  const envFiles = [
    path.join(__dirname, '.env.local'),
    path.join(__dirname, '.env'),
    path.resolve('.env.local'),
    path.resolve('.env')
  ];
  for (const envPath of envFiles) {
    if (fs.existsSync(envPath)) {
      const content = fs.readFileSync(envPath, 'utf8');
      const match = content.match(/VITE_FIREBASE_STORAGE_BUCKET\s*=\s*["']?([^"'\r\n\s]+)["']?/);
      if (match && match[1]) {
        return match[1];
      }
    }
  }
  return null;
}

async function getBucket() {
  const envBucket = getEnvStorageBucket();
  if (envBucket) {
    return storage.bucket(envBucket);
  }
  try {
    const [buckets] = await storage.getBuckets();
    if (buckets && buckets.length > 0) {
      return buckets[0];
    }
  } catch (e) {
    // ignore
  }
  return storage.bucket(`${serviceAccount.project_id}.firebasestorage.app`);
}

function cleanName(fileName) {
  // Remove extension
  let base = path.basename(fileName, path.extname(fileName));
  // Clean up typical ChatGPT name format, e.g. "ChatGPT Image Jul 14, 2026, 11_05_06 PM"
  // Replace underscores in time with colons
  base = base.replace(/_(\d{2})_(\d{2})/g, ':$1:$2');
  base = base.replace(/_/g, ' ');
  return base;
}

function generateSKU() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let random = '';
  for (let i = 0; i < 6; i++) {
    random += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `HRJ-${random}`;
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const question = (query) => new Promise((resolve) => rl.question(query, resolve));

async function main() {
  try {
    // 1. Fetch categories
    console.log('Fetching categories from Firestore...');
    const catSnapshot = await db.collection('categories').get();
    const categories = [];
    catSnapshot.forEach(doc => {
      categories.push({ id: doc.id, ...doc.data() });
    });

    if (categories.length === 0) {
      console.warn('Warning: No categories found in Firestore.');
    }

    // 2. Scan images
    if (!fs.existsSync(imagesFolder)) {
      console.error(`Error: Images directory does not exist at ${imagesFolder}`);
      process.exit(1);
    }

    const files = fs.readdirSync(imagesFolder);
    const imageExtensions = ['.png', '.jpg', '.jpeg', '.webp'];
    const imageFiles = files.filter(f => imageExtensions.includes(path.extname(f).toLowerCase()));

    if (imageFiles.length === 0) {
      console.log('No valid images found in the folder.');
      rl.close();
      return;
    }

    console.log(`Found ${imageFiles.length} image files in ${imagesFolder}.`);

    // 3. Command line args or User prompts
    const args = process.argv.slice(2);
    let categoryArg = null;
    let typeArg = null;
    let autoConfirm = false;

    for (let i = 0; i < args.length; i++) {
      if (args[i] === '--category' && args[i + 1]) {
        categoryArg = args[i + 1];
        i++;
      } else if (args[i] === '--type' && args[i + 1]) {
        typeArg = args[i + 1];
        i++;
      } else if (args[i] === '--yes' || args[i] === '-y') {
        autoConfirm = true;
      }
    }

    let selectedCategoryId = '';
    let selectedType = 'Gold';

    if (categoryArg) {
      const foundCat = categories.find(c => c.id === categoryArg || c.name?.toLowerCase() === categoryArg.toLowerCase());
      if (foundCat) {
        selectedCategoryId = foundCat.id;
      } else {
        selectedCategoryId = categoryArg;
      }
    }

    if (typeArg) {
      selectedType = typeArg;
    }

    if (!categoryArg || !typeArg || !autoConfirm) {
      console.log('\nAvailable Categories:');
      categories.forEach((cat, index) => {
        console.log(`${index + 1}. ${cat.name || cat.id} (ID: ${cat.id})`);
      });
      console.log(`${categories.length + 1}. Create a new category`);
      console.log(`${categories.length + 2}. Uncategorized (leave category field empty)`);

      if (!selectedCategoryId) {
        const catChoiceStr = await question('\nSelect category (enter number): ');
        const catChoice = parseInt(catChoiceStr, 10);
        
        if (catChoice >= 1 && catChoice <= categories.length) {
          selectedCategoryId = categories[catChoice - 1].id;
        } else if (catChoice === categories.length + 1) {
          const newCatName = await question('Enter new category name: ');
          if (newCatName.trim()) {
            const newCatRef = await db.collection('categories').add({
              name: newCatName.trim(),
              slug: newCatName.toLowerCase().replace(/[^a-z0-9]+/g, '-')
            });
            selectedCategoryId = newCatRef.id;
            console.log(`Created new category "${newCatName.trim()}" with ID: ${selectedCategoryId}`);
          }
        }
      } else {
        console.log(`Using specified category: ${selectedCategoryId}`);
      }

      if (!typeArg) {
        console.log('\nSelect Category Type:');
        console.log('1. Gold');
        console.log('2. Silver');
        console.log('3. Diamond');
        const typeChoiceStr = await question('Select type (1-3, default 1): ');
        if (typeChoiceStr === '2') selectedType = 'Silver';
        if (typeChoiceStr === '3') selectedType = 'Diamond';
      } else {
        console.log(`Using specified type: ${selectedType}`);
      }

      if (!autoConfirm) {
        const confirm = await question(`\nAre you sure you want to upload ${imageFiles.length} products to category "${selectedCategoryId || 'Uncategorized'}" as "${selectedType}"? (y/n): `);
        if (confirm.toLowerCase() !== 'y') {
          console.log('Operation cancelled.');
          rl.close();
          return;
        }
      }
    }

    rl.close();

    const cloudinaryConfig = getEnvCloudinaryConfig();
    const useCloudinary = !!(cloudinaryConfig.cloudName && cloudinaryConfig.uploadPreset);

    if (useCloudinary) {
      console.log(`Using Cloudinary cloud: ${cloudinaryConfig.cloudName}`);
    } else {
      console.log(`Cloudinary not configured. Falling back to Firebase Storage...`);
    }

    console.log('\nStarting upload process...\n');

    for (let i = 0; i < imageFiles.length; i++) {
      const fileName = imageFiles[i];
      const filePath = path.join(imagesFolder, fileName);
      console.log(`[${i + 1}/${imageFiles.length}] Uploading ${fileName}...`);

      try {
        const fileBuffer = fs.readFileSync(filePath);
        let ext = path.extname(fileName).toLowerCase();
        let mimeType = 'image/png';
        if (ext === '.jpg' || ext === '.jpeg') mimeType = 'image/jpeg';
        else if (ext === '.webp') mimeType = 'image/webp';

        let downloadUrl = '';

        if (useCloudinary) {
          const blob = new Blob([fileBuffer], { type: mimeType });
          const formData = new FormData();
          formData.append('file', blob, fileName);
          formData.append('upload_preset', cloudinaryConfig.uploadPreset);

          const response = await fetch(
            `https://api.cloudinary.com/v1_1/${cloudinaryConfig.cloudName}/image/upload`,
            {
              method: 'POST',
              body: formData
            }
          );

          if (!response.ok) {
            const errText = await response.text();
            throw new Error(`Cloudinary upload failed: ${errText}`);
          }

          const data = await response.json();
          downloadUrl = data.secure_url;
        } else {
          const bucket = await getBucket();
          const bucketName = bucket.name;
          const destination = `products/${Date.now()}_${fileName}`;
          const file = bucket.file(destination);
          const downloadToken = crypto.randomUUID();

          await file.save(fileBuffer, {
            metadata: {
              contentType: mimeType,
              metadata: {
                firebaseStorageDownloadTokens: downloadToken
              }
            }
          });

          try {
            await file.makePublic();
          } catch (e) {
            // ignore
          }

          downloadUrl = `https://firebasestorage.googleapis.com/v0/b/${bucketName}/o/${encodeURIComponent(destination)}?alt=media&token=${downloadToken}`;
        }

        const cleanedProductName = cleanName(fileName);
        const sku = generateSKU();

        const productData = {
          name: cleanedProductName,
          sku: sku,
          category: selectedCategoryId,
          categoryType: selectedType,
          silverWeight: '',
          gender: 'Unisex',
          occasion: 'Everyday Wear',
          desc: '',
          carat: selectedType === 'Gold' ? '22K' : '',
          netWeight: '',
          grossWeight: '',
          weight: '',
          productDimensions: '',
          metalColor: selectedType === 'Gold' ? 'Yellow Gold' : selectedType === 'Silver' ? 'Silver' : 'Yellow Gold',
          diamondShape: '',
          diamondWeight: '',
          diamondColor: '',
          diamondClarity: '',
          diamondCut: '',
          diamondQuantity: '',
          diamondValue: '',
          stoneCarat: '',
          beadsCarat: '',
          pearlsCarat: '',
          gemstoneCarat: '',
          polki: '',
          polkiValue: '',
          pearlsValue: '',
          discountOffDiamond: '',
          price: '',
          hallmark: 'BIS 916 Government Certified',
          makingCharges: '',
          discountPercent: 20,
          discountOffMaking: '',
          gstPercent: 3,
          badge: '',
          stockStatus: 'In Stock',
          img: downloadUrl,
          subImages: [],
          ringSizes: [],
          bangleSizes: [],
          chainSizes: [],
          createdDate: new Date().toISOString()
        };

        await db.collection('products').add(productData);
        console.log(`   Success: Created product "${cleanedProductName}" with SKU "${sku}"`);
      } catch (err) {
        console.error(`   Error uploading ${fileName}:`, err.message);
      }
    }

    console.log('\nBulk upload complete!');
  } catch (err) {
    console.error('Fatal Error:', err);
    rl.close();
  }
}

main();
