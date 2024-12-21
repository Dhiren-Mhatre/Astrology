import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide name"],
      minlength: 3,
      maxlength: 50,
    },
    email: {
      type: String,
      minlength: 3,
      maxlength: 50,
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Please provide a valid email",
      ],
      validate: {
        validator: function(v) {
          return v === undefined || v === null || v.length > 0;
        }
      }
    },
    phoneNumber: {
      type: String,
      required: [true, "Please provide phone number"],
      minlength: 10,
      maxlength: 15,
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please provide password"],
      minlength: 3,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    gender: {
      type: String,
      enum: ['male', 'female', 'other'],
    },
    dateOfBirth: {
      type: Date,
    },
    timeOfBirth: {
      type: String,
    },
    birthPlace: {
      type: String,
      maxlength: 100,
    }
  },
  {
    collection: "sp_user_master",
    timestamps: true
  }
);

// Hash password before saving
UserSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});
UserSchema.index({ email: 1 }, { sparse: true });

UserSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

export default mongoose.model("User", UserSchema);
 

// Update OTP Schema
const OTPSchema = new mongoose.Schema({
  phoneNumber: {
    type: String,
    required: true,
  },
  otp: {
    type: String,
    required: true,
  },
  transactionId: {
    type: String,
    required: true,
    unique: true
  },
  status: {
    type: String,
    enum: ['pending', 'verified', 'expired'],
    default: 'pending'
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: undefined // Remove TTL
  }
}, {
  collection: 'otp',
  timestamps: true,
  capped: false // Ensure collection is not capped
});

// Drop existing TTL index if exists
mongoose.connection.on('connected', async () => {
  try {
    await mongoose.connection.db.collection('otp').dropIndex('createdAt_1');
  } catch (err) {
    // Index might not exist, ignore error
  }
});

// Add regular indexes without TTL
OTPSchema.index({ transactionId: 1 });
OTPSchema.index({ phoneNumber: 1 });
OTPSchema.index({ status: 1 });
export const OTP = mongoose.model('OTP', OTPSchema);