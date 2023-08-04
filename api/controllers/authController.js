const User=require('../models/userModel.js');
const Post=require('../models/postModel.js');
const ErrorResponse=require('../utils/errorResponse.js')
const crypto = require("crypto");
const cloudinary=require('../utils/cloudinary.js')
exports.signup=async(req,res,next)=>{
    const { email } = req.body;
    const userExist = await User.findOne({ email });
    if (userExist) {
        return next(new ErrorResponse("E-mail already registred", 400));
    }
    try {
        const user = await User.create(req.body);
        res.status(200).json({
          success: true,
          user
      })
        
    } catch (error) {
        next(error);
    }
}

exports.signin=async(req,res,next)=>{
    try {
        const { email, password } = req.body;
        //validation
        if (!email) {
            return next(new ErrorResponse("please add an email", 403));
        }
        if (!password) {
            return next(new ErrorResponse("please add a password", 403));
        }

        //check user email
        const user = await User.findOne({ email });
        if (!user) {
            return next(new ErrorResponse("invalid credentials", 400));
        }
        //check password
        const isMatched = await user.comparePassword(password);
        if (!isMatched) {
            return next(new ErrorResponse("invalid credentials", 400));
        }
        sendTokenResponse(user, 200, res);

    } catch (error) {
        next(error);
    }
}
exports.showUser = async (req, res, next) => {
  try {
      const users = await User.find()
      res.status(201).json({
          success: true,
          users
      })
  } catch (error) {
      console.log(error)
      next(error);
  }

}
const sendTokenResponse = async (user, codeStatus, res) => {
    const token = await user.getJwtToken();
    const options = { httpOnly:true,sameSite: 'none', secure: true,maxAge: 60 * 60 * 1000*24*5}
    res
        .status(codeStatus)
        .cookie('token', token, options)
        .json({
            success: true,
            id: user._id,
            role: user.role
        })
}
exports.logout = (req, res, next) => {
    res.clearCookie('token');
    res.status(200).json({
        success: true,
        message: "logged out"
    })
}
exports.userProfile = async (req, res, next) => {
    const user = await User.findById(req.user.id);
    res.status(200).json({
        success: true,
        user
    })
}
exports.updateProfile = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        const currentProfile = await User.findById(req.user.id);

        //build the object data
        const data = {
            name: name|| currentProfile.name,
            email: email|| currentProfile.email,
            password: password|| currentProfile.password,
        }
        const profileUpdate = await User.findByIdAndUpdate(req.user.id, data, { new: true });

        res.status(200).json({
            success: true,
            profileUpdate
        })

    } catch (error) {
        next(error);
    }

}
exports.updateRole = async (req, res, next) => {
  try {
      const {role} = req.body;
      const currentrole = await User.findById(req.params.id);

      //build the object data
      const data = {
          role: role|| currentrole.role,
      }
      const roleUpdate = await User.findByIdAndUpdate(req.params.id, data, { new: true });

      res.status(200).json({
          success: true,
          roleUpdate
      })

  } catch (error) {
      next(error);
  }

}
exports.deleteUser = async (req, res, next) => {
  const currentuser=await User.findById(req.params.id)
  const currentPosts = await Post.find({postedBy:currentuser._id});

  //delete post image in cloudinary
  for(const currentPost of currentPosts){ 
    const ImgId = currentPost.image.public_id;
    if (ImgId) {
        await cloudinary.uploader.destroy(ImgId);
    }
  }       
 
  try {
      const deletepost=await Post.deleteMany({postedBy:currentuser.id});
      const user=await User.findByIdAndRemove(currentuser.id)
      res.status(200).json({
          success: true,
          message: "User deleted"
      })

  } catch (error) {
      next(error);
  }

}
