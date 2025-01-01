import mongoose, { isValidObjectId } from "mongoose"
import {Tweet} from "../models/tweet.model.js"
import {User} from "../models/user.model.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"

const createTweet = asyncHandler(async (req, res) => {
    //TODO: create tweet
    const {content}=req.body;
    if (
        [content].some((field) => field?.trim() === "")
      ) {
        throw new ApiError(400, " field is required");
      }
      const tweet = await Tweet.create({content, owner:req.user._id});

      const createdTweet=await Tweet.findById(tweet?._id)
      if (!createdTweet) {
        throw new ApiError(500, "Server Error");
      }
    
      return res
        .status(201)
        .json(new ApiResponse(200, createdTweet, "Tweet Added"));


})

const getUserTweets = asyncHandler(async (req, res) => {
    const userId=req.params.userId
        const tweets= await Tweet.find({owner:userId}).sort({createdAt:-1})
    
        return res
        .status(201)
        .json(new ApiResponse(200, tweets, "All Tweets "));
    // TODO: get user tweets
})

const updateTweet = asyncHandler(async (req, res) => {
    //TODO: update tweet
    const tweetId=req.params.tweetId
    const {content}=req.body;
    if (
        [content].some((field) => field?.trim() === "")
      ) {
        throw new ApiError(400, " field is required");
      }
      const updatedTweet = await Tweet.findByIdAndUpdate(tweetId, {content}, {new:true})
    
      return res
        .status(201)
        .json(new ApiResponse(200, updatedTweet, "Updated Tweet "));

})

const deleteTweet = asyncHandler(async (req, res) => {
    const tweetId=req.params.tweetId

    const deletedTweet = await Tweet.findByIdAndDelete(tweetId)

    return res
    .status(201)
    .json(new ApiResponse(200, deletedTweet, "Deleted Tweet "));

})

export {
    createTweet,
    getUserTweets,
    updateTweet,
    deleteTweet
}
