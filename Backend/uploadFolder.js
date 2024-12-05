import fs from 'fs';
import path from 'path';
import cloudinary from './config/cloudinary.js';

// Folder containing images
const folderPath = './images';

const uploadFolder = async (folderPath) => {
  try {
    // Read all files in the folder
    const files = fs.readdirSync(folderPath);

    for (const file of files) {
      const filePath = path.join(folderPath, file);

      // Check if the file is a valid image
      if (fs.lstatSync(filePath).isFile() && /\.(jpg|jpeg|png|gif|webp)$/i.test(file)) {
        console.log(`Uploading: ${file}`);
        const result = await cloudinary.uploader.upload(filePath, {
          folder: 'your-cloudinary-folder-name', // Optional: specify a folder in Cloudinary
        });

        console.log(`Uploaded ${file}: ${result.secure_url}`);
      } else {
        console.log(`Skipping non-image file: ${file}`);
      }
    }

    console.log('All images uploaded successfully.');
  } catch (error) {
    console.error('Error uploading images:', error);
  }
};

// Start the upload process
uploadFolder(folderPath);
