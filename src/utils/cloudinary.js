import { v2 as cloudinary } from 'cloudinary';
import fs from "fs"


    // Configuration
    cloudinary.config({ 
        cloud_name:process.env.CLOUDINARY_CLOUD_NAME, 
        api_key: process.env.CLOUDINARY_API_KEY, 
        api_secret: process.env.CLOUDINARY_API_SECRET
    });


    const uploadCloudinary=async(localFilePath)=>{
        try{
            if(!localFilePath)return null
            // upload
           const response = await cloudinary.uploader.upload(localFilePath,{
                resource_type: "auto",
            })
            // file uploaded
            console.log("File Uploaded",response.url)
            return response
        }
        catch(error)
        {
            fs.unlinkSync(localFilePath) //remove the local saved file when opr got fail
            return null
        }
    }

