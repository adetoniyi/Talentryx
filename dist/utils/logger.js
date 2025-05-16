"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logWarn = exports.logError = exports.logInfo = void 0;
const logInfo = (message) => {
    console.log(`ℹ️  INFO: ${message}`);
};
exports.logInfo = logInfo;
const logError = (message) => {
    console.error(`❌ ERROR: ${message}`);
};
exports.logError = logError;
const logWarn = (message) => {
    console.warn(`⚠️  WARN: ${message}`);
};
exports.logWarn = logWarn;
