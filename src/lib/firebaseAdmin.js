import admin from "firebase-admin";
import dotenv from 'dotenv';

// Carregar as variáveis de ambiente do arquivo .env
dotenv.config();

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert({
            projectId: process.env.FIREBASE_PROJECT_ID,
            clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
            privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
        }),
        storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    });
}

const auth = admin.auth();
const db = admin.firestore();

export { auth, db };
