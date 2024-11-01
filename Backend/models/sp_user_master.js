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
      required: [true, "Please provide email"],
      minlength: 3,
      maxlength: 50,
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Please provide a valid email",
      ],
      unique: true,
    },
    phoneNumber: {
      type: String,
      required: [true, "Please provide phone number"],
      minlength: 10,
      maxlength: 15,
    },
    password: {
      type: String,
      required: [true, "Please provide password"],
      minlength: 3,
    },
  },
  { 
    collection: "sp_user_master", 
    timestamps: true // Adds createdAt and updatedAt fields
  }
);

// Hash password before saving
UserSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Define comparePassword as a method
UserSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

export default mongoose.model("User", UserSchema); // Ensure this matches how you import it in the controller
