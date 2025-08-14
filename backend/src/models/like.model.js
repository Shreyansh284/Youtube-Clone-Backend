import mongoose,{Schema}  from "mongoose";

const likeSchema = new Schema({
video:{
    type:Schema.Types.ObjectId,
    ref:"Video",
    default:null
},
comment:{
    type:Schema.Types.ObjectId,
    ref:"Comment",
    default:null
},
tweet:{
    type:Schema.Types.ObjectId,
    ref:"Tweet",
    default:null
},
likedBy:{
    type:Schema.Types.ObjectId,
    ref:"User"
},


},{timestamps:true})

export const Like=mongoose.model("Like",likeSchema)


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