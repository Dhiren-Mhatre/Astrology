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
    minRate: 30, // Added hypothetical rate
    discountedRate: 20, // Added hypothetical discounted rate
    imgLink: "https://astrology.mangalbhawan.com/public/images/Acharya-Nitesh-Tripathi-.jpg", // Using a placeholder image
    rating: 4.8, // Added hypothetical rating
    ratingCount: 50, // Added hypothetical rating count
    followers: 100, // Added hypothetical followers
    status: "online",
    about: "Acharya Dhirendra Shastri is one of the best Vastu consultants in India. He has 8 years of rich experience in Kundli making, Vedic astrology, Matchmaking and Face reading. His advice on business, love and health help his clients. He loves to communicate and help the other person with communication, discussion, and guidance. The person surrounding him feels very positive about his communication and guidance. He loves to help people in their difficult and confusing times with knowledge and experience. He is a firm believer that every problem comes with a solution and knows what and who needs the right guidance at the right time. Apart from Vedic astrology he also provides remedies and pujas for Vastu dosha."
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
    about: "Acharya Shivam With more than a decade of experience, Acharya Shivam is a professional astrologer who gained experience in Vedic astrology along with other key dimensions Horoscope reading,marriage, Match Making ,Career, wealth and Love. Famous Astrologer located at Delhi NCR. He is providing qualitative range of astrology services to the people. Complete the atsrological education from Bhartiya Vidhya Bhawan from delhi. And Shastri From Sampurnanad University. Acharya Shivam strongly believes that God has chosen a path for everyone and all of us can find our way in life if we choose the right path. He also relies on the truth that people cannot cancel an event but balance in elements can give us strength and power to deal with a situation. He guides people with the help of his practice in Vedic Astrology to make life easy. So if you are looking for a spiritual healer then get connected to Acharya Shivam."
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
    about: "Acharya Prakash Acharya Prakash has been associated with this field for a pretty long time. He has been doing the same and helping people since ages for a very long time. His expertise and proficiency has helped people get past their life problems solved within no time. There are a lot of clients whom he has served and they are all leading happy and successful lives now. With whatever he has said and predicted, they went on to turn out to be pretty accurate. This explains the huge client base he enjoys in the current time. Today, he is counted amongst one of the premium astrologers in town. he hopes to keep serving people like this for the rest of her life and make it easier for everyone as he believes that everyone is capable of being saved and deserves to lead a good life."
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
    about: "Acharya Krishan Pandey Acharya Krishan Pandeyis a highly experienced and knowledgeable astrologer with a focus on Vedic astrology. He has been practicing astrology for over half a decade and has helped countless individuals with his insightful and accurate predictions and guidance. Acharya Krishan Pandey passion for astrology began at a young age, and he has since dedicated his life to mastering the complexities of Vedic astrology. He has completed his formal education in astrology from a prestigious institution and has continued to expand his knowledge and expertise through ongoing study and practice. He deeply understands the planetary positions and their effects on different aspects of life, including career, finance, health, and relationships. So get in touch with Acharya Krishan Pandey sfor more information!"
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
    about: "Acharya Bhaskar The knowledgeable astrologer Acharya Bhaskar has devoted more than a half-decade of his life to the study and practice of astrology. He holds the title of Vedic Astrology master as a result of his devotion. He provides his services at the finest caliber possible. His clientele has rapidly grown in a short period of time. Acharya Bhaskar clients appreciate his services since he can address any of their inquiries. His economical yet effective remedies have also received praise and confidence from his patients. Contact Acharya Bhaskar for assistance if you need it to get over challenging circumstances or challenges. He is the one who has promised to support and guide them."
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
    about: "Anupam Bharadwaj Acharya Anupam Bharadwaj is a highly respected and accomplished Vedic astrologer with over two decades of experience in the field. His extensive knowledge and expertise in Vedic astrology have helped thousands of people gain insights and guidance on various aspects of their lives, including career, relationships, health, and spirituality. He has an exceptional ability to analyze complex birth charts and interpret the positions of the planets to predict future events. Throughout his career, Acharya Anupam Bharadwaj has gained a reputation for his professionalism, integrity, and compassion. He takes a client-focused approach to his work and is known for his ability to connect with his clients on a personal level. Contact Acharya Anupam Bharadwaj for more information!"
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
    about: "Acharya Rahul Acharya Rahulis always ready to assist/gp-= anyone in need and has a lot of knowledge in astrology, including Vedic astrology. Acharya Rahul is a very reputated astrologer.He has change many peoples life through their accurate predictions and remedies.He have great knowledge of astrology.His specialization in Shadi, Career, Job & Business, Love & arrange marrige, Health with a experience of 6 years. He honestly thinks that planetary motions are essential to assisting us in finding answers to problems. His precise assessments and practical recommendations have helped many of his clients achieve their objectives. In addition, he contends that even while humans cannot stop an event from happening, a set of circumstances might endow us with the strength and capability to handle it. Acharya Rahul mentors people using his knowledge of the subject in an effort to make their lives easier."
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
 