// File: controllers/astrologerController.js

import Astrologer from "../models/sp_astrologer_master.js";
import Expertise from "../models/sp_expertise_master.js";
import Language from "../models/sp_language_master.js";
export const getAllAstrologers = async (req, res) => {
  try {
    const astrologer = await Astrologer.find()
      .populate("language", "value") // Populates language field with 'value'
      .populate("expertise", "value"); // Populates expertise field with 'value'

    if (!astrologer) return res.status(404).json("Astrologer not found");

    res.status(200).json(astrologer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAstrologerById = async (req, res) => {
  try {
    const { astrologerId } = req.params;
    const astrologer = await Astrologer.findById(astrologerId)
      .populate("language", "value") // Populates language field with 'value'
      .populate("expertise", "value"); // Populates expertise field with 'value'

    if (!astrologer) return res.status(404).json("Astrologer not found");

    res.status(200).json(astrologer);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};
export const filterAstrologers = async (req, res) => {
  try {
    const { languages, expertise } = req.body;

    console.log('Received filters:', { languages, expertise });

    const query = {};

    // Convert language values to ObjectIds
    if (languages && languages.length > 0) {
      const languageObjects = await Language.find({ value: { $in: languages } });
      const languageIds = languageObjects.map(lang => lang._id);
      query.language = { $in: languageIds };
    }

    // Convert expertise values to ObjectIds
    if (expertise && expertise.length > 0) {
      const expertiseObjects = await Expertise.find({ value: { $in: expertise } });
      const expertiseIds = expertiseObjects.map(exp => exp._id);
      query.expertise = { $in: expertiseIds };
    }

    console.log('Generated query:', query);

    // Find astrologers using the dynamically built query
    const astrologers = await Astrologer.find(query)
      .populate("language", "value")
      .populate("expertise", "value");

    console.log('Filtered astrologers:', astrologers.length);

    return res.status(200).json(astrologers);
  } catch (error) {
    console.error('Filter error:', error);
    res.status(500).json({ message: error.message });
  }
};