import { Router } from "express";
import {
    loginUser,
    registerUser, 
    logoutUser,
    refreshAccessToken,
    updateAccountDetails,
    updateAvatar,
    changeCurrentPassword
} from "../controllers/user.controller.js";
import {upload} from '../middlewares/multer.middleware.js'
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router()

router.route("/register").post(
    upload.fields([
        {
            name: "avatar",
            maxCount: 1
        }
    ]),
    registerUser)

    router.route("/login").post(loginUser)
    router.route("/logout").post(verifyJWT,  logoutUser)
    router.route("/refresh-token").post(refreshAccessToken)
    router.route("/update-details").post(updateAccountDetails)
    router.route("/update-avatar").post(updateAvatar)
    router.route("/change-password").post(changeCurrentPassword)

export default router