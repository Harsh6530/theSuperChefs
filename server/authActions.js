import connectDb from "../middleware/connectDb";
import userSchema from "../models/userSchema";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

function getUserModel() {
  return mongoose.models.User || mongoose.model("User", userSchema);
}

export async function login(data) {
  try {
    await connectDb();

    const { email, password } = data;

    const User = getUserModel();
    const response = await User.findOne({ email: email });

    if (!response) {
      return {
        success: false,
        status: 401,
        message: "Invalid Credentials",
      };
    }

    const isMatch = await bcrypt.compare(password, response.password);
    
    if (isMatch) {
      const token = jwt.sign(
        {
          email: response.email,
          name: response.name,
          phone:response.mobile,
        },
        process.env.JWT_SECRET_KEY,
        { expiresIn: "2d" }
      );

      return {
        success: true,
        status: 200,
        message: "Succesfully Logged In",
        name: response.name,
        email: response.email,
        mobile: response.mobile,
        token,
      };
    } else {
      return {
        success: false,
        status: 401,
        message: "Wrong Password",
      };
    }
  } catch (error) {
    console.log(error);
    return {
      success: false,
      status: 500,
      message: "Internal Server Error",
    };
  }
}

export async function signup(data) {
  try {
    await connectDb();

    const { email, password, name, mobile } = data;

    const User = getUserModel();
    const response = await User.findOne({ email: email });

    if (response) {
      return {
        success: false,
        status: 401,
        message: "User already Exists",
      };
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      mobile,
    });

    await newUser.save();

    return {
      success: true,
      status: 200,
      message: "Logged In Succesfully",
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      status: 500,
      message: "Internal Server Error",
    };
  }
}

export async function forgotPassword(data) {
  try {
    await connectDb();

    const { email, password, mobile } = data;

    const User = getUserModel();
    const response = await User.findOne({ email, mobile });

    if (!response) {
      return {
        success: false,
        status: 401,
        message: "Invalid Credentials",
      };
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    response.password = hashedPassword;
    await response.save();

    return {
      success: true,
      status: 200,
      message: "Password Changed Succesfully",
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      status: 500,
      message: "Internal Server Error",
    };
  }
}
