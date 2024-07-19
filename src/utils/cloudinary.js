import {v2 as cloudinary} from 'cloudinary'
import fs from "fs"

// Configuration
cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET 
});

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) {
            return null;
        }
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        });
        console.log("File uploaded on Cloudinary:", response.url);
        return response;
    } catch (error) {
        console.error("Error uploading to Cloudinary:", error);
        // Handle error gracefully, e.g., log it or report to monitoring system
        return null;
    } finally {
        try {
            fs.unlinkSync(localFilePath);
        } catch (error) {
            console.error("Error deleting local file:", error);
            // Handle file deletion error, log it or report to monitoring system
        }
    }
};

export {uploadOnCloudinary}
