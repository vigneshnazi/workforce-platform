const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
  try {
    const { name, email, password, role, city, phone } = req.body;

    // 1. Check if user exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // 2. Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 3. Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
      city,
      phone,
    });

    // 4. Send response
    res.status(201).json({
      message: "User registered successfully",
      userId: user._id,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const loginUser = async(req, res) => {
  try {
    const {email, password} = req.body;

    // Check if user exist
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({message:"Invalid credentials"});
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({message:"Invalid credentials"});
    }

    // Generate JWT
    const token = jwt.sign(
      {id: user._id, role: user.role},
      process.env.JWT_SECRET,
      {expiresIn: "7d"}
    );

    // Send Response
    res.json({
      message: "Login Successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        role: user.role,
        city: user.city
      },
    });
  } catch (error) {
    res.status(500).json({message: error.message});
  }
};

module.exports = { registerUser, loginUser };