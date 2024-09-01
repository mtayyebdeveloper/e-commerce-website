import {User} from '../models/User.model.js'
import {TryCatch} from '../middlewares/error_handle.middleware.js';
import {cloudinaryupload} from '../middlewares/files.middleware.js'
import bcrypt from 'bcryptjs';

const GetAllUserController = TryCatch(async (req, res) => {
    const users = await User.find({});
    if (!users) {
        return res.status(400).json({
            success: false,
            message: "no users found",
        });
    }
    res.status(200).json({
        success: true,
        data: users,
    });
});

const DeleteUserController = TryCatch(async (req, res) => {
    const { id } = req.params;
    if (!id) {
        return res.status(400).json({
            success: false,
            message: "user id is required",
        });
    }
    const user = await User.findByIdAndDelete(id);
    if (!user) {
        return res.status(400).json({
            success: false,
            message: "Something went wrong",
        });
    }
    res.status(200).json({
        success: true,
        message: "user deleted successfully",
    });
});

const updateUserController = TryCatch(async (req, res) => {
    const file =req.file;
    const _id = req.params.id;
    let {username,name,phone,email,password} =req.body;
    if (!_id) {
        return res.status(201).json({
            success: false,
            message: "user id is required",
        });
    }
    if(!file){
        return res.status(201).json({
            success: false,
            message: "image is required",
        });
    }
    if (!username || !name || !phone || !email || !password) {
        return res.status(201).json({
            success: false,
            message: "all fields are required",
        });
    }

    const salt =await bcrypt.genSalt(10);
    let hashedPassword =await bcrypt.hash(password,salt);

    if(!hashedPassword){
        return res.status(400).json({
            success: false,
            message: "Something went wrong",
        });
    }

    password =hashedPassword;

    const img =await cloudinaryupload(file.path);

    if(!img){
        return res.status(400).json({
            success: false,
            message: "Something went wrong",
        });
    }

    const user = await User.findByIdAndUpdate(_id, {
        username,
        name,
        phone,
        email,
        avatar:{
            public_id:img.public_id,
            url:img.url
        },
        password
    });
    if (!user) {
        return res.status(400).json({
            success: false,
            message: "Something went wrong",
        });
    }
    res.status(200).json({
        success: true,
        message: "user updated successfully",
    });
});

export { GetAllUserController,DeleteUserController,updateUserController }