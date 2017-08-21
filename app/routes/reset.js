var Admin = require('../models/admin');
var Employee = require('../models/employee');
var Payslip = require('../models/payslip');
var Allowance = require('../models/allowance');
var nodemailer = require('nodemailer');
var datetime = require('node-datetime');
var pdf = require('html-pdf');
var fs = require('fs');
var path = require('path');
var jwt = require('jsonwebtoken');
var cron = require('node-cron');
var secret = "RET";

module.exports = function (router) {


  router.get('/resetpassword', function (req, res) {
          console.log('hello');
           res.send("hello");
        });
 return router;
}