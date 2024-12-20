// models/sp_click2call_config_master.js
import mongoose from "mongoose";

const Click2CallConfigSchema = new mongoose.Schema({
    authcode: {
        type: String,
        required: [true, "Auth code is required"],
        default: "719b511f91b3c25ccf4871ce684e069"
    },
    calllimit: {
        type: Number,
        required: [true, "Call limit is required"],
        default: 60,
        min: 0
    },
    deskphone: {
        type: String,
        required: [true, "Desk phone is required"],
        default: "00917316835977"
    },
    call_from_did: {
        type: Number,
        required: [true, "Call from DID is required"],
        default: 1
    },
    waittime: {
        type: Number,
        required: [true, "Wait time is required"],
        default: 30,
        min: 0
    }
}, {
    collection: "sp_click2call_config_master",
    timestamps: true
});

// Ensure only one configuration document exists
Click2CallConfigSchema.statics.getConfig = async function() {
    const config = await this.findOne();
    if (config) return config;
    return await this.create({});  // Create with default values if none exists
};

export default mongoose.model("Click2CallConfig", Click2CallConfigSchema);