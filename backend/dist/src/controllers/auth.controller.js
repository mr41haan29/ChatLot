import prisma from "../db/prisma.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";
export const signup = async (req, res) => {
    try {
        const { fullName, username, password, confirmPassword, gender } = req.body;
        if (!fullName || !username || !password || !confirmPassword || !gender) {
            return res.status(400).json({ error: "Please fill in all the fields" });
        }
        if (password !== confirmPassword) {
            return res.status(400).json({ error: "Passwords do not match" });
        }
        const user = await prisma.user.findUnique({
            where: { username: username },
        });
        if (user) {
            return res.status(400).json({ error: "Username is already taken" });
        }
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);
        const profilePic = `https://avatar.iran.liara.run/public/${gender === "male" ? "boy" : "girl"}?username=${username}`;
        const newUser = await prisma.user.create({
            data: {
                fullName: fullName,
                username: username,
                password: hashedPassword,
                gender: gender,
                profilePic: profilePic,
            },
        });
        if (newUser) {
            //generate JWT
            generateToken(newUser.id, res);
            return res.status(201).json({
                id: newUser.id,
                fullName: newUser.fullName,
                username: newUser.username,
                profilePic: newUser.profilePic,
            });
        }
        else {
            return res.status(400).json({ error: "Invalid user data" });
        }
    }
    catch (error) {
        console.log("error in signup controller", error.message);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};
export const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({ error: "Please fill in all the fields" });
        }
        const user = await prisma.user.findUnique({
            where: { username: username },
        });
        if (!user) {
            return res.status(400).json({ error: "User does not exist" });
        }
        const isPasswordMatching = await bcrypt.compare(password, user.password);
        if (!isPasswordMatching) {
            return res.status(400).json({ error: "Incorrect password" });
        }
        //user has given correct credentials, so sign them in
        generateToken(user.id, res);
        return res.status(200).json({
            id: user.id,
            fullName: user.fullName,
            username: user.username,
            profilePic: user.profilePic,
        });
    }
    catch (error) {
        console.log("error in login controller", error.message);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};
export const logout = async (req, res) => {
    //simply clear the cookie that has the JWT
    try {
        res.clearCookie("jwt", {
            httpOnly: true,
            sameSite: "strict",
            secure: process.env.NODE_ENV !== "development",
        });
        return res.status(200).json({ message: "Logged out successfully" });
    }
    catch (error) {
        console.log("error in logout controller", error.message);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};
export const getMe = async (req, res) => {
    //get the current user
    try {
        const user = await prisma.user.findUnique({
            where: { id: req.user.id },
        });
        if (!user) {
            return res.status(400).json({ error: "User not found" });
        }
        return res.status(200).json({
            id: user.id,
            fullName: user.fullName,
            username: user.username,
            profilePic: user.profilePic,
        });
    }
    catch (error) {
        console.log("error in getMe controller", error.message);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};
