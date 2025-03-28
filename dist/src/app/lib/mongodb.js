"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
    throw new Error('There is no MONGODB_URI in envs.');
}
const connectDB = async () => {
    if (mongoose_1.default.connection.readyState >= 1) {
        return;
    }
    try {
        await mongoose_1.default.connect(MONGODB_URI);
        console.log('✅ Success connect to MongoDB');
    }
    catch (error) {
        console.error('❌ Error connect to MongoDB:', error);
        process.exit(1);
    }
};
exports.connectDB = connectDB;
