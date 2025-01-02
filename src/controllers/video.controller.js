import mongoose, {isValidObjectId} from "mongoose"
import {Video} from "../models/video.model.js"
import {User} from "../models/user.model.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"
import {uploadOnCloudinary} from "../utils/cloudinary.js"


const getAllVideos = asyncHandler(async (req, res) => {
    const { page = 1, limit = 10, query, sortBy, sortType, userId } = req.query
    //TODO: get all videos based on query, sort, pagination
})

const publishAVideo = asyncHandler(async (req, res) => {
    const { title, description} = req.body
    if (
        [ title, description].some((field) => field?.trim() === "")
      ) {
        throw new ApiError(400, "All fields are required");
      }
      let videoLocalPath;
      if (
        req.files &&
        Array.isArray(req.files.videoFile) &&
        req.files.videoFile.length > 0
      ) {
        videoLocalPath = req.files.videoFile[0].path;
      }
      let thumbnailLocalPath;
      if (
        req.files &&
        Array.isArray(req.files.thumbnail) &&
        req.files.thumbnail.length > 0
      ) {
        thumbnailLocalPath = req.files.thumbnail[0].path;
      }

      if (!videoLocalPath) {
        throw new ApiError(400, "Video file required");
      }
      if (!thumbnailLocalPath) {
        throw new ApiError(400, "thumbnail file required");
      }
      const videoFile =await uploadOnCloudinary(videoLocalPath);
      const thumbnail =await uploadOnCloudinary(thumbnailLocalPath);
      const duration=videoFile.duration;
      console.log(duration)
      const video = await Video.create({
          videoFile:videoFile.url,
         thumbnail: thumbnail.url,
        title,
        description,
        duration,
        owner:req.user._id,
})
res.status(201).json({ message: "Video published successfully" });
})

const getVideoById = asyncHandler(async (req, res) => {
    const { videoId } = req.params
    //TODO: get video by id
})

const updateVideo = asyncHandler(async (req, res) => {
    const { videoId } = req.params
    //TODO: update video details like title, description, thumbnail

})

const deleteVideo = asyncHandler(async (req, res) => {
    const { videoId } = req.params
    //TODO: delete video
})

const togglePublishStatus = asyncHandler(async (req, res) => {
    const { videoId } = req.params
})

export  {
    getAllVideos,
    publishAVideo,
    getVideoById,
    updateVideo,
    deleteVideo,
    togglePublishStatus
}
