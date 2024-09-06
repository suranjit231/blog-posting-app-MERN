import mongoose from "mongoose";
import userModel from "./userSchema.js";
import { hashPassword, verifyPassword } from "../../utils/hashPassword.js";
import { AppError } from "../../middleware/errorHandler.middleware.js";


export default class UserRepository{

    //------ user signup ------//
    async signup(userData){
        try{
           const {name, email, password} = userData;
           if(!name || !email || !password){

                throw new AppError("Please enter the required field!", 400);
           }
           const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;
           if (!passwordRegex.test(password)) {
            throw new AppError("Password must strong!", 400)
          }

          const passwordHashed = await hashPassword(password);
          userData.password = passwordHashed;

          const newUser = new userModel(userData);
          const savedUser = await newUser.save();
          const removedPasswordUser = this.removePasswordField(savedUser);



          return {success:true, message:"User signup sucessful!", user:removedPasswordUser};

        }catch(error){
           throw error;
            
        }
    }


    //---------- user signin methods -----------//

    async signin(email, password){
        try{

            const user = await userModel.findOne({email:email});
            console.log("user: ", user)
            if(!user){

                throw new AppError("user not found with this email ID!", 404);
            }

            const comparePasswordResult = await verifyPassword(user.password, password);
            if(!comparePasswordResult){
                throw new AppError("invalid password!", 400);
            }

            const removedPasswordUser = this.removePasswordField(user)

            return {success:true, msg:"user signin sucessful!", user:removedPasswordUser};

        }catch(error){
           console.log("error in signin: ", error)

            throw error;
        }
    }

    //======= a utility methods for removing password form user before returning responses =====//
    removePasswordField(user) {
        const { password, ...userWithoutPassword } = user.toObject();
        return userWithoutPassword;
    }

}