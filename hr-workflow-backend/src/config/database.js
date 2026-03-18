const mongoose = require('mongoose');
const { mongodbUri } = require('./env');

const connectDatabase = async () => {
  try {
    const conn = await mongoose.connect(mongodbUri);
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDatabase;
