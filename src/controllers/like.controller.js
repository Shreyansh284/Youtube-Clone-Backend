import mongoose, {isValidObjectId} from "mongoose"
import {Like} from "../models/like.model.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"


// HANDLE ID CONFLITS

const toggleVideoLike = asyncHandler(async (req, res) => {
    const {videoId} = req.params
    if(!isValidObjectId(videoId))
        {
            throw new ApiError(400, "Invalid video id")
        }
    const like= await Like.findOne({video:videoId,likedBy:req.user._id})
    if(!like)
    {
        await Like.create({video:videoId,likedBy:req.user._id})
        return res.status(200).json({ message: "Liked " });
    }
    else
    {
        await like.deleteOne();
        return res.status(200).json({ message: "Unliked " });
    }
    //TODO: toggle like on video
})

const toggleCommentLike = asyncHandler(async (req, res) => {
    const {commentId} = req.params
    //TODO: toggle like on comment
    if(!isValidObjectId(commentId))
        {
            throw new ApiError(400, "Invalid video id")
        }
    const like= await Like.findOne({comment:commentId,likedBy:req.user._id})
    if(!like)
    {
        await Like.create({comment:commentId,likedBy:req.user._id})
        return res.status(200).json({ message: "Liked " });
    }
    else
    {
        await like.deleteOne();
        return res.status(200).json({ message: "Unliked " });
    }

})

const toggleTweetLike = asyncHandler(async (req, res) => {
    const {tweetId} = req.params
    //TODO: toggle like on tweet
    if(!isValidObjectId(tweetId))
        {
            throw new ApiError(400, "Invalid video id")
        }
    const like= await Like.findOne({tweet:tweetId,likedBy:req.user._id})
    if(!like)
    {
        await Like.create({tweet:tweetId,likedBy:req.user._id})
        return res.status(200).json({ message: "Liked " });
    }
    else
    {
        await like.deleteOne();
        return res.status(200).json({ message: "Unliked " });
    }

}
)

const getLikedVideos = asyncHandler(async (req, res) => {
    //TODO: get all liked videos
    const likedVideos = await Like.find({video:{$ne:null},likedBy: req.user._id})
    res.status(200).json(likedVideos)
})
const getLikedTweets = asyncHandler(async (req, res) => {
    //TODO: get all liked videos
    const likedTweets = await Like.find({tweet:{$ne:null},likedBy: req.user._id})
    res.status(200).json(likedTweets)
})
const getLikedComments = asyncHandler(async (req, res) => {
    //TODO: get all liked videos
    const likedComments = await Like.find({comment:{$ne:null},likedBy: req.user._id})
    res.status(200).json(likedComments)
})

export {
    toggleCommentLike,
    toggleTweetLike,
    toggleVideoLike,
    getLikedVideos,
    getLikedComments,
    getLikedTweets
}