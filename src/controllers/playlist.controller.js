import mongoose, { isValidObjectId } from "mongoose";
import { Playlist } from "../models/playlist.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Video } from "../models/video.model.js";

const createPlaylist = asyncHandler(async (req, res) => {
  const { name, description } = req.body;
  const addPlaylist = await Playlist.create({
    name: name,
    description: description,
    owner: req.user._id,
  });
  return res
    .status(201)
    .json(new ApiResponse(201,addPlaylist, "Playlist created successfully"));
  //TODO: create playlist
});

const getUserPlaylists = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  if (!isValidObjectId(userId)) {
    throw new ApiError(400, "Invalid user id");
  }
  const playlists = await Playlist.find({ owner: userId });
  return res.status(200).json(ApiResponse(playlists, "User playlists"));
  //TODO: get user playlists
});

const getPlaylistById = asyncHandler(async (req, res) => {
  const { playlistId } = req.params;
  if (!isValidObjectId(playlistId)) {
    throw new ApiError(400, "Invalid playlist id");
  }
  const playlist = await Playlist.findById(playlistId);
  if (!playlist) {
    throw new ApiError(404, "Playlist not found");
  }
  return res.status(200).json(ApiResponse(playlist, "Playlist found"));
  //TODO: get playlist by id
});

const addVideoToPlaylist = asyncHandler(async (req, res) => {
  const { videoId,playlistId } = req.params;
  console.log(videoId,playlistId);

  
  if (!isValidObjectId(playlistId)) {
    throw new ApiError(400, "Invalid playlist id");
  }
  if (!isValidObjectId(videoId)) {
    throw new ApiError(400, "Invalid video id");
  }

  const playlist = await Playlist.findById(playlistId)
  console.log(playlist)
  if (!playlist) {
    throw new ApiError(404, "Playlist not found");
  }
  if(playlist.owner!=req.user.id)
  {
    throw new ApiError(403, "You are not the owner of this playlist");
  }
  const video = await Video.findById(videoId);
  if (!video) {
    throw new ApiError(404, "Video not found");
  }
  if(video.owner!=req.user.id)
  {
    throw new ApiError(403, "You are not the owner of this Video");
  }

  const videoAlreadyInPlaylist = playlist.videos.filter((video)=>video.toString()===videoId)

  if (videoAlreadyInPlaylist.length>0) {
    throw new ApiError(400, "Video already in playlist");
  }
  else{

    playlist.videos.push(videoId);
    await playlist.save();
  }

  return res .status(200).json(ApiResponse(playlist, "Video added to playlist"));

});

const removeVideoFromPlaylist = asyncHandler(async (req, res) => {
    const { videoId ,playlistId} = req.params;

    // Find the playlist by ID
    const playlist = await Playlist.findById(playlistId);
    if (!playlist) {
        throw new ApiError(404, "Playlist not found");
    }
    if(playlist.owner!=req.user.id)
        {
          throw new ApiError(403, "You are not the owner of this playlist");
    }
    const video = await Video.findById(videoId);
    if (!video) {
      throw new ApiError(404, "Video not found");
    }
    if(video.owner!=req.user.id)
    {
      throw new ApiError(403, "You are not the owner of this Video");
    }

    // Remove the video ID from the videos array
    playlist.videos.pull(videoId); // Removes all occurrences of videoId in the array

    // Save the updated playlist
    await playlist.save();
    return res.status(200).json(new ApiResponse(200,playlist, "Video removed from playlist"));


});


const deletePlaylist = asyncHandler(async (req, res) => {
  const { playlistId } = req.params;
  if (!isValidObjectId(playlistId)) {
    throw new ApiError(400, "Invalid playlist id");
    }
    const playlist = await Playlist.findByIdAndDelete(playlistId);
    if (!playlist) {
        throw new ApiError(404, "Playlist not found");
        }
        return res.status(200).json(new ApiResponse(200,playlist, "Playlist deleted"));

  // TODO: delete playlist
});

const updatePlaylist = asyncHandler(async (req, res) => {
  const { playlistId } = req.params;
  const { name, description } = req.body;
  if (!isValidObjectId(playlistId)) {
    throw new ApiError(400, "Invalid playlist id");
  }
  const playlist = await Playlist.findByIdAndUpdate(playlistId, { name, description }, { new: true
    });
    if (!playlist) {
        throw new ApiError(404, "Playlist not found");
        }
        return res.status(200).json(new ApiResponse(200,playlist, "Playlist updated"));
  //TODO: update playlist
});

export {
  createPlaylist,
  getUserPlaylists,
  getPlaylistById,
  addVideoToPlaylist,
  removeVideoFromPlaylist,
  deletePlaylist,
  updatePlaylist,
};
