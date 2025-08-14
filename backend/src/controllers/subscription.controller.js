import mongoose, { isValidObjectId } from "mongoose";
import { User } from "../models/user.model.js";
import { Subscription } from "../models/subscription.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
// TODO: imporve response
const toggleSubscription = asyncHandler(async (req, res) => {
  const { channelId } = req.params;

  // Check if the subscription already exists
  const existingSubscription = await Subscription.findOne({
    subscriber: req.user._id,
    channel: channelId,
  });

  if (existingSubscription) {
    await existingSubscription.deleteOne();
    return res.status(200).json({ message: "Unsubscribed successfully" });
  } else {
    await Subscription.create({
      subscriber: req.user._id,
      channel: channelId,
    });
    return res.status(201).json({ message: "Subscribed successfully" });
  }
});

// controller to return subscriber list of a channel
const getUserChannelSubscribers = asyncHandler(async (req, res) => {
  const { channelId } = req.params;
  if(!isValidObjectId(channelId))
    {
      throw new ApiError(400, "Invalid Channel id");
    }
  const subscriber = await Subscription.find({
    channel: channelId,
  });
  const subscriberCount=subscriber.length
  return res
    .status(201)

    .json(new ApiResponse(200,{ count:subscriberCount,subscriber:subscriber }, "Subscribers"));
});

// controller to return channel list to which user has subscribed
const getSubscribedChannels = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  if(!isValidObjectId(userId))
  {
    throw new ApiError(400, "Invalid user id");
  }
  const subscribed = await Subscription.find({
    subscriber: userId,
  });
  
  const subscriptionCount = subscribed.length; // Count the number of documents
  
  return res.status(201).json(
    new ApiResponse(200, {  count: subscriptionCount ,subscriptions: subscribed}, "subscribeTo")
  );
});

export { toggleSubscription, getUserChannelSubscribers, getSubscribedChannels };
