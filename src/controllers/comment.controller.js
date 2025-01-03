import mongoose, { isValidObjectId } from "mongoose"
import {Comment} from "../models/comment.model.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"

const getVideoComments = asyncHandler(async (req, res) => {
    //TODO: get all comments for a video
    const {videoId} = req.params
    const {page = 1, limit = 10} = req.query

})

const addComment = asyncHandler(async (req, res) => {
    // TODO: add a comment to a video
    const {videoId} = req.params
    const {content} = req.body
    if(!isValidObjectId(videoId))
    {
        throw new ApiError(400, "Invalid video id")
    }
    await Comment.create({content:content, video:videoId,owner:req.user._id})
     res.status(201).json(new ApiResponse(201, "Comment added successfully"))
    
})

const updateComment = asyncHandler(async (req, res) => {
    // TODO: update a comment
    const {commentId} = req.params
    const {content} = req.body
    if(!isValidObjectId(commentId))
        {
            throw new ApiError(400, "Invalid comment id")
        }
    const comment = await Comment.findByIdAndUpdate(commentId, {content}, {new: true})
    if(!comment) {
        throw new ApiError(404, "Comment not found")
        }
        return res.status(201) .json(new ApiResponse(200, "Comment updated successfully"))
})

const deleteComment = asyncHandler(async (req, res) => {
    // TODO: delete a comment
    const {commentId}=req.params
    const comment=await Comment.findByIdAndDelete(commentId)
    if(!comment)
    {
        throw new ApiError(404, "Comment not found")
    }
    return res.status(201) .json( new ApiResponse(200, "Comment deleted successfully"))
})

export {
    getVideoComments, 
    addComment, 
    updateComment,
     deleteComment
    }
