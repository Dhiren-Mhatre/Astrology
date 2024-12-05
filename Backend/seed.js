import mongoose from "mongoose";
import Category from "./models/sp_category_master.js"; // Adjust the path accordingly
import dotenv from "dotenv";
import Astrologer from "./models/sp_astrologer_master.js";
import Banner from "./models/sp_banner_master.js";
 
 
 
import Language from "./models/sp_language_master.js";
import Expertise from "./models/sp_expertise_master.js";
import Status from "./models/sp_status_master.js";

dotenv.config();
// const connectToDatabase = async () => {
//   try {
//     await mongoose.connect(process.env.MONGO_URL);
//     console.log("MongoDB connected");
//   } catch (error) {
//     console.error("MongoDB connection error:", error);
//     process.exit(1);
//   }
// };


const languages = [
  { id: 1, value: "English" },
  { id: 2, value: "Hindi" },
  { id: 3, value: "Gujarati" },
  { id: 4, value: "Marathi" },
  { id: 5, value: "Tamil" },
  { id: 6, value: "Telugu" },
  { id: 7, value: "Kannada" },
  { id: 8, value: "Malayalam" },
  { id: 9, value: "Bengali" },
  { id: 10, value: "Punjabi" },
];

const expertises = [
  { id: 1, value: "Vedic" },
  { id: 2, value: "Numerology" },
  { id: 3, value: "KP System" },
  { id: 4, value: "Lal Kitab" },
  { id: 5, value: "Horary" },
  { id: 6, value: "Vastu" },
  { id: 7, value: "Tarot Reading" },
  { id: 8, value: "Love Life" },
  { id: 9, value: "Nadi" },
  { id: 10, value: "Marriage Compatibility" },
  { id: 11, value: "Ashtakavarga" },
  { id: 12, value: "Palmistry" },
  { id: 13, value: "Ramal" },
  { id: 14, value: "Jaimini" },
  { id: 15, value: "Tajik" },
  { id: 16, value: "Western" },
  { id: 17, value: "South Astrology" },
  { id: 18, value: "Ravan Sahita" },
  { id: 19, value: "Swar Shastra" },
  { id: 20, value: "Reiki" },
  { id: 21, value: "Crystal Healing" },
  { id: 22, value: "Angel Reading" },
  { id: 23, value: "Pendulam Dowsing" },
  { id: 24, value: "Psychic Reading" },
  { id: 25, value: "Face Reading" },
  { id: 26, value: "Muhurat" },
];

const statuses = [
  { id: 0, value: "disable" },
  { id: 1, value: "online" },
  { id: 2, value: "offline" },
  { id: 3, value: "busy" },
  { id: 4, value: "on break" },
];

export const seedCollections = async () => {
  try {
    await Language.deleteMany();
    const insertedLanguages = await Language.insertMany(languages);
    
    await Expertise.deleteMany();
    const insertedExpertises = await Expertise.insertMany(expertises);
    
    await Status.deleteMany();
    const insertedStatuses = await Status.insertMany(statuses);

    console.log("Languages, Expertises, and Statuses seeded successfully");
  } catch (error) {
    console.error("Error seeding data:", error);
  }
}

const astrologers = [
  {
    name: "Tarot Jaya",
    expertise: ["Tarot Reading"],
    language: ["Hindi", "English"],
    experience: 6,
    minRate: 30,
    discountedRate: 20,
    imgLink: "https://astrology.mangalbhawan.com/public/images/IMG-20240810-WA0008.jpg",
    rating: 5.0,
    ratingCount: 1,
    followers: 1,
    status: "online",
  },
  {
    name: "Acharya Nitesh",
    expertise: ["Muhurat", "Marriage Matching"],
    language: ["Hindi", "English"],
    experience: 6,
    minRate: 15,
    discountedRate: 10,
    imgLink: "https://astrology.mangalbhawan.com/public/images/Acharya-Nitesh-Tripathi-.jpg",
    rating: 5.0,
    ratingCount: 30,
    followers: 30,
    status: "online",
  },
  {
    name: "Acharya Palak",
    expertise: ["Muhurat", "Face Reading", "Crystal Healing"],
    language: ["Hindi"],
    experience: 12,
    minRate: 20,
    discountedRate: 9,
    imgLink: "https://astrology.mangalbhawan.com/public/images/Acharya%20Palaka.jpg",
    rating: 4.9,
    ratingCount: 94,
    followers: 13,
    status: "online",
  },
  {
    name: "Acharya Satyam",
    expertise: ["Muhurat", "Ravan Sahita", "Tajik"],
    language: ["Punjabi", "Gujarati", "Hindi"],
    experience: 10,
    minRate: 20,
    discountedRate: 11,
    imgLink: "https://astrology.mangalbhawan.com/public/images/Acharya-Satyam.jpg",
    rating: 5.0,
    ratingCount: 8,
    followers: 20,
    status: "online",
  },
  {
    name: "Jothidar Arun",
    expertise: ["Face Reading", "South Astrology"],
    language: ["Tamil", "English"],
    experience: 10,
    minRate: 40,
    discountedRate: 35,
    imgLink: "https://astrology.mangalbhawan.com/public/images/Acharya-Arun%20(1).jpg",
    rating: 0.0,
    ratingCount: 0,
    followers: 0,
    status: "online",
  },
  {
    name: "Acharya Ashtha",
    expertise: ["Vedic", "Vastu", "Ravan Sahita"],
    language: ["Hindi"],
    experience: 9,
    minRate: 18,
    discountedRate: 15,
    imgLink: "https://astrology.mangalbhawan.com/public/images/Acharya%20Aastha.jpg",
    rating: 5.0,
    ratingCount: 380,
    followers: 171,
    status: "online",
  },
  {
    name: "Acharya Shivam",
    expertise: ["Vedic"],
    language: ["Hindi"],
    experience: 18,
    minRate: 22,
    discountedRate: 15,
    imgLink: "https://astrology.mangalbhawan.com/public/images/Acharya%20Shivame.jpg",
    rating: 5.0,
    ratingCount: 121,
    followers: 150,
    status: "online",
  },
  {
    name: "Acharya Madhusudan",
    expertise: ["Muhurat", "Marriage Matching"],
    language: ["Hindi"],
    experience: 7,
    minRate: 20,
    discountedRate: 9,
    imgLink: "https://astrology.mangalbhawan.com/public/images/Acharya%20Madhusudane.jpg",
    rating: 5.0,
    ratingCount: 160,
    followers: 68,
    status: "online",
  },
  {
    name: "Acharya Dinanath",
    expertise: ["Marriage Matching", "Love Life"],
    language: ["Hindi"],
    experience: 12,
    minRate: 30,
    discountedRate: 9,
    imgLink: "https://astrology.mangalbhawan.com/public/images/Acharya%20Dinanath.jpeg",
    rating: 5.0,
    ratingCount: 73,
    followers: 2,
    status: "online",
  },
];

export const seedAstrologers = async () => {
  try {
    await Astrologer.deleteMany();

    const languagesMap = {};
    const expertisesMap = {};
    const statusMap = {};

    const languageDocs = await Language.find();
    languageDocs.forEach((lang) => {
      languagesMap[lang.value] = lang._id;  // Use _id for ObjectId
    });

    const expertiseDocs = await Expertise.find();
    expertiseDocs.forEach((exp) => {
      expertisesMap[exp.value] = exp._id;  // Use _id for ObjectId
    });

    const statusDocs = await Status.find();
    statusDocs.forEach((status) => {
      statusMap[status.value] = status._id;  // Use _id for ObjectId
    });

    const astrologersWithRefs = astrologers.map((astrologer) => ({
      ...astrologer,
      language: astrologer.language.map((lang) => languagesMap[lang]),
      expertise: astrologer.expertise.map((exp) => expertisesMap[exp]),
      status: statusMap[astrologer.status],
    }));

    await Astrologer.insertMany(astrologersWithRefs);

    console.log("Astrologers seeded successfully");
  } catch (error) {
    console.error("Error seeding astrologers:", error);
  }
};

const categories = [
  {
    name: "Agarbatti",
    img: "https://mangalbhawan.com/public/uploads/all/koMeQgkJKwol56S5C7FQOse0EP7ZigRekCCd0PAi.png",
    shopifyId: "1001",
    shopifyPage: "https://n21fga-ce.myshopify.com/",
    description: "Fragrant sticks made from natural ingredients.",
  },
  {
    name: "Dry Dhoop Cones",
    img: "https://mangalbhawan.com/public/uploads/all/6kyM2qiBtCiJcj6pAtFLWWkh17Rq8SYrJ2HZvt8Q.png",
    shopifyId: "1002",
    shopifyPage: "https://n21fga-ce.myshopify.com/",
    description: "Cones made of natural herbs for spiritual rituals.",
  },
  {
    name: "Dhoop Sticks",
    img: "https://mangalbhawan.com/public/uploads/all/GrWgdpKp2N3k7WFK5PkhyF5TQqJzCUQX4SMcQC7d.png",
    shopifyId: "1003",
    shopifyPage: "https://n21fga-ce.myshopify.com/",
    description: "Sticks that release aromatic smoke when burned.",
  },
  {
    name: "Sambrani Cups",
    img: "https://mangalbhawan.com/public/uploads/all/Qqfz1wTztcHWQCCsyQkIsIQeHxnBu75P1wqwlqig.png",
    shopifyId: "1004",
    shopifyPage: "https://n21fga-ce.myshopify.com/",
    description: "Traditional cups used for burning sambrani.",
  },
  {
    name: "Camphor",
    img: "https://mangalbhawan.com/public/uploads/all/cT1wrDRj9he9QMR9iXcS9lY5AwNwWNTqjGNcWFEi.jpg",
    shopifyId: "1005",
    shopifyPage: "https://n21fga-ce.myshopify.com/",
    description: "Pure camphor for a soothing aroma.",
  },
  {
    name: "Puja Kit",
    img: "https://mangalbhawan.com/public/uploads/all/v7rEOFAqbBBzEvwFRNPBT9s68XyZlRWcQ5TqUlzq.png",
    shopifyId: "1006",
    shopifyPage: "https://n21fga-ce.myshopify.com/",
    description: "Complete kit for conducting puja rituals.",
  },
  {
    name: "Puja Accessories",
    img: "https://mangalbhawan.com/public/uploads/all/P2O5EvSUp1BuzxbLE03vi36psO96ZYnsW1qZB8tG.png",
    shopifyId: "1007",
    shopifyPage: "https://n21fga-ce.myshopify.com/",
    description: "Essential items for puja ceremonies.",
  },
  {
    name: "Cow Dung Products",
    img: "https://mangalbhawan.com/public/uploads/all/v9J6fXFh9RLQ14swrIeSFegegJVCtHvLTKqFhzZ0.png",
    shopifyId: "1008",
    shopifyPage: "https://n21fga-ce.myshopify.com/",
    description: "Eco-friendly products made from cow dung.",
  },
  {
    name: "Diyas",
    img: "https://mangalbhawan.com/public/uploads/all/MMltKiKeri7gUl0C329t1TqgIn8Bx6IXlfrjA4NQ.png",
    shopifyId: "1009",
    shopifyPage: "https://n21fga-ce.myshopify.com/",
    description: "Traditional oil lamps for lighting during festivals.",
  },
  {
    name: "Malas",
    img: "https://mangalbhawan.com/public/uploads/all/CP6lfjVH9jBsK4PUrAVCKe4wOKlKNcDsGZ53EFeI.png",
    shopifyId: "1010",
    shopifyPage: "https://n21fga-ce.myshopify.com/",
    description: "Prayer beads used in meditation.",
  },
  {
    name: "Festival Articles",
    img: "https://mangalbhawan.com/public/uploads/all/JS0ag6zW5txxFwtXCvsSFtsAKapcQK8ed4rTFKlu.png",
    shopifyId: "1011",
    shopifyPage: "https://n21fga-ce.myshopify.com/",
    description: "Items to enhance festive celebrations.",
  },
  {
    name: "Diwali",
    img: "https://mangalbhawan.com/public/uploads/all/6HgLLh1CB9GRgWPNT5IwBIHDKx7ohK1GvrJfrXrL.jpg",
    shopifyId: "1012",
    shopifyPage: "https://n21fga-ce.myshopify.com/",
    description: "Special products for the Diwali festival.",
  },
 
  {
    name: "Hawan Samagri",
    img: "https://mangalbhawan.com/public/uploads/all/JVz8IAvDm8pK5dj4dDAD4KUJT5ao49lsiVw6GU3M.png",
    shopifyId: "1014",
    shopifyPage: "https://n21fga-ce.myshopify.com/",
    description: "Materials for conducting hawan rituals.",
  },
   
  {
    name: "Gemstones",
    img: "https://res.cloudinary.com/dguy5exjy/image/upload/v1732622013/your-cloudinary-folder-name/z37laegcyfighiuc6bjv.jpg",
    shopifyId: "1016",
    shopifyPage: "https://n21fga-ce.myshopify.com/",
    description: "Authentic gemstones to bring balance and harmony.",
  },
  {
    name: "Idols",
    img: "https://res.cloudinary.com/dguy5exjy/image/upload/v1732620725/your-cloudinary-folder-name/tds7j7071o2omf9c0dez.jpg",
    shopifyId: "1017",
    shopifyPage: "https://n21fga-ce.myshopify.com/",
    description: "Beautiful idols for worship and decoration.",
  },
  {
    name: "Puja Samagri",
    img: "https://res.cloudinary.com/dguy5exjy/image/upload/v1732620735/your-cloudinary-folder-name/rcurk3wsdnlvdukuabdl.png",
    shopifyId: "1018",
    shopifyPage: "https://n21fga-ce.myshopify.com/",
    description: "Comprehensive items for your puja needs.",
  },
  {
    name: "Pujas",
    img: "https://res.cloudinary.com/dguy5exjy/image/upload/v1732622473/your-cloudinary-folder-name/t3q4frd3psb2tt14hq67.png",
    shopifyId: "1019",
    shopifyPage: "https://n21fga-ce.myshopify.com/",
    description: "Offerings and rituals for divine blessings.",
  },
  {
    name: "Rudraksha",
    img: "https://res.cloudinary.com/dguy5exjy/image/upload/v1732620741/your-cloudinary-folder-name/pkua8xd11scocdt5imxm.jpg",
    shopifyId: "1020",
    shopifyPage: "https://n21fga-ce.myshopify.com/",
    description: "Sacred beads for spiritual well-being.",
  },
];
// Function to seed categories
export const seedCategories = async () => {
  try {
    // Delete existing categories
    await Category.deleteMany();

    // Insert new categories
    await Category.insertMany(
      categories.map((category) => ({
        name: category.name,
        description: category.description, // Added unique description
        imgLink: category.img,
        active: true, // Active by default
        shopifyId: category.shopifyId, // Add shopifyId
        shopifyPage: category.shopifyPage, // Add shopifyPage
      }))
    );

    console.log("Categories seeded successfully");
  } catch (error) {
    console.error("Error seeding categories:", error);
    mongoose.connection.close(); // Close the connection in case of an error
  }
};

// seedAstrologers();
const banners = [
  {
    name: "ingredients",
    imgLink:
      "https://mangalbhawan.com/public/uploads/all/HzuB0VwXGfdmoZqwVlpRb521nlFvPj6MPqSO8L6G.jpg",
    active: true,
    sequenceNo: 1,
  },
  {
    name: "horroscope",
    imgLink:
      "https://mangalbhawan.com/public/uploads/all/fuYLyvGDXDt0H4IhXWB3gltXC7QB83szKvJv2jTO.jpg",
    active: true,
    sequenceNo: 2,
  },
  {
    name: "astrology-consultation",
    imgLink:
      "https://mangalbhawan.com/public/uploads/all/iuXG8G0sTJWtq7LGd9bHrU7b3MpYm6Bumd2Nn8qj.jpg",
    active: true,
    sequenceNo: 3,
  },
  {
    name: "pitruPaksha",
    imgLink:
      "https://mangalbhawan.com/public/uploads/all/uQ9nHrpfz6My9Chfi7Z6lxqqZLGNsH03YRoGmmBc.jpg",
    active: true,
    sequenceNo: 4,
  },
];

export const seedbanners = async () => {
  try {
    await Banner.deleteMany();
    await Banner.insertMany(banners.map((banner) => ({ ...banner })));
    console.log("banners seeded successfully");
  } catch (error) {
    console.error("Error seeding banners:", error);
    mongoose.connection.close();
  }
};
 