import { usermodel } from "../models/auth.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

async function HandleSignup(req, res) {
  const { username, email, password } = req.body;

  const existingUser = await usermodel.findOne({ email });

  if (existingUser) {
    return res.status(400).json({
      message: "User Already Exists",
    });
  }

  const newuser = await usermodel.create({
    username,
    email,
    password,
  });

  return res.status(201).json({ message: "User registered successfully" });
}



async function HandleLogin(req, res) {
  const { email, password } = req.body;

  const user = await usermodel.findOne({ email });

  if (!user) {
    return res.json({ message: "User Not Found !! Sign Up First" });
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  //server checks the credentials if valid server jwt banata hai jaisa niche ho rha hai

  // Server sends JWT as a JSON response or as a cookie

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  res.cookie("jwt", token, {
  httpOnly: true,
  sameSite: "strict",
  maxAge: 3600000, // 1 hour
});

return res.json({ message: "Login successful" });
}

// handle logout in future

export { HandleLogin, HandleSignup };
