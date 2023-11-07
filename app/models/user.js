const mongoose = require('mongoose');
const { Schema } = mongoose;
const validator = require('validator'); 
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide your name'],
    },
    email: {
      type: String,
      required: [true, 'Please provide your email'],
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, 'Please provide a valid email'],
    },
    avatar: {
      type: String,
      default: 'default.jpg',
    },
    role: {
      type: String,
      enum: ['user', 'guide', 'lead-guide', 'admin'],
      default: 'user',
    },
    password: {
      type: String,
      required: [true, 'Please provide a password'],
      minlength: 6,
      select: false,
    },
    passwordConfirm: {
      type: String,
      required: [true, 'Please confirm your password'],
      validate: {
        validator: function (el) {
          return el === this.password;
        },
        message: 'Passwords are not the same!',
      },
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
    active: {
      type: Boolean,
      default: true,
      select: false,
    },
  },
  {
    timestamps: true,
  }
);
//get user (active not false)
userSchema.pre(/^find/, function (next) {
  this.find({ active: { $ne: false } });
  next();
});
//hash password and delete passwordConfirm before save to db
userSchema.pre('save',async function(next){
  if(!this.isModified('password')) return next();
  //hash password
  this.password = await bcrypt.hash(this.password,12);
  //delete passwordConfirm
  this.passwordConfirm = undefined;
  next();
});
//set passwordChangedAt
userSchema.pre('save',async function(next){
  if(!this.isModified('password')||this.isNew) return next();
  this.passwordChangedAt = Date.now()-1000;
  next();
});
//create jwt token
userSchema.methods.signToken = function(){
  return jwt.sign({id: this._id},process.env.JWT_SECRET,{
    //set time
    expiresIn : 3600
  });
};
//check password match
userSchema.methods.checkPasswordMatch = async function(password){
  return await bcrypt.compare(password,this.password);
};
//check changed password after JWT token is issued
userSchema.methods.changedPasswordAfter = function(JWTTimestamp){
  if(this.passwordChangedAt){
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime()/1000,10
    );
    return JWTTimestamp < changedTimestamp;
  }
  return false;
};
//Creates and returns a token used to reset the password
userSchema.methods.createPasswordResetToken = function(){
  //tạo chuỗi ngẫu nhiên 32 bytes dạng hex string
  const resetToken = crypto.randomBytes(32).toString('hex');
  this.passwordResetToken = crypto
    .createHash('sha256')//băm token
    .update(resetToken)
    .digest('hex');
  //thời gian hết hạn 10m
  this.passwordResetExpires = Date.now()+10 * 60 * 1000;
  return resetToken;
}
module.exports = mongoose.model('User', userSchema);
