// src/server.js
require('dotenv').config(); // load env FIRST

const fs = require('fs');
const http = require('http');
const https = require('https');
const mongoose = require('mongoose');
const path = require('path');
const app = require('./app');

const PORT = process.env.PORT || 5000;

const MONGO_URI = process.env.MONGO_URI || process.env.MONGODB_URI;

if (!MONGO_URI) {
  console.error('Missing Mongo connection string. Set MONGO_URI (or MONGODB_URI) in .env');
  process.exit(1);
}

// SSL Configuration
const keyPath = path.join(__dirname, '..', 'ssl', 'privatekey.pem');
const certPath = path.join(__dirname, '..', 'ssl', 'certificate.pem');

let serverFactory;
let protoLabel;

if (fs.existsSync(keyPath) && fs.existsSync(certPath)) {
  const sslOptions = {
    key: fs.readFileSync(keyPath),
    cert: fs.readFileSync(certPath),
  };
  serverFactory = () => https.createServer(sslOptions, app);
  protoLabel = 'https';
} else {
  serverFactory = () => http.createServer(app);
  protoLabel = 'http';
  console.warn('SSL certs not found in ./ssl; starting HTTP server for development.');
}

// Connect to MongoDBand start the https server
(async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('MongoDB connected');

    const server = serverFactory();
    server.listen(PORT, () => {
      console.log(`Server running at ${protoLabel}://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('MongoDB connection error:', err && err.message ? err.message : err);
    process.exit(1);
  }
})();  




