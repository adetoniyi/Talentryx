"use strict";
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyAdminTokenMiddleware = void 0;
const token_service_1 = require("../services/token.service");
const verifyAdminTokenMiddleware = (req, res, next) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const { verificationToken } = req.body;
    if (!verificationToken) {
      return res
        .status(400)
        .json({ message: "Verification token is required" });
    }
    try {
      const decoded = (0, token_service_1.generateAdminVerificationToken)(
        verificationToken
      );
      req.body.emailFromToken = decoded.email;
      next();
    } catch (error) {
      return res
        .status(401)
        .json({ message: "Invalid or expired verification token" });
    }
  });
exports.verifyAdminTokenMiddleware = verifyAdminTokenMiddleware;
