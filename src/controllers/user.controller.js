import {asyncHandler} from '../utils/asyncHandler.js'
import {ApiError} from "../utils/ApiError.js"
import { User } from '../models/user.model.js'
import {ApiResponse} from '../utils/ApiResponse.js'
import {uploadOnCloudinary} from "../utils/cloudinary.js"


const registerUser = asyncHandler( async (req, res) => {
// get details of user 
// validate userbased on username and email
// check if user already exist
// create user object - create entry in db
// remove password from response
// check user creation 
// return response

    const {firstName, lastName, email, password} = req.body
    console.log(req.body)
    console.log("email", email)
    console.log("firstName", firstName)
    console.log("password", password)

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

    if (!avatarLocalPath) {
        throw new ApiError(400, "avatar path is required");
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath);

    if (!avatar) {
        throw new ApiError(400, "error occurred during uploading avatar");
    }

    // if (req.files && Array.isArray(req.files.avatar) && req.files.avatar.length > 0) {
    //     avatarLocalPath = req.files.avatar[0].path
    // }

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

// const loginUser = asyncHandler( async (req, res) => {
    // get data from req.body
    // validate email
    // find the user
    // password check
    // access and refresh token
// })

export {registerUser}