import mongoose, { isValidObjectId } from "mongoose";
import { Like } from "../models/like.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Tweet } from "../models/tweet.model.js";
import { Comment } from "../models/comment.model.js";
import { Video } from "../models/video.model.js";

const toggleVideoLike = asyncHandler(async (req, res) => {
  const { videoId } = req.params;
  if (!isValidObjectId(videoId)) {
    throw new ApiError(400, "Invalid video id");
  }
  const video = await Video.findById(videoId);
  if (!video) {
    throw new ApiError(404, "Video not found");
  }

  const like = await Like.findOne({ video: videoId, likedBy: req.user._id });
  if (!like) {
    await Like.create({ video: videoId, likedBy: req.user._id });
    return res.status(200).json({ message: "Liked " });
  } else {
    await like.deleteOne();
    return res.status(200).json({ message: "Unliked " });
  }
  //TODO: toggle like on video
});

const toggleCommentLike = asyncHandler(async (req, res) => {
  const { commentId } = req.params;
  //TODO: toggle like on comment
  if (!isValidObjectId(commentId)) {
    throw new ApiError(400, "Invalid video id");
  }
  const comment = await Comment.findById(commentId);
  if (!comment) {
    throw new ApiError(404, "Comment not found");
  }
  const like = await Like.findOne({
    comment: commentId,
    likedBy: req.user._id,
  });
  if (!like) {
    await Like.create({ comment: commentId, likedBy: req.user._id });
    return res.status(200).json({ message: "Liked " });
  } else {
    await like.deleteOne();
    return res.status(200).json({ message: "Unliked " });
  }
});

const toggleTweetLike = asyncHandler(async (req, res) => {
  const { tweetId } = req.params;
  //TODO: toggle like on tweet
  if (!isValidObjectId(tweetId)) {
    throw new ApiError(400, "Invalid video id");
  }
  const tweet = await Tweet.findById(tweetId);
  if (!tweet) {
    throw new ApiError(404, "Tweet not found");
  }
  const like = await Like.findOne({ tweet: tweetId, likedBy: req.user._id });
  if (!like) {
    await Like.create({ tweet: tweetId, likedBy: req.user._id });
    return res.status(200).json({ message: "Liked " });
  } else {
    await like.deleteOne();
    return res.status(200).json({ message: "Unliked " });
  }
});

const getLikedVideos = asyncHandler(async (req, res) => {
  //TODO: get all liked videos
  const likedVideos = await Like.find({
    video: { $ne: null },
    likedBy: req.user._id,
  });
  res.status(200).json(likedVideos);
});
const getLikedTweets = asyncHandler(async (req, res) => {
  //TODO: get all liked videos
  const likedTweets = await Like.find({
    tweet: { $ne: null },
    likedBy: req.user._id,
  });
  res.status(200).json(likedTweets);
});
const getLikedComments = asyncHandler(async (req, res) => {
  //TODO: get all liked videos
  const likedComments = await Like.find({
    comment: { $ne: null },
    likedBy: req.user._id,
  });
  res.status(200).json(likedComments);
});

export {
  toggleCommentLike,
  toggleTweetLike,
  toggleVideoLike,
  getLikedVideos,
  getLikedComments,
  getLikedTweets,
};
// TODO
// const getLikedVideos = asyncHandler(async (req, res) => {
//     const likedVideos = await Like.aggregate([
//       {
//         $match: {
//           likedBy: new mongoose.Types.ObjectId(req.user._id),
//           video: { $exists: true, $ne: null },
//         },
//       },
//       {
//         $lookup: {
//           from: "videos",
//           localField: "video",
//           foreignField: "_id",
//           as: "video",
//         },
//       },
//       {
//         $unwind: "$video",
//       },
//       {
//         $lookup: {
//           from: "users",
//           localField: "video.owner",
//           foreignField: "_id",
//           as: "video.owner",
//         },
//       },
//       {
//         $addFields: {
//           "video.owner": { $arrayElemAt: ["$video.owner", 0] },
//         },
//       },
//       {
//         $project: {
//           "video.videoFile": 1,
//           "video.thumbnail": 1,
//           "video.title": 1,
//           "video.duration": 1,
//           "video.views": 1,
//           "video.owner.avatar": 1,
//           "video.owner.username": 1,
//           "video.owner.fullName": 1,
//         },
//       },
//     ]);

//     if (!likedVideos.length) {
//       return res
//         .status(404)
//         .json(new ApiResponse(404, [], "No liked videos found"));
//     }

//     return res
//       .status(200)
//       .json(new ApiResponse(200, likedVideos, "Fetched Liked Videos"));
//   });
