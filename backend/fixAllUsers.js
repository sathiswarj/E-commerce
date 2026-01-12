import mongoose from 'mongoose';
import connectDB from './config/mongodb.js';

const fixAllUsers = async () => {
  try {
    await connectDB();
    
    const result = await mongoose.connection.db.collection('users').updateMany(
      { $or: [
        { cartData: { $exists: false } },
        { cartData: { $type: 'object', $not: { $type: 'array' } } }
      ]},
      { $set: { cartData: [] } }
    );
    
    console.log(`Fixed ${result.modifiedCount} user(s)`);
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
};

fixAllUsers();