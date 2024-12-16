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
    name: "Astrologer Dhirendra Shastri",
    expertise: ["Vedic", "Vastu", "Marriage Matching", "Love Life"],
    language: ["Hindi", "English"],
    experience: 8,
    minRate: 30, 
    discountedRate: 20, 
    imgLink: "https://astrology.mangalbhawan.com/public/images/Acharya-Nitesh-Tripathi-.jpg", 
    rating: 4.8,
    ratingCount: 50,
    followers: 100,
    status: "online",
    about: "Acharya Dhirendra Shastri is one of the best Vastu consultants in India. He has 8 years of rich experience in Kundli making, Vedic astrology, Matchmaking, and Face reading. His advice on business, love, and health helps his clients. He loves to communicate and help others through discussion and guidance. The people around him feel very positive due to his communication and guidance. He loves to help people during their difficult and confusing times with his knowledge and experience. He is a firm believer that every problem comes with a solution and knows who needs the right guidance at the right time. Apart from Vedic astrology, he also provides remedies and pujas for Vastu dosha."
  },
  {
    name: "Acharya Shivam",
    expertise: ["Vedic", "Horoscope Reading", "Marriage Matching", "Love Life"],
    language: ["Hindi", "English"],
    experience: 9,
    minRate: 25,
    discountedRate: 15,
    imgLink: "https://astrology.mangalbhawan.com/public/images/Acharya%20Shivame.jpg",
    rating: 4.9,
    ratingCount: 80,
    followers: 150,
    status: "online",
    about: "Acharya Shivam, with more than a decade of experience, is a professional astrologer who gained expertise in Vedic astrology along with other key dimensions such as Horoscope reading, Marriage Matching, Career, Wealth, and Love. A famous astrologer located in Delhi NCR, he provides a qualitative range of astrology services to people. He completed his astrological education at Bhartiya Vidhya Bhawan in Delhi and received his Shastri degree from Sampurnanand University. Acharya Shivam strongly believes that God has chosen a path for everyone and that all of us can find our way in life if we choose the right path. He also believes that while people cannot prevent events, balancing elements can give them strength and power to deal with situations. He guides people using his practice in Vedic astrology to make life easier. So, if you are looking for a spiritual healer, get connected to Acharya Shivam."
  },
  {
    name: "Acharya Prakash",
    expertise: ["Vedic", "Love Life"],
    language: ["Hindi", "English"],
    experience: 6,
    minRate: 20,
    discountedRate: 12,
    imgLink: "https://astrology.mangalbhawan.com/public/images/Acharya%20Madhusudane.jpg",
    rating: 4.7,
    ratingCount: 40,
    followers: 75,
    status: "online",
    about: "Acharya Prakash has been associated with this field for a long time. He has been helping people solve their life problems quickly and effectively. His expertise and proficiency have enabled many individuals to overcome challenges in their lives. Many of his clients are leading happy and successful lives thanks to his accurate predictions and guidance. This explains the large client base he enjoys. Today, he is counted among the premium astrologers in town. He hopes to continue serving people and making their lives easier as he believes everyone deserves to lead a good life."
  },
  {
    name: "Acharya Krishan Pandey",
    expertise: ["Vedic", "Marriage Matching", "Love Life"],
    language: ["Hindi", "English"],
    experience: 4,
    minRate: 22,
    discountedRate: 15,
    imgLink: "https://astrology.mangalbhawan.com/public/images/Acharya%20Dinanath.jpeg",
    rating: 4.6,
    ratingCount: 30,
    followers: 50,
    status: "online",
    about: "Acharya Krishan Pandey is a highly experienced and knowledgeable astrologer with a focus on Vedic astrology. He has been practicing astrology for over half a decade and has helped countless individuals with his insightful and accurate predictions. Acharya Krishan Pandey's passion for astrology began at a young age, and he has since dedicated his life to mastering the complexities of Vedic astrology. He has completed formal education in astrology from a prestigious institution and has continued expanding his knowledge through ongoing study and practice. He deeply understands planetary positions and their effects on different aspects of life, including career, finance, health, and relationships. Get in touch with Acharya Krishan Pandey for more information!"
  },
  {
    name: "Acharya Bhaskar",
    expertise: ["Vedic", "Marriage Matching", "Love Life"],
    language: ["Hindi", "English"],
    experience: 6,
    minRate: 18,
    discountedRate: 10,
    imgLink: "https://astrology.mangalbhawan.com/public/images/Acharya%20Aastha.jpg",
    rating: 4.5,
    ratingCount: 25,
    followers: 60,
    status: "online",
    about: "Acharya Bhaskar has devoted more than half a decade to the study and practice of astrology. His dedication has earned him the title of Vedic Astrology master. His services are of the finest caliber, and his clientele has grown significantly in a short period. Acharya Bhaskar's clients appreciate his ability to address their inquiries effectively. His affordable yet effective remedies have earned him praise and trust. Contact Acharya Bhaskar for assistance if you need help overcoming challenges. He is committed to supporting and guiding people."
  },
  {
    name: "Anupam Bharadwaj",
    expertise: ["Vedic", "Marriage Matching", "Love Life"],
    language: ["Hindi", "English"],
    experience: 20,
    minRate: 40,
    discountedRate: 25,
    imgLink: "https://astrology.mangalbhawan.com/public/images/Acharya%20Madhusudane.jpg",
    rating: 5.0,
    ratingCount: 100,
    followers: 200,
    status: "online",
    about: "Acharya Anupam Bharadwaj is a highly respected and accomplished Vedic astrologer with over two decades of experience. His expertise in Vedic astrology has helped thousands gain insights and guidance on career, relationships, health, and spirituality. He has exceptional skills in analyzing birth charts and interpreting planetary positions. Acharya Anupam Bharadwaj is known for his professionalism, integrity, and compassion. He takes a client-focused approach and connects with clients personally. Contact Acharya Anupam Bharadwaj for more information!"
  },
  {
    name: "Acharya Rahul",
    expertise: ["Vedic", "Marriage Matching", "Love Life"],
    language: ["Hindi", "English"],
    experience: 6,
    minRate: 25,
    discountedRate: 15,
    imgLink: "https://astrology.mangalbhawan.com/public/images/Acharya-Arun%20(1).jpg",
    rating: 4.9,
    ratingCount: 45,
    followers: 90,
    status: "online",
    about: "Acharya Rahul is always ready to help anyone in need and possesses vast knowledge of astrology, including Vedic astrology. Acharya Rahul is a reputed astrologer who has changed many lives through accurate predictions and remedies. He specializes in marriage, career, job, health, and relationships. With 6 years of experience, his precise assessments and practical recommendations have helped many clients achieve their goals. He believes planetary motions are crucial in solving problems and provides guidance to make lives easier."
  }
];

export const seedAstrologers = async () => {
  try {
    await Astrologer.deleteMany();

    const languagesMap = {};
    const expertisesMap = {};
    const statusMap = {};

    const languageDocs = await Language.find();
    languageDocs.forEach((lang) => {
      languagesMap[lang.value] = lang._id;
    });

    const expertiseDocs = await Expertise.find();
    expertiseDocs.forEach((exp) => {
      expertisesMap[exp.value] = exp._id;
    });

    const statusDocs = await Status.find();
    statusDocs.forEach((status) => {
      statusMap[status.value] = status._id;
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
    name: "PanditParmanand",
    imgLink:
      "https://res.cloudinary.com/dguy5exjy/image/upload/v1733844273/your-cloudinary-folder-name/l78uy0nmzwvfivbgnav2.png",
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
 