import {asyncHandler} from '../utils/asyncHandler.js'
import {ApiError} from "../utils/ApiError.js"
import { User } from '../models/user.model.js'
import {ApiResponse} from '../utils/ApiResponse.js'
import {uploadOnCloudinary} from "../utils/cloudinary.js"



const generateAccessAndRefereshTokens = async(userId) =>{
    try {
        const user = await User.findById(userId)
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        user.refreshToken = refreshToken
        await user.save({ validateBeforeSave: false })

        return {accessToken, refreshToken}


    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating referesh and access token")
    }
}

const registerUser = asyncHandler( async (req, res) => {
// get details of user 
// validate userbased on username and email
// check if user already exist
// create user object - create entry in db
// remove password from response
// check user creation 
// return response

    const {firstName, lastName, email, password} = req.body
    // console.log(req.body)
    // console.log("email", email)
    // console.log("firstName", firstName)
    // console.log("password", password)

    // validation 

    if(firstName === ""){
        throw new ApiError(400, "firstName is required")
    }
    if(lastName === ""){
        throw new ApiError(400, "lastName is required")
    }
    if(email === ""){
        throw new ApiError(400, "email is required")
    }
    if(password === ""){
        throw new ApiError(400, "password is required")
    }
    
    // check user already exists

    const existedUser = await User.findOne({email})
    // console.log(existedUser)
    if(existedUser){
        throw new ApiError(409, "User with email already exists")
    }

    // create avatar using muter files
    let avatarLocalPath = req.files?.avatar[0]?.path;

    // if (!avatarLocalPath) {
    //     throw new ApiError(400, "avatar path is required");
    // }

    const avatar = await uploadOnCloudinary(avatarLocalPath);

    // if (!avatar) {
    //     throw new ApiError(400, "error occurred during uploading avatar");
    // }

    if (req.files && Array.isArray(req.files.avatar) && req.files.avatar.length > 0) {
        avatarLocalPath = req.files.avatar[0].path
    }

    // create user
    const user = await User.create(
        {
            firstName,
            lastName,
            email,
            password,
            avatar: avatar?.url || ""
        }
    )
    const createdUser =  await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if(!createdUser){
        throw new ApiError(500, "Something went wrong while registering user")
    }

    return res.status(201).json(
        new ApiResponse(200, createdUser, "User Registerd Successfully")
    )
})

const loginUser = asyncHandler( async (req, res) => {
    // get data from req.body
    // validate email
    // find the user
    // password check 
    // if valid login access and refresh token


    const {email, password} = req.body

    if(!email){
        throw new ApiError(400, "email is required")
    }


    const user = await User.findOne({email})

    if(!user){
        throw new ApiError(404, "invalid email, user does not exist")
    }

    const isPasswordValid = await user.isPasswordCorrect(password)

    if(!isPasswordValid){
        throw new ApiError(401, "Invalid password")
    }

    const {accessToken, refreshToken} = await generateAccessAndRefereshTokens(user._id)

    const loggedInUser = await User.findById(user._id).select("-password -refreshToken")

    const options = {
        httpOnly: true,
        secure: true
    }

    return res.status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
        new ApiResponse(
            200,
            {
                user: loggedInUser, refreshToken, accessToken
            },
            "User logged in successfully"
        )
    )

})

const logoutUser = asyncHandler(async(req, res) => {
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $unset: {
                refreshToken: 1 // this removes the field from document
            }
        },
        {
            new: true
        }
    )

    const options = {
        httpOnly: true,
        secure: true
    }

    return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User logged Out"))
})

const refreshAccessToken = asyncHandler( async (req, res) => {
    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken

    if ( !incomingRefreshToken ){
        throw new ApiError(401, "unauthorized request")
    }

    try {
        const decodedToken = jwt.verify(
            incomingRefreshToken,
            process.env.REFRESH_TOKEN_SECRET
        )
        const user = await User.findById(decodedToken?._id)
    
        if (!user) {
            throw new ApiError(401, "Invalid refresh token")
        }
        if (incomingRefreshToken !== user?.refreshToken) {
            throw new ApiError(401, "Refresh token is expired or used")           
        }

        const options = {
            httpOnly: true,
            secure: true
        }
    
        const {accessToken, newRefreshToken} = await generateAccessAndRefereshTokens(user._id)

        return res.status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", newRefreshToken, options)
        .json(
            new ApiResponse(
                200,
                {accessToken, refreshToken: newRefreshToken},
                "Access token refreshed"
            )
        )

    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid refresh token")
    }
} )

const changeCurrentPassword = asyncHandler( async (req, res) => {

    const {oldPassword, newPassword} = req.body
    const user = await User.findById(req.user?._id)
    const isPasswordValid = await isPasswordCorrect(oldPassword) 

    if(!isPasswordValid){
        throw new ApiError(400, "Invalid old password")
    }

    user.password = newPassword
    await user.save( { validateBeforeSave: false })

    return res.status(200)
    .json(
        new ApiResponse(
            200,
            req.user,
            "password changed Successfully"
        )
    )
})

const getCurrentUser = asyncHandler(async (req, res) => {
    return res
    .status(200)
    .json(new ApiResponse(
        200,
        req.user,
        "User fetched successfully"
    ))
})

const updateAccountDetails = asyncHandler( async (req, res) => {
    const  {firstName, lastName, email} = req.body

    if(!firstName || !email || !lastName) {
        throw new ApiError(400, "All fields are required")
    }

    const user = await User.findByIdAndUpdate(
        req.user?._id, 
        { $set: {
            firstName,
            lastName,
            email
        }},
        {new: true}
    ).select("-password")

    return res.status(200)
    .json( new ApiResponse(
        200,
        user,
        "Account details update successfully"
    ) )
}
)

const updateAvatar = asyncHandler( async (req, res) => {
    const avatarLocalPath = req.file?.path
    if (!avatarLocalPath){
        throw new ApiError(400, "avatar file is missing")
    }
    const avatar = await uploadOnCloudinary(avatarLocalPath)

    if (!avatar.url){
        throw new ApiError(400, "Error while uploading avatar")
    }

    const user = await User.findByIdAndUpdate(
        req.user?._id,
        {
            $set: {
                avatar : avatar.url
            }
        },
        {new: true}
    ).select( "-password")

    return res.status(200)
    .json(
        new ApiResponse(
            200,
            user,
            "avatar updated successfully"
        )
    )
})


export {
    registerUser,
    logoutUser,
    loginUser,
    refreshAccessToken,
    getCurrentUser,
    changeCurrentPassword,
    updateAccountDetails,
    updateAvatar
}