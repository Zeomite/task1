const bcrypt = require("bcrypt");
const twilio = require("twilio")(
    process.env.TWILIO_sid,
    process.env.TWILIO_auth_token
  );
const { v4: uuidv4 } = require("uuid");
const nodemailer = require("nodemailer");
const User = require("../models/userModel");
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // Use `true` for port 465, `false` for all other ports
    auth: {
      user: "varunkhanijo14@gmail.com",
      pass: "khjbtzxnyndnedfq",
    }
});






const signup = async (req, res) => {
    const { username, email, password } = req.body;
    try {
      const existingUser = await User.findOne({ email: email });
      if (existingUser) {
        return res.status(400).json({
          message: "User already exists",
        });
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({
          message: "Enter Valid email address",
        });
      }
      const hashedpassword = await bcrypt.hash(password, 10);
      const result = await User.create({
        userid: uuidv4(),
        name: username,
        email: email,
        password: hashedpassword,
      });
      return res.status(201).json({ message: "New User Created", user: result });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: "Something went wrong",
      });
    }
};

const signin = async (req, res) => {
    const { username, email, password } = req.body;
    try {
      const existingUser = await User.findOne({ email: email });
      if (!existingUser) {
        return res.status(400).json({
          message: "User Not Found",
        });
      }
      const matchPassword = await bcrypt.compare(password, existingUser.password);
      if (!matchPassword) {
        return res.status(400).json({ message: "Invalid Credentials" });
      }
      res
        .status(200)
        .json({ message: "Logged in successfully!", user: existingUser });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Something went wrong",
      });
    }
  }

const forgotpass = async (req, res) => {
    const { method, value } = req.body;
    const otp = Math.floor(Math.random() * 9000) + 1000;
    try {
      if (!method) {
        return res.status(400).json({
          message: "Please provide method of recovery",
        });
      }
  
      switch (method) {
        case "email":
          try {
            let user = await User.findOne({ email: value });
            if (!user) {
              return res.status(400).json({
                message: "No such User",
              });
            }
            await transporter.sendMail({
              from: '"App Auth" <varunkhanijo14@gmail.com>', // sender address
              to: value, // list of receivers
              subject: "Forgot Password", // Subject line
              text: `Your Auth OTP is ${otp}`, // plain text body
            });
          } catch (err) {
              console.log("Error in sending otp email", err.message);
            return res.status(400).json({message:"Error in sending mail"});
          }
          return res.status(201).json({ message: "OTP Sent successfully!", otp: String(otp) });
        case "phone":
          try {
            const phoneNumber = value;
            const text = `OTP for forgot password is ${otp}. `;
            await twilio.messages.create({
              from: `${process.env.TWILIO_phnumber}`,
              to: `+91${phoneNumber}`,
              body: text,
            });
          } catch (error) {
          console.log("Error in sending otp message", error.message);
          return res.status(400).json({message:"Error in sending otp message"})
          }
      }
      return res.status(201).json({ message: "OTP Sent successfully!", otp: String(otp) });
    } catch (e) {
      console.log(e);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
  
 const updatepassword =  async (req, res) => {
    const { email, newPassword } = req.body;
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      user.password = hashedPassword;
      await user.save();
      return res.status(200).json({ message: "Password updated successfully" });
    } catch (error) {
      console.error("Error updating password:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  module.exports = { signup, signin, updatepassword, forgotpass };
