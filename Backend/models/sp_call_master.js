import mongoose from "mongoose";

const callSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  astrologer_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "sp_astrologer_master",
    required: true,
  },
  date_of_call: {
    type: Date,
    default: Date.now,
  },
  call_duration: {
    type: Number,
    required: true,
  },
  flag_free_paid_call: {
    type: String,
    enum: ["free", "paid"],
    default: "free",
  },
}, { 
  timestamps: true, 
  collection: "sp_call_history",
});

const Call = mongoose.model("sp_call_history", callSchema);
export default Call;
  