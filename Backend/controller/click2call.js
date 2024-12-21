// controllers/click2call.js
import Click2CallConfig from "../models/sp_click2call_config_master.js";

export const getConfig = async (req, res) => {
    try {
        const config = await Click2CallConfig.getConfig();
        return res.status(200).json({ success: true, config });
    } catch (error) {
        console.error("Error fetching click2call config:", error);
        return res.status(500).json({ 
            success: false, 
            message: "Error fetching configuration",
            error: error.message 
        });
    }
};
const removeCountryCode = (number) => {
    return number.replace(/^\+?91/, '');
  };
  
  export const initiateClick2Call = async (req, res) => {
      try {
        const { customerNumber, astrologerNumber } = req.body;
        
        // Clean number for UID
        const cleanNumber = removeCountryCode(customerNumber);
        
        const now = new Date();
        const uid = now.getFullYear().toString().slice(-2) + 
                    (now.getMonth() + 1).toString().padStart(2, '0') +
                    now.getDate().toString().padStart(2, '0') +
                    now.getHours().toString().padStart(2, '0') +
                    now.getMinutes().toString().padStart(2, '0') +
                    now.getSeconds().toString().padStart(2, '0') +
                    now.getMilliseconds().toString().padStart(3, '0') +
                    cleanNumber;
    
        const config = await Click2CallConfig.getConfig();
        
      const apiUrl = `https://indiavoice.rpdigitalphone.com/api/click_to_call_v2?calling_party_a=${customerNumber}&calling_party_b=${astrologerNumber}&deskphone=${config.deskphone}&authcode=${config.authcode}&call_from_did=${config.call_from_did}&waittime=${config.waittime}&calling_party_a_type=customer&CallLimit=${config.calllimit}&uid=${uid}`;
  
      const response = await fetch(apiUrl);
      const data = await response.json();
  
      res.status(200).json({
        success: true,
        data,
        uid,
        redirectUrl: apiUrl // Include the URL for redirection
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
};
export const updateConfig = async (req, res) => {
    try {
        const config = await Click2CallConfig.findOne();
        if (!config) {
            return res.status(404).json({
                success: false,
                message: "Configuration not found"
            });
        }

        // Update only provided fields
        const updateFields = {};
        ['authcode', 'calllimit', 'deskphone', 'call_from_did', 'waittime'].forEach(field => {
            if (req.body[field] !== undefined) {
                updateFields[field] = req.body[field];
            }
        });

        const updatedConfig = await Click2CallConfig.findByIdAndUpdate(
            config._id,
            updateFields,
            { new: true, runValidators: true }
        );

        return res.status(200).json({
            success: true,
            message: "Configuration updated successfully",
            config: updatedConfig
        });
    } catch (error) {
        console.error("Error updating click2call config:", error);
        return res.status(500).json({
            success: false,
            message: "Error updating configuration",
            error: error.message
        });
    }
};

export const resetConfig = async (req, res) => {
    try {
        const config = await Click2CallConfig.findOne();
        if (config) {
            await Click2CallConfig.deleteOne({ _id: config._id });
        }
        const newConfig = await Click2CallConfig.create({});
        
        return res.status(200).json({
            success: true,
            message: "Configuration reset to defaults",
            config: newConfig
        });
    } catch (error) {
        console.error("Error resetting click2call config:", error);
        return res.status(500).json({
            success: false,
            message: "Error resetting configuration",
            error: error.message
        });
    }
};