import mongoose from "mongoose";
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import { JWT_SECRET, JWT_EXPIRES_IN } from "../config/env.js";
import { comparePass, hashPassword } from "../utils/hashing.js";
// Register a new user

export const signUp = async (req, res, next) => {
  const session = await mongoose.startSession();

  session.startTransaction();

  try {
    const { email, password, name } = req.body;
    if (!email || !password || !name)
      res.status(400).json({ message: "All fields are required" });
    const existUser = await User.findOne({ email }).session(session);
    if (existUser)
      return res.status(400).json({ message: "User already exists" });

    const hashpass = await hashPassword(password);
    const newUser = await User.create([{ email, name, password: hashpass }], {
      session,
    });
    const token = jwt.sign({ id: newUser[0]._id }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    });

    await session.commitTransaction();
    session.endSession();
    res.status(201).json({
      msj: "USER Created successfuly",
      User: newUser[0],
      token,
      sucsess: true,
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    next(error);
  }
};
export const signIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      res.status(400).json({ msj: "All fields are required" });
    const userExist = await User.findOne({ email });
    if (!userExist) res.status(404).json({ msg: "User not found " });
    const isMatch = await comparePass(password, userExist.password);
    if (!isMatch) return res.status(401).json({ msg: "Invalid credentials" });
    const token = jwt.sign({ id: userExist._id }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    });
    res.status(200).json({
      msg: "Login successful",
      user: userExist,
      token,
      success: true,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error", success: false });
    next(err);
  }
};
// Logout user

//
export const logout = async (req, res, next) => {
  try {
    res.clearCookie("token", { httpOnly: true, secure: true });

    return res
      .status(200)
      .json({ message: "Logout successful", success: true });
  } catch (error) {
    console.error("Error during logout:", error);
    return res.status(500).json({ message: "Logout failed", success: false });
  }
};
