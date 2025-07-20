import express from "express";
import validationMiddleware from "../../middlewares/validationMiddleware";
import {
  changePasswordSchema,
  changeStatusValidationSchema,
  deleteAccountValidationSchema,
  forgotPassCreateNewPassSchema,
  forgotPassSendOtpSchema,
  forgotPassVerifyOtpSchema,
  loginValidationSchema,
  refreshTokenValidationSchema,
} from "./auth.validation";
import AuthMiddleware from "../../middlewares/AuthMiddleware";
import { UserRole } from "../User/user.constant";
import AuthController from "./authController";
import isAccess from "../../middlewares/isAccess";

const router = express.Router();

router.post(
  "/login",
  validationMiddleware(loginValidationSchema),
  AuthController.loginUser
);

router.post(
  "/login-owner",
  validationMiddleware(loginValidationSchema),
  AuthController.loginOwner
);

router.post(
  "/login-super-admin",
  validationMiddleware(loginValidationSchema),
  AuthController.loginSuperAdmin
);

//forgot-password
router.post(
  "/forgot-pass-send-otp",
  validationMiddleware(forgotPassSendOtpSchema),
  AuthController.forgotPassSendOtp
);
router.post(
  "/forgot-pass-verify-otp",
  validationMiddleware(forgotPassVerifyOtpSchema),
  AuthController.forgotPassVerifyOtp
);
router.post(
  "/forgot-pass-create-new-pass",
  validationMiddleware(forgotPassCreateNewPassSchema),
  AuthController.forgotPassCreateNewPass
);

router.patch(
  "/change-password",
  AuthMiddleware(UserRole.owner, UserRole.super_admin, UserRole.user, UserRole.administrator),
  validationMiddleware(changePasswordSchema),
  AuthController.changePassword
);
router.patch(
  "/change-status/:id",
  AuthMiddleware(UserRole.super_admin, UserRole.administrator),
  isAccess('user'),
  validationMiddleware(changeStatusValidationSchema),
  AuthController.changeStatus
);

router.patch(
  "/change-owner-status/:id",
  AuthMiddleware(UserRole.super_admin, UserRole.administrator),
  isAccess('owner'),
  validationMiddleware(changeStatusValidationSchema),
  AuthController.changeStatus
);

router.delete(
  "/delete-my-account",
  AuthMiddleware(UserRole.owner, UserRole.user),
  validationMiddleware(deleteAccountValidationSchema),
  AuthController.deleteMyAccount
);

router.post(
  "/refresh-token",
  validationMiddleware(refreshTokenValidationSchema),
  AuthController.refreshToken
);

router.post(
  "/social-login",
  AuthController.socialLogin
);
export const AuthRoutes = router;
