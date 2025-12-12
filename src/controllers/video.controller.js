import mongoose from "mongoose"
import { Video } from "../models/video.models.js"
import { User } from "../models/user.models.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js"

const getAllVideos = asyncHandler(async (req, res) => {
    const { page = 1, limit = 10, query, sortBy, sortType, userId } = req.query

    if (!req.user) {
        throw new ApiError(401, "User needs to be logged in")
    }

    const match = {
        ...(query ? { title: { $regex: query, $options: "i" } } : {}),
        ...(userId ? { owner: mongoose.Types.ObjectId(userId) } : {})
    };

    const videos = await Video.aggregate([
        {
            $match: match
        },
        {
            $lookup: {
                from: "users",
                localField: "owner",
                foreignField: "_id",
                as: "videosByOwner"
            }
        },
        {
            $project: {
                videoFile: 1,
                thumbnail: 1,
                title: 1,
                description: 1,
                duration: 1,
                views: 1,
                isPublished: 1,
                owner: {
                    $arrayElemAt: ["$videosByOwner", 0]
                },
            },
        },

        {
            $sort: {
                [sortBy]: sortType === 'desc' ? -1 : 1
            }
        },
        {
            $skip: (page - 1) * parseInt(limit),
        },

        {
            $limit: parseInt(limit),
        },
    ])

    if (!videos?.length) {
      throw new ApiError(404, "Videos are not found");
    }

    return res
      .status(200)
      .json(new ApiResponse(200, videos, "Videos fetched successfully"));


})