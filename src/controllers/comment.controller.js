import mongoose, { isValidObjectId } from "mongoose";
import { Comment } from "../models/comment.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const getVideoComments = asyncHandler(async (req, res) => {
  //TODO: get all comments for a video
  const { videoId } = req.params;
  const { page=1, limit=10 } = req.query;
  if (!isValidObjectId(videoId)) {
    throw new ApiError(400, "Invalid video id");
  }
  const comments = await Comment.find({ video:videoId })
    .skip((page - 1) * limit)
    .limit(limit);
    return res.status(200).json(new ApiResponse(200,comments,"All Comments"))
});

const addComment = asyncHandler(async (req, res) => {
  // TODO: add a comment to a video
  const { videoId } = req.params;
  const { content } = req.body;
  if (!isValidObjectId(videoId)) {
    throw new ApiError(400, "Invalid video id");
  }
  await Comment.create({
    content: content,
    video: videoId,
    owner: req.user._id,
  });
  res.status(201).json(new ApiResponse(201, "Comment added successfully"));
});

const updateComment = asyncHandler(async (req, res) => {
  // TODO: update a comment
  const { commentId } = req.params;
  const { content } = req.body;
  if (!isValidObjectId(commentId)) {
    throw new ApiError(400, "Invalid comment id");
  }
  const comment = await Comment.findById(commentId);
  if(!comment)
    {
        throw new ApiError(404, "Comment not found");
    }
  if(comment.owner.toString()!=req.user._id)
  {
    throw new ApiError(403, "You are not the owner of this comment");
  }
  await Comment.findByIdAndUpdate(
    commentId,
    { content },
    { new: true }
  );

  return res
    .status(201)
    .json(new ApiResponse(200, "Comment updated successfully"));
});

const deleteComment = asyncHandler(async (req, res) => {
  // TODO: delete a comment
  const { commentId } = req.params;
  if (!isValidObjectId(commentId)) {
    throw new ApiError(400, "Invalid comment id");
    }
    const comment = await Comment.findById(commentId);
    if(!comment)
    {
        throw new ApiError(404, "Comment not found");
    }
    if(comment.owner.toString()!=req.user._id)
    {
      throw new ApiError(403, "You are not the owner of this comment");
    }
   await Comment.findByIdAndDelete(commentId);
  return res
    .status(201)
    .json(new ApiResponse(200, "Comment deleted successfully"));
});

export { getVideoComments, addComment, updateComment, deleteComment };
