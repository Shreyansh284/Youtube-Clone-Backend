import mongoose, { isValidObjectId } from "mongoose";
import { Video } from "../models/video.model.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { deleteFromCloudinary, uploadOnCloudinary } from "../utils/cloudinary.js";
// TODO UPADTEVIDEO

const getAllVideos = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10, query, sortBy, sortType } = req.query;

    const videos = await Video.aggregate([
      {
        $match: {
          $or: [
            {
              title: { $regex: query, $options: "i" },
            },
            {
              description: { $regex: query, $options: "i" },
            },
          ],
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "owner",
          foreignField: "_id",
          as: "createdBy",
        },
      },
      {
        $unwind: "$createdBy",
      },
      {
        $project: {
          thumbnail: 1,
          videoFile: 1,
          title: 1,
          description: 1,
          createdBy: {
            fullName: 1,
            username: 1,
            avatar: 1,
          },
        },
      },
      {
        $sort: {
          [sortBy]: sortType === "asc" ? 1 : -1,
        },
      },
      {
        $skip: (page - 1) * limit,
      },
      {
        $limit: parseInt(limit),
      },
    ]);
  
    return res
      .status(201)
      .json(new ApiResponse(201, videos, "Fetched All Videos"));
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
  if(!videoFile)
  {
    throw new ApiError(500, "Failed to upload video to cloudinary");
  }
  const thumbnail = await uploadOnCloudinary(thumbnailLocalPath);
  if(!thumbnail)
    {
      throw new ApiError(500, "Failed to upload thumbnail  to cloudinary");
    }

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
  if(!video)
  {
    throw new ApiError(500, "Failed to create video");
  }
  return res.status(201).json( new ApiResponse(201,video,"Video created successfully"));
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

return  res.status(201).json(new ApiResponse(201, video, "Video found successfully"));
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
    await deleteFromCloudinary(video.thumbnail)
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
  return res.status(201).json(new ApiResponse(201,updateVideoInfo,"Video Info updated"));
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
  return res.status(201).json(new ApiResponse(201,video,"Video Deleted Successfully"));
  //TODO: delete video
});

const togglePublishStatus = asyncHandler(async (req, res) => {
  const { videoId } = req.params;
  const video = await Video.findById(videoId);
  if (!video) {
    throw new ApiError(404, "Video not found");
  }
  if (video.owner.toString()!= req.user._id) {
    throw new ApiError(403, "You are not the owner of this video");
  }
  video.isPublished = !video.isPublished;
  await video.save();
  return res.status(201).json(new ApiResponse(201,video,"Published Status toggled"));
});

export {
  getAllVideos,
  publishAVideo,
  getVideoById,
  updateVideo,
  deleteVideo,
  togglePublishStatus,
};
