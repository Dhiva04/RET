var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt=require('bcrypt-nodejs');
var uuid = require('uuid');



var AllowanceSchema=new Schema({
    _id: {
        type: String,
        index: { unique: true },
        default: uuid.v4
    },
    allowanceType:{type:String,required:true},
    empId:{type:String,required:true},
    empName:{type:String,required:true},
    applyDate:{type:String,required:true},
    approveDate:{type:String},
    description :{type:String,required:true},
    status:{type:String, default:'request'},
    adminId:{type:String},
    approvedBy:{type:String},
    amount:{type:String,required:true},
    reason:{type:String,default:'null'}
});

module.exports=mongoose.model('Allowance',AllowanceSchema);
