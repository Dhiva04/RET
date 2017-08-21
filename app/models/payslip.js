var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var uuid = require('uuid');

var PayslipSchema=new Schema({
    _id: {
        type: String,
        index: { unique: true },
        default: uuid.v4
    },
    objectId:{type: String,required:true},
    firstName:{type:String,required:true},
    lastName:{type:String,required:true},
    empId:{type:String,required:true,unique:true},
    salary:{type:String,required:true},
    dateOfJoin:{type:String,required:true},
    designation:{type:String,required:true},
    bankName:{type:String,required:true},
    accountNumber:{type:String,required:true,unique:true},
    accountHolderName:{type:String,required:true},
    ifscCode:{type:String,requied:true},
    branchName:{type:String,requied:true},
    otherAllowance:{type:String,required:true},
    houseAllowance:{type:String,required:true},
    medicalAllowance:{type:String,required:true},
    deduction:{type:String,required:true},
    totalEarning:{type:String,required:true},
    totalDeduction:{type:String,required:true},
    netAmount:{type:String,required:true},
    date:{type:String,required:true},
    year:{type:String ,required:true},
    month:{type:String,required:true}


});

module.exports=mongoose.model('Payslip',PayslipSchema);
