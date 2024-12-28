import { Router } from "express";
import { loginUser, logoutUser, refreshAccessToken, registerUser,  changeCurrentPassword,
    getCurrentUser,
    updateAccountDetails,
    updateUserAvatar,
    updateUserCoverImage } from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
const router=Router();

router.route("/register").post(
    upload.fields([
        {
            name:"avatar",
            maxCount:1
        },
        {
            name:"coverImage",
            maxCount:1
            
        }
    ]),
    registerUser
)

router.route("/login").post(
    loginUser
)
router.route("/logout").post(verifyJWT,
    logoutUser
)

router.route("/refreshToken").post(refreshAccessToken)
router.route("/changePassword").post(verifyJWT,changeCurrentPassword)
router.route("/editProfile").post(verifyJWT,updateAccountDetails)
router.route("/editAvatar").post(verifyJWT,upload.single('avatar'),updateUserAvatar)
router.route("/editCoverImage").post(verifyJWT,upload.single('coverImage'),updateUserCoverImage)

export default router