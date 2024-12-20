import mongoose from "mongoose";

const userLoginHistorySchema = new mongoose.Schema({
    // User identification
    userEmail: {
        type: String,
        required: [true, 'User email is required'],
        trim: true,
        lowercase: true,
        // Index for faster queries when searching by email
        index: true
    },

    // Login timestamp
    loginTime: {
        type: Date,
        required: [true, 'Login time is required'],
        default: Date.now
    },

    // Logout timestamp - can be null if session is still active
    logoutTime: {
        type: Date,
        default: null
    },

    // JWT token used for this session
    jwtToken: {
        type: String,
        required: [true, 'JWT token is required'],
        // Index for quick token lookups during validation
        index: true
    },

    // Forced logout flag
    forcedLogout: {
        type: Boolean,
        default: false,
        required: true
    },

    // Additional metadata about the session
    metadata: {
        // IP address of the client
        ipAddress: {
            type: String,
            trim: true
        },
        // User agent string from the browser
        userAgent: {
            type: String,
            trim: true
        },
        // Device type (mobile, desktop, tablet)
        deviceType: {
            type: String,
            trim: true
        }
    }
}, {
    // Enable timestamps to track record creation and updates
    timestamps: true,
    
    // Collection name in MongoDB
    collection: 'sp_user_login_history'
});

// Create a compound index on userEmail and loginTime for efficient querying
userLoginHistorySchema.index({ userEmail: 1, loginTime: -1 });

// Method to create a new login record
userLoginHistorySchema.statics.createLoginRecord = async function(userEmail, jwtToken, metadata = {}) {
    return await this.create({
        userEmail,
        jwtToken,
        metadata
    });
};

// Method to update logout time
userLoginHistorySchema.statics.updateLogoutTime = async function(jwtToken, forced = false) {
  try {
      console.log('Updating logout time for token:', jwtToken);
      
      const record = await this.findOneAndUpdate(
          { jwtToken, logoutTime: null }, // Only update if not already logged out
          { 
              $set: {
                  logoutTime: new Date(),
                  forcedLogout: forced
              }
          },
          { 
              new: true,
              runValidators: true
          }
      );

      console.log('Updated login history record:', record);
      return record;
  } catch (error) {
      console.error('Error updating logout time:', error);
      throw error;
  }
};
const UserLoginHistory = mongoose.model('UserLoginHistory', userLoginHistorySchema);

export default UserLoginHistory;