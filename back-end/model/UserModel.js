import mongoose from "mongoose";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
process.env.TOKEN_SECRET;

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true, lowercase: true },
    salt: { type: String, required: true },
    hash: { type: String, required: true },
});

// Nur `function` Funktionen benutzen nicht
// Arrow (()=>) functions
userSchema.methods.setPassword = function (password) {
    // Salt erstellen
    this.salt = crypto.randomBytes(64).toString("hex");
    // Password mit salt hashen
    this.hash = crypto
        .pbkdf2Sync(password, this.salt, 1000, 64, "sha512")
        .toString("hex");
};

userSchema.methods.verifyPassword = function (password) {
    const hash = crypto
        .pbkdf2Sync(password, this.salt, 1000, 64, "sha512")
        .toString("hex");

    return this.hash === hash;
};

userSchema.methods.generateAuthToken = function () {
    const payload = { email: this.email };
    const token = jwt.sign(payload, process.env.TOKEN_SECRET, { expiresIn: '1800s' });
    return token;
};


export const UserModel = mongoose.model("User", userSchema);