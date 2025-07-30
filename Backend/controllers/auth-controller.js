import User from "../models/user.js";
import bcrypt from "bcrypt";

const registerUser = async (req, res) => {
  try {
    const { email, name, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "Email address already in use",
      });
    }

    const salt = await bcrypt.genSalt(10);

    const hashPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      email,
      password: hashPassword,
      name,
    });

    res.status(201).json({
      message:
        "verification email sent to your email, Please check and verify your account",
    });

//TODO send email
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: "internal server error" });
  }
};

const loginUser = async (req, res) => {};

export { registerUser, loginUser };
