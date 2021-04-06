import * as admin from 'firebase-admin'
import * as path from 'path';

const serviceJson =
  process.env.NODE_ENV == 'production'
    ? path.resolve(process.cwd(), 'config-prod-firebase.json')
    : path.resolve(process.cwd(), 'config-dev-firebase.json');

const todoAdmin = admin.initializeApp({
  credential: admin.credential.cert(serviceJson),
});

const db = todoAdmin.firestore()

export { todoAdmin, db }