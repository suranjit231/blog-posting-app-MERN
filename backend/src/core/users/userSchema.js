import mongoose from 'mongoose';

const { Schema } = mongoose;

//============== user schema defination ================//
const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  email: {type: String, unique: [true, "Email is already exist!"], required: true,
    match: [/.+\@.+\../, "Please enter a valid email"]
 },
  password: {
    type: String,
    required: true
  },
    avatar: {
      type: String,
      trim: true
    },
    blogs:[
      {
        type:mongoose.Schema.Types.ObjectId,
        ref:"Blog"
      }
    ]
   
}, {
  timestamps: true
});


//============= export the User model ==============//
const userModel = mongoose.model('User', userSchema);
export default userModel;