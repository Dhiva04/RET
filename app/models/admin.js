var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt=require('bcrypt-nodejs');
var uuid = require('uuid');



var AdminSchema=new Schema({
    _id: {
        type: String,
        index: { unique: true },
        default: uuid.v4
    },
    firstName:{type:String,required:true},
    lastName:{type:String,required:true},
    age:{type:String,required:true},
    gender:{type:String,required:true},
    adminId:{type:String,required:true,unique:true},
    mobile:{type:String,required:true,unique:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    dateOfBirth:{type:String,requied:true},
    salary:{type:String,required:true},
    dateOfJoin:{type:String,required:true},
    designation:{type:String,required:true},
    bankName:{type:String,required:true},
    accountNumber:{type:String,required:true,unique:true},
    accountHolderName:{type:String,required:true},
    ifscCode:{type:String,requied:true},
    branchName:{type:String,requied:true},
    address:{type:String,required:true},
    status:{type:String,default: 'pending'},
    tempToken:{type:String}


});
AdminSchema.pre('save',function (next) {
    var user =this;
    bcrypt.hash(user.password,null,null,function (err,hash) {
        if(err) return next(err);
        user.password=hash;
        next();
    })
});
AdminSchema.methods.comparePassword=function (password) {
    return bcrypt.compareSync(password,this.password);
}
module.exports=mongoose.model('Admin',AdminSchema);
