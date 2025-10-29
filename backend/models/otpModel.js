import mongoose from 'mongoose';

const otpSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true
  },
  otp: {
    type: String,
    required: true
  },
  expiresAt: {
    type: Date,
    required: true,
    index: { expires: 0 }  
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

 otpSchema.index({ email: 1, expiresAt: 1 });

const otpModel = mongoose.models.otps || mongoose.model('otps', otpSchema);

export default otpModel;