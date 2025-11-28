// firebase/firebaseadmin.js

import * as admin from 'firebase-admin';

// The private key replacement is required because the \n in .env is literal.
const privateKey = process.env.FIREBASE_ADMIN_PRIVATE_KEY;

if (!admin.apps.length) {
    if (!privateKey) {
        // Log an error if the key is missing before trying to use .replace()
        console.error("FATAL: FIREBASE_ADMIN_PRIVATE_KEY is missing or undefined.");
        // Depending on your deployment, you might throw an error or handle it here
    }

    admin.initializeApp({
        credential: admin.credential.cert({
            projectId: process.env.FIREBASE_ADMIN_PROJECT_ID,
            clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
            // Only use .replace() if the key exists
            privateKey: privateKey ? privateKey.replace(/\\n/g, '\n') : undefined,
        }),
    });
}

// Ensure you have run: npm install firebase-admin @opentelemetry/api
export const db = admin.firestore();
