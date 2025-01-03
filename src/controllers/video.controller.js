import mongoose, { isValidObjectId } from "mongoose";
import { Video } from "../models/video.model.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
// TODO UPADTEVIDEO

const getAllVideos = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10, query, sortBy, sortType, userId } = req.query;
  //TODO: get all videos based on query, sort, pagination
});

const publishAVideo = asyncHandler(async (req, res) => {
  const { title, description } = req.body;
  if ([title, description].some((field) => field?.trim() === "")) {
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
  const videoFile = await uploadOnCloudinary(videoLocalPath);
  const thumbnail = await uploadOnCloudinary(thumbnailLocalPath);
  const duration = videoFile.duration;
  console.log(duration);
  const video = await Video.create({
    videoFile: videoFile.url,
    thumbnail: thumbnail.url,
    title,
    description,
    duration,
    owner: req.user._id,
  });
  res.status(201).json({ message: "Video published successfully" });
});

const getVideoById = asyncHandler(async (req, res) => {
  const { videoId } = req.params;
  const video = await Video.findByIdAndUpdate(
    videoId,
    { $inc: { views: 1 } }, // Increment the `views` field by 1
    { new: true } // Return the updated document
  );

  if (!video) {
    throw new ApiError(404, "Video not found");
  }

  const user = await User.findById(req.user._id);

  if (!user.watchHistory.includes(videoId)) {
    user.watchHistory.push(videoId);
    await user.save();
  }

  res.status(200).json({ video });
});

const updateVideo = asyncHandler(async (req, res) => {
  const { videoId } = req.params;
  const video = await Video.findById(videoId);
  if (!video) {
    throw new ApiError(404, "Video not found");
  }

  if (video.owner.toString() != req.user._id) {
    throw new ApiError(403, "You are not the owner of this video");
  }

  const { title, description } = req.body;
  if(!title || !description)
  {
    throw new ApiError(400, "title and description are required");
  }

  const thumbnailLocalPath = req.file?.path;
  if(!thumbnailLocalPath)
  {
    throw new ApiError(400, "thumbnail file is required");
  }

  const thumbnail=await uploadOnCloudinary(thumbnailLocalPath)
  if(!thumbnail.url)
  {
    throw new ApiError(400,"Failed to upload")
  }
  const updateVideoInfo=await Video.findByIdAndUpdate(
    videoId,
    {
      $set:{
        title:title,
        description:description,
        thumbnail:thumbnail.url
      }
    },
    {new:true}
  )
  res.status(200).json(new ApiResponse(200,updateVideoInfo,"Video Info updated"));
  //TODO: update video details like title, description, thumbnail
});

const deleteVideo = asyncHandler(async (req, res) => {
  const { videoId } = req.params;
  const video = await Video.findById(videoId);

  if (!video) {
    throw new ApiError(404, "Video not found");
  }
  if (video.owner !== req.user._id) {
    throw new ApiError(403, "You are not the owner of this video");
  }
  await Video.findByIdAndDelete(videoId);
  res.status(200).json({ message: "Video deleted successfully" });
  //TODO: delete video
});

const togglePublishStatus = asyncHandler(async (req, res) => {
  const { videoId } = req.params;
  const video = await Video.findById(videoId);
  if (!video) {
    throw new ApiError(404, "Video not found");
  }
  if (video.owner !== req.user._id) {
    throw new ApiError(403, "You are not the owner of this video");
  }
  video.isPublished = !video.isPublished;
  await video.save();
  res.status(200).json({ message: "Video publish status toggled" });
});

export {
  getAllVideos,
  publishAVideo,
  getVideoById,
  updateVideo,
  deleteVideo,
  togglePublishStatus,
};
