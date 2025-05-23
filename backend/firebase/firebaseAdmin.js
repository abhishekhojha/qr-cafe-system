require('dotenv').config();
const admin = require('firebase-admin');

admin.initializeApp({
  credential: admin.credential.cert({
    projectId: process.env.GOOGLE_PROJECT_ID,
    privateKeyId: process.env.GOOGLE_PRIVATE_KEY_ID,
    privateKey: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    clientEmail: process.env.GOOGLE_CLIENT_EMAIL,
    clientId: process.env.GOOGLE_CLIENT_ID,
    authUri: process.env.GOOGLE_AUTH_URI,
    tokenUri: process.env.GOOGLE_TOKEN_URI,
    authProviderX509CertUrl: process.env.GOOGLE_AUTH_PROVIDER_CERT_URL,
    clientX509CertUrl: process.env.GOOGLE_CLIENT_CERT_URL,
  }),
});

const db = admin.firestore();

module.exports = { admin, db };
