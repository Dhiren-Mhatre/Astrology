// /home/dhiren-mhatre/code/digifuture/Astrology/Backend/models/sp_astrologer_master.js
import mongoose from "mongoose";

const astrologerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    expertise: [{ type: mongoose.Schema.Types.ObjectId, ref: "sp_expertise_master" }],
    language: [{ type: mongoose.Schema.Types.ObjectId, ref: "sp_language_master" }],
    experience: { type: Number },
    minRate: { type: Number },
    discountedRate: { type: Number },
    imgLink: { type: String, required: true },
    rating: { type: Number },
    ratingCount: { type: Number, default: 0 },
    followers: { type: Number },
    about: { type: String, default: "Humans are bound to have restrictions when it comes to acquiring knowledge. While most of us are trying to break these barriers, only some of us can only overcome them and make it to the other end. Such individuals are considered the best in the field and have immense knowledge of everything they are indulged in. So, when it comes to astrology, we have handpicked the experts who are the best in their field and know everything about the art of stars and Lords. One such astrologer is Acharya Vandana. She is an astrologer with 8 years of experience in Vedic, Lal Kitab, KP System, Nadi, Ashtakvarga, Ravan Samhita, Jaimini, Palmistry, Tajik, Ramal, and Western Astrology. She also has expertise in Vaastu Shastra, Tarot Reading, Numerology, Palmistry, & Marriage Making. Acharya Vandana helps people with her remarkable experience and knowledge in astrology to solve various problems and guide them on the right path. She speaks in native Hindi but is also fluent in English & Punjabi. She is an ideal astrologer, recognized by Magazines & top online platforms. Thus, pick up your phone and click on the call button to talk to Acharya Vandana about everything and anything within the budget you always dreamt of." }, // New field added
    status: { type: mongoose.Schema.Types.ObjectId, ref: "sp_status_master" },
    contactNumber: { type: Number, default: 9811651035 }, // New field added
  
  },
  {
    collection: "sp_astrologer_master",
    timestamps: { updatedAt: true, createdAt: false },
  }
);

const Astrologer = mongoose.model("sp_astrologer_master", astrologerSchema);
export default Astrologer;
