const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Admin = require('../models/Admin');

dotenv.config();

const seedAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    console.log('MongoDB Connected...');
    
    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email: 'admin@ekprayas.com' });
    
    if (existingAdmin) {
      console.log('⚠️  Admin user already exists!');
      process.exit(0);
    }
    
    // Create default admin
    const admin = await Admin.create({
      name: 'Admin',
      email: 'admin@ekprayas.com',
      password: 'admin123',
      role: 'super-admin'
    });
    
    console.log('✅ Admin user created successfully!');
    console.log('📧 Email: admin@ekprayas.com');
    console.log('🔑 Password: admin123');
    console.log('⚠️  Please change this password after first login!');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
};

seedAdmin();
