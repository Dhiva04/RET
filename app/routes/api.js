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
    router.post('/admin', function (req, res) {
        var admin = new Admin();
        admin.firstName = req.body.firstName;
        admin.lastName = req.body.lastName;
        admin.age = req.body.age;
        admin.gender = req.body.gender;
        admin.adminId = req.body.adminId;
        admin.password = req.body.password;
        admin.mobile = req.body.mobile;
        admin.email = req.body.email;
        admin.dateOfBirth = req.body.dateOfBirth;
        admin.salary = req.body.salary;
        admin.dateOfJoin = req.body.dateOfJoin;
        admin.designation = req.body.designation;
        admin.bankName = req.body.bankName;
        admin.accountNumber = req.body.accountNumber;
        admin.accountHolderName = req.body.accountHolderName;
        admin.ifscCode = req.body.ifscCode;
        admin.branchName = req.body.branchName;
        admin.address = req.body.address;
        if (req.body.firstName == null || req.body.lastName == "" || req.body.lastName == null || req.body.lastName == "" || req.body.age == null || req.body.age == ""
            || req.body.gender == null || req.body.gender == "" || req.body.adminId == null || req.body.adminId == "" || req.body.password == null || req.body.password == "" || req.body.mobile == null || req.body.mobile == "" ||
            req.body.email == null || req.body.email == "" || req.body.dateOfBirth == null || req.body.dateOfBirth == "" || req.body.salary == null || req.body.salary == "" ||
            req.body.dateOfJoin == null || req.body.dateOfJoin == "" || req.body.designation == null || req.body.designation == "" || req.body.bankName == null || req.body.bankName == ""
            || req.body.accountNumber == null || req.body.accountNumber == "" || req.body.accountHolderName == null || req.body.accountHolderName == ""
            || req.body.ifscCode == null || req.body.ifscCode == "" || req.body.branchName == null || req.body.branchName == "" || req.body.address == null || req.body.address == "") {
            res.json({success: false, message: 'Ensure that all information were provided'});
        } else {
            admin.save(function (err, data) {
                if (err) {
                    res.json({success: false, message: 'AdminId or email or mobile number already exists!!'});

                } else {
                   var transporter = nodemailer.createTransport({
                                                          service: 'gmail',
                                                          port: 465,
                                                          secure: true,
                                                          auth: {
                                                              user: 'dhiva030295@gmail.com',
                                                              pass: 'dk231425'
                                                          }
                                                      });


                                                              var mailOptions = {
                                                                            from: 'dhiva030295@gmail.com',
                                                                            to: req.body.email,
                                                                            subject: 'Login Details',
                                                                            html:
                                                                                "<header align='center'>" +
                                                                                "<a > <img   src='http://www.roundsedge.com/dev/images/retlogo.png' width='60' height='70'/>" +
                                                                               "</a><h1 align='center'>Round's Edge Technologies Pvt Ltd</h1>" +
                                                                                 "</header> " +
                                                                                 "<div align='center'> Hi "+req.body.firstName+",<br><p>welcome to Round's Edge Technologies, your AdminId "+req.body.adminId +" and your password "+req.body.password+"."+
                                                                                "</div><div class='flex-container'>" +
                                                                                 " <footer align='center'>Copyright &copy; RoundsEdge.com</footer>" +
                                                                                 "</div> "
                                                                                              }
                                     transporter.sendMail(mailOptions, function (error) {
                                                       if (error) {
                                                      console.log(error);
                                          res.json({success: false, message: "Something went Wrong please try again"});
                                                  } else {
                                           res.json({success: true, message: "Admin is created"});
                                  }
                              });
                }
            });
        }
    });

    router.get('/admin', function (req, res) {

        Admin.find(function (err, docs) {

            res.json(docs);
        })
    });

    router.delete('/admin/delete:id', function (req, res) {

        Admin.findByIdAndRemove({'_id': req.params.id}, function (err, docs) {
            if (err) {
                res.json({success: false, message: "something went wrong please try Again"});
            }
            res.json({success: true, message: "successfully Deleted"});
        });
    });

    router.put('/admin/update', function (req, res) {

        if (req.body.firstName == null || req.body.lastName == "" || req.body.lastName == null || req.body.lastName == "" || req.body.age == null || req.body.age == ""
            || req.body.gender == null || req.body.gender == "" || req.body.adminId == null || req.body.adminId == "" || req.body.password == null || req.body.password == "" || req.body.mobile == null || req.body.mobile == "" ||
            req.body.email == null || req.body.email == "" || req.body.dateOfBirth == null || req.body.dateOfBirth == "" || req.body.salary == null || req.body.salary == "" ||
            req.body.dateOfJoin == null || req.body.dateOfJoin == "" || req.body.designation == null || req.body.designation == "" || req.body.bankName == null || req.body.bankName == ""
            || req.body.accountNumber == null || req.body.accountNumber == "" || req.body.accountHolderName == null || req.body.accountHolderName == ""
            || req.body.ifscCode == null || req.body.ifscCode == "" || req.body.branchName == null || req.body.branchName == "" || req.body.address == null || req.body.address == "") {
            res.json({success: false, message: 'Ensure that all information were provided'});
        } else {
            Admin.findByIdAndUpdate(req.body._id,
                {
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    age: req.body.age,
                    gender: req.body.gender,
                    adminId: req.body.adminId,
                    mobile: req.body.mobile,
                    email: req.body.email,
                    dateOfBirth: req.body.dateOfBirth,
                    salary: req.body.salary,
                    dateOfJoin: req.body.dateOfJoin,
                    designation: req.body.designation,
                    bankName: req.body.bankName,
                    accountNumber: req.body.accountNumber,
                    accountHolderName: req.body.accountHolderName,
                    ifscCode: req.body.ifscCode,
                    branchName: req.body.branchName,
                    address: req.body.address
                }, function (err) {
                    if (err) {
                        res.json({success: false, message: 'AdminId or email or mobile number already exists!!'});

                    } else {
                        res.json({success: true, message: "Administrator is Updated"});
                    }
                })
        }
    });
    router.get('/admin:id', function (req, res) {

        Admin.findOne({'_id': req.params.id}, function (err, docs) {
            res.json(docs);
        })
    });

    router.post('/authenticate', function (req, res) {

        if(req.body.id.substring(0,5)=="Admin"){
        Admin.findOne({adminId: req.body.id}).select('adminId firstName email password ').exec(function (err, admin) {
            if (err) throw (err);

            if (!admin) {

                res.json({success: false, message: 'could not authenticate Admin'});
            }
            else if (admin) {
                if (req.body.password) {
                    var validPassword = admin.comparePassword(req.body.password);
                }
                else {
                    res.json({success: false, message: 'no password provided'});
                }
                if (!validPassword) {
                    res.json({success: false, message: 'could not authenticate Admin'});
                }
                else {
                console.log(admin);
                    var token = jwt.sign({adminId:admin.adminId,firstName: admin.firstName, email: admin.email}, secret, {expiresIn: '24h'});
                    res.json({success: true, message: "Admin authenticate successfully", token: token})
                }
            }
        });
        }
        else if(req.body.id.substring(0,4)=="Empl"){
         Employee.findOne({empId: req.body.id}).select('_id empId firstName email password ').exec(function (err, emp) {
                    if (err) throw (err);

                    if (!emp) {

                        res.json({success: false, message: 'could not authenticate employee'});
                    }
                    else if (emp) {
                        if (req.body.password) {
                            var validPassword = emp.comparePassword(req.body.password);
                        }
                        else {
                            res.json({success: false, message: 'no password provided'});
                        }
                        if (!validPassword) {
                            res.json({success: false, message: 'could not authenticate Employee'});
                        }
                        else {
                            var token = jwt.sign({empId:emp.empId,objectId:emp._id,firstName: emp.firstName, email: emp.email}, secret, {expiresIn: '24h'});
                            res.json({success: true, message: "Employee authenticate successfully", token: token})
                        }
                    }
                });
        }
else if(req.body.id && req.body.password){
res.json({success: false, message: 'Invalid UserId or Password'});
}
    });

    router.post('/forgotPassword', function (req, res) {

           if(req.body.id.substring(0,5)=="Admin"){
           Admin.findOne({adminId: req.body.id}).select('adminId firstName email password tempToken').exec(function (err, admin) {
               if (err) throw (err);

               if (!admin) {

                   res.json({success: false, message: 'Invalid Admin Id'});
               }
               else if (admin) {
              Admin.findOneAndUpdate( { adminId:admin.adminId},
                                                                             { tempToken:jwt.sign({adminId:admin.adminId,firstName: admin.firstName, email: admin.email}, secret, {expiresIn: '24h'})}
                                                                             ).exec(function ( err,dat){
                                                                             console.log(dat)
                                                                              Admin.findOne({adminId: req.body.id}).select('tempToken').exec(function (err, temp) {
                                                                                console.log(temp);
                                                                                                      var transporter = nodemailer.createTransport({
                                                                                                                                              service: 'gmail',
                                                                                                                                              port: 465,
                                                                                                                                              secure: true,
                                                                                                                                              auth: {
                                                                                                                                                  user: 'dhiva030295@gmail.com',
                                                                                                                                                  pass: 'dk231425'
                                                                                                                                              }
                                                                                                                                          });


                                                                                                                                                  var mailOptions = {
                                                                                                                                                                from: 'dhiva030295@gmail.com',
                                                                                                                                                                to: admin.email,
                                                                                                                                                                subject: 'Reset Password',
                                                                                                                                                                html:
                                                                                                                                                                    "<header align='center'>" +
                                                                                                                                                                    "<a > <img   src='http://www.roundsedge.com/dev/images/retlogo.png' width='60' height='70'/>" +
                                                                                                                                                                   "</a><h1 align='center'>Round's Edge Technologies Pvt Ltd</h1>" +
                                                                                                                                                                     "</header> " +
                                                                                                                                                                     "<div align='center'> Hi "+admin.firstName+",<br><p>Please click the  link for Reset your password.<br> <a href='http://localhost:8000/resetPassword/"+temp.tempToken+"'>Reset password</a>"+
                                                                                                                                                                    "</div><div class='flex-container'>" +
                                                                                                                                                                     " <footer align='center'>Copyright &copy; RoundsEdge.com</footer>" +
                                                                                                                                                                     "</div> "
                                                                                                                                                                                  }
                                                                                                                         transporter.sendMail(mailOptions, function (error) {
                                                                                                                                           if (error) {
                                                                                                                                          console.log(error);
                                                                                                                              res.json({success: false, message: "Something went Wrong please try again"});
                                                                                                                                      } else {
                                                                                                                               res.json({success: true, message: "Reset link Successfully sent"});
                                                                                                                      }




                                                                             })
                                                                     })
                                                                     })
                   }
               })
           }

           else if(req.body.id.substring(0,4)=="Empl"){
            Employee.findOne({empId: req.body.id}).select('_id empId firstName email tempToken').exec(function (err, emp) {
                       if (err) throw (err);

                       if (!emp) {

                           res.json({success: false, message: 'Invalid Employee Id'});
                       }
                       else if (emp) {
                                Employee.findOneAndUpdate( { empId:emp.empId},
                                                               { tempToken:jwt.sign({empId:emp.empId,firstName: emp.firstName, email: emp.email}, secret, {expiresIn: '24h'})}
                                                               ).exec(function ( err,dat){
                                                               console.log(dat)
                                                                Employee.findOne({empId: req.body.id}).select('tempToken').exec(function (err, temp) {
                                                                  console.log(temp);
                                                                                        var transporter = nodemailer.createTransport({
                                                                                                                                service: 'gmail',
                                                                                                                                port: 465,
                                                                                                                                secure: true,
                                                                                                                                auth: {
                                                                                                                                    user: 'dhiva030295@gmail.com',
                                                                                                                                    pass: 'dk231425'
                                                                                                                                }
                                                                                                                            });


                                                                                                                                    var mailOptions = {
                                                                                                                                                  from: 'dhiva030295@gmail.com',
                                                                                                                                                  to: emp.email,
                                                                                                                                                  subject: 'Reset Password',
                                                                                                                                                  html:
                                                                                                                                                      "<header align='center'>" +
                                                                                                                                                      "<a > <img   src='http://www.roundsedge.com/dev/images/retlogo.png' width='60' height='70'/>" +
                                                                                                                                                     "</a><h1 align='center'>Round's Edge Technologies Pvt Ltd</h1>" +
                                                                                                                                                       "</header> " +
                                                                                                                                                       "<div align='center'> Hi "+emp.firstName+",<br><p>Please click the  link for Reset your password.<br> <a href='http://localhost:8000/resetPassword/"+temp.tempToken+"'>Reset password</a>"+
                                                                                                                                                      "</div><div class='flex-container'>" +
                                                                                                                                                       " <footer align='center'>Copyright &copy; RoundsEdge.com</footer>" +
                                                                                                                                                       "</div> "
                                                                                                                                                                    }
                                                                                                           transporter.sendMail(mailOptions, function (error) {
                                                                                                                             if (error) {
                                                                                                                            console.log(error);
                                                                                                                res.json({success: false, message: "Something went Wrong please try again"});
                                                                                                                        } else {
                                                                                                                 res.json({success: true, message: "Reset link Successfully sent"});
                                                                                                        }




                                                               })
                                                       })
                                                       })

                                                }
                                                })
                                                }



   else if(req.body.id){
   res.json({success: false, message: 'Invalid UserId '});
   }
       });
    router.use(function (req, res, next) {
        var token = req.body.token || req.body.query || req.headers['x-access-token'] || req.params.token;
        if (token) {
            jwt.verify(token, secret, function (err, decoded) {
                if (err) {
                    res.json({success: false, message: 'Token Invaild'});
                } else {
                    req.decoded = decoded;
                    next();
                }
            });
        } else {
            res.json({success: false, message: "No token provided"})
        }

    });
    router.post('/me', function (req, res) {
        res.send(req.decoded);

    });
    router.post('/employee', function (req, res) {
        var emp = new Employee();
        emp.firstName = req.body.firstName;
        emp.lastName = req.body.lastName;
        emp.age = req.body.age;
        emp.gender = req.body.gender;
        emp.empId = req.body.empId;
        emp.password = req.body.password;
        emp.mobile = req.body.mobile;
        emp.email = req.body.email;
        emp.dateOfBirth = req.body.dateOfBirth;
        emp.salary = req.body.salary;
        emp.dateOfJoin = req.body.dateOfJoin;
        emp.designation = req.body.designation;
        emp.bankName = req.body.bankName;
        emp.accountNumber = req.body.accountNumber;
        emp.accountHolderName = req.body.accountHolderName;
        emp.ifscCode = req.body.ifscCode;
        emp.branchName = req.body.branchName;
        emp.address = req.body.address;
        if (req.body.firstName == null || req.body.lastName == "" || req.body.lastName == null || req.body.lastName == "" || req.body.age == null || req.body.age == ""
            || req.body.gender == null || req.body.gender == "" || req.body.empId == null || req.body.empId == "" || req.body.password == null || req.body.password == "" || req.body.mobile == null || req.body.mobile == "" ||
            req.body.email == null || req.body.email == "" || req.body.dateOfBirth == null || req.body.dateOfBirth == "" || req.body.salary == null || req.body.salary == "" ||
            req.body.dateOfJoin == null || req.body.dateOfJoin == "" || req.body.designation == null || req.body.designation == "" || req.body.bankName == null || req.body.bankName == ""
            || req.body.accountNumber == null || req.body.accountNumber == "" || req.body.accountHolderName == null || req.body.accountHolderName == ""
            || req.body.ifscCode == null || req.body.ifscCode == "" || req.body.branchName == null || req.body.branchName == "" || req.body.address == null || req.body.address == "") {
            res.json({success: false, message: 'Ensure that all information were provided'});
        } else {
            emp.save(function (err, data) {
                if (err) {
                    console.log(err);

                    res.json({success: false, message: 'EmpId or email or mobile number already exists!!'});

                } else {
                var transporter = nodemailer.createTransport({
                                        service: 'gmail',
                                        port: 465,
                                        secure: true,
                                        auth: {
                                            user: 'dhiva030295@gmail.com',
                                            pass: 'dk231425'
                                        }
                                    });


                                            var mailOptions = {
                                                          from: 'dhiva030295@gmail.com',
                                                          to: req.body.email,
                                                          subject: 'Login Details',
                                                          html:
                                                              "<header align='center'>" +
                                                              "<a > <img   src='http://www.roundsedge.com/dev/images/retlogo.png' width='60' height='70'/>" +
                                                             "</a><h1 align='center'>Round's Edge Technologies Pvt Ltd</h1>" +
                                                               "</header> " +
                                                               "<div align='center'> Hi "+req.body.firstName+",<br><p>welcome to Round's Edge Technologies, your EmployeeId "+req.body.empId +" and your password "+req.body.password+"."+
                                                              "</div><div class='flex-container'>" +
                                                               " <footer align='center'>Copyright &copy; RoundsEdge.com</footer>" +
                                                               "</div> "
                                                                            }
                   transporter.sendMail(mailOptions, function (error) {
                                     if (error) {
                                    console.log(error);
                        res.json({success: false, message: "Something went Wrong please try again"});
                                } else {
                         res.json({success: true, message: "Employee is created"});
                }
            });
        }

    });
    }
    });

    router.get('/employee', function (req, res) {

        Employee.find(function (err, docs) {

            res.json(docs);
        })
    });

    router.delete('/employee/delete:id', function (req, res) {

        Employee.findByIdAndRemove({'_id': req.params.id}, function (err, docs) {
            if (err) {
                res.json({success: false, message: "something went wrong please try Again"});
            }
            res.json({success: true, message: "successfully Deleted"});
        });
    });

    router.put('/employee/update', function (req, res) {

        if (req.body.firstName == null || req.body.lastName == "" || req.body.lastName == null || req.body.lastName == "" || req.body.age == null || req.body.age == ""
            || req.body.gender == null || req.body.gender == "" || req.body.empId == null || req.body.empId == "" || req.body.password == null || req.body.password == "" || req.body.mobile == null || req.body.mobile == "" ||
            req.body.email == null || req.body.email == "" || req.body.dateOfBirth == null || req.body.dateOfBirth == "" || req.body.salary == null || req.body.salary == "" ||
            req.body.dateOfJoin == null || req.body.dateOfJoin == "" || req.body.designation == null || req.body.designation == "" || req.body.bankName == null || req.body.bankName == ""
            || req.body.accountNumber == null || req.body.accountNumber == "" || req.body.accountHolderName == null || req.body.accountHolderName == ""
            || req.body.ifscCode == null || req.body.ifscCode == "" || req.body.branchName == null || req.body.branchName == "" || req.body.address == null || req.body.address == "") {
            res.json({success: false, message: 'Ensure that all information were provided'});
        } else {
            Employee.findByIdAndUpdate(req.body._id,
                {
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    age: req.body.age,
                    gender: req.body.gender,
                    empId: req.body.empId,
                    mobile: req.body.mobile,
                    email: req.body.email,
                    dateOfBirth: req.body.dateOfBirth,
                    salary: req.body.salary,
                    dateOfJoin: req.body.dateOfJoin,
                    designation: req.body.designation,
                    bankName: req.body.bankName,
                    accountNumber: req.body.accountNumber,
                    accountHolderName: req.body.accountHolderName,
                    ifscCode: req.body.ifscCode,
                    branchName: req.body.branchName,
                    address: req.body.address
                }, function (err) {
                    if (err) {
                        res.json({success: false, message: 'EmpId or email or mobile number already exists!!'});

                    } else {
                        res.json({success: true, message: "Employee is Updated"});
                    }
                })
        }
    });
    router.get('/employee:id', function (req, res) {
        Employee.findOne({'_id': req.params.id}, function (err, docs) {
            res.json(docs);
        })
    });
    router.get('/employee/payslip:id',function (req,res) {


        Payslip.findOne({'objectId': req.params.id}, function (err, data) {

            res.json(data);

        })
    });
    router.post('/employee/payslip', function (req, res) {
       console.log("request received");

        var salary = Number(req.body.salary);
        var allowance = Number(req.body.allowance);
        var deduction = Number(req.body.deduction);
        var allowanceHouse = Number(req.body.allowanceHouse);
        var allowanceMedical = Number(req.body.allowanceMedical);
        var earning = salary + allowance + allowanceHouse + allowanceHouse;
        var total = earning - deduction;
        var monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        var d = new Date();
        var dt = datetime.create();
        var year = dt.format('Y');
        var date =dt.format('d-m-Y');


        var transporter = nodemailer.createTransport({
            service: 'gmail',
            port: 465,
            secure: true,
            auth: {
                user: 'dhiva030295@gmail.com',
                pass: 'dk231425'
            }
        });

        var temp = {
            html: "<html>" +
            "<head>" +
            "<style>" +
            ".flex-container " +
            "{display: -webkit-flex;" +
            "display: flex;" +
            " -webkit-flex-flow:row wrap;" +
            "flex-flow: row wrap;" +
            "text-align: center;}.flex-container > *" +
            " {padding: 15px; -webkit-flex: 1 100%;flex: 1 100%;}" +
            ".article {text-align: left;}" +
            "header {background:darkgrey;color:white;}" +
            "footer {background: #aaa;color:white;}@media all and (min-width: 768px)" +
            " {.nav {text-align:left;-webkit-flex: 1 auto;flex:1 auto;-webkit-order:1;order:1;}" +
            ".article {-webkit-flex:5 0px;flex:5 0px;-webkit-order:2;order:2;}footer {-webkit-order:3;order:3;}}" +
            "  table {border-collapse: collapse;width: 100%;}th {text-align: left;}" + "h4.r {text-align:end} h4.l{text-align:left} h4.c{text-align:center}" +

            "div.center {margin-left: 160px } div.cen {margin-left: 70px }" +
            "</style>" +
            " </head> " +
            "<body>" +
            "<div class='flex-container'>" +
            "<header class='text-align-center'>" +
            "<a> <img src='http://www.roundsedge.com/dev/images/retlogo.png' width='60' height='70'/>" +
            "</a><h1>Round's Edge Technologies Pvt Ltd</h1>" +
            "</header> " +
            "<h2>PaySlip for the Month of " + monthNames[d.getMonth()] + " " + year + "</h2></div>" +
            "<div class='center'> " +
            "<table> " +
            "<tr>" +
            "<td>EmployeeId :" + req.body.empId + "</td>" +
            "<td>Name :" + req.body.firstName + " " + req.body.lastName + "</td>" +
            "</tr>" +
            "<tr>" +
            "<td>Date Of Joining :" + req.body.dateOfJoin + "</td> " +
            "<td>Designation :" + req.body.designation + "</td>" +
            "</tr>" +
            "<tr>" +
            "<td>Bank Name :" + req.body.bankName + "</td>" +
            "<td>Account Number :" + req.body.accountNumber + "</td>" +
            "</tr> " +
            "<tr>" +
            "<td>Branch Name :" + req.body.branchName + "</td>" +
            "<td>IFSC Code :" + req.body.ifscCode + "</td>" +
            "</tr> " +
            " </table> " +
            "<h4></div>" +
            "<div class='cen'><table >" +
            " <col width='300'> " +
            "<col width='100'> " +
            "<col width='300'> " +
            "<col width='100'>" +
            " <tr>" +
            " <th>Earnings</th>" +
            " <th>Amount</th> " +
            "<th>Deduction</th> " +
            "<th>Amount</th> " +
            "</tr> " +
            "<tr> " +
            "<td>Basic Pay</td> " +
            "<td>" + req.body.salary + ".00</td>" +
            " <td>Deduction Amount</td>" +
            " <td>" + req.body.deduction + "</td> " +
            "</tr> " +
            "<tr>" +
            " <td>Allowance</td> " +
            "<td>" + req.body.allowance + ".00</td> " +
            "</tr> " +
            "<tr> " +
            "<td>House Rent Allowance</td> " +
            "<td>" + allowanceHouse + ".00</td> " +
            "</tr>" +
            " <tr>" +
            " <td>Medical Allowance</td> " +
            "<td>" + allowanceMedical + ".00</td> " +
            "</tr>" +
            " <tr>" +
            " <td>Total Earnings</td> " +
            "<td>" + earning + ".00</td>" +
            " <td>Total Deduction</td>" +
            " <td>" + deduction + ".00</td>" +
            " </tr> " +
            "</table>" +
            "</h4>" +
            "</div>" +
            " <h4 class='c'> Net Pay(Rounded)  :" + total + "</h4> <br><br><br>" +
            "<h4 class='r'> CEO Signature </h4>" +
            "<div class='flex-container'>" +
            " <footer>Copyright &copy; RoundsEdge.com</footer>" +
            "</div> " +
            " </body>" +
            " </html>"

        };


        pdf.create(temp.html, function (err, data) {
            if (err) return console.log(err);
            if (data) {
                var mailOptions = {
                    from: 'dhiva030295@gmail.com',
                    to: req.body.email,
                    subject: 'Payslip',
                    text: 'your pay slip',
                    attachments: [
                        {
                            filename: 'payslip.pdf',
                            path: 'C:'+data.filename,
                        }]
                };

                transporter.sendMail(mailOptions, function (error) {
                    if (error) {
                        console.log(error);
                        res.json({success: false, message: "Something went Wrong please try again"})
                    } else {
                        var pay = new Payslip();
                        pay.firstName = req.body.firstName;
                        pay.lastName = req.body.lastName;
                        pay.empId = req.body.empId;
                        pay.salary = req.body.salary;
                        pay.dateOfJoin = req.body.dateOfJoin;
                        pay.designation = req.body.designation;
                        pay.bankName = req.body.bankName;
                        pay.accountNumber = req.body.accountNumber;
                        pay.accountHolderName = req.body.accountHolderName;
                        pay.ifscCode = req.body.ifscCode;
                        pay.branchName = req.body.branchName;
                        pay.objectId= req.body._id;
                        pay.otherAllowance=req.body.allowance;
                        pay.houseAllowance=req.body.allowanceHouse;
                        pay.medicalAllowance=req.body.allowanceMedical;
                        pay.deduction=req.body.deduction;
                        pay.totalEarning=earning;
                        pay.totalDeduction=req.body.deduction;
                        pay.netAmount=total;
                        pay.date=date;
                        pay.status='success';
                        pay.year=year;
                        pay.month=monthNames[d.getMonth()];
                        pay.save(function (){

                         Employee.findByIdAndUpdate(req.body._id,{status:'success'},function(){


                                        res.json({success: true, message: "Email sent successfully"});

                                        })

                                })

                    }
                });
            }
        });


    })

    router.put('/employee/payslip', function (req, res) {
           console.log("PUT request received");

            var salary = Number(req.body.salary);
            var allowance = Number(req.body.allowance);
            var deduction = Number(req.body.deduction);
            var allowanceHouse = Number(req.body.allowanceHouse);
            var allowanceMedical = Number(req.body.allowanceMedical);
            var earning = salary + allowance + allowanceHouse + allowanceHouse;
            var total = earning - deduction;
            var monthNames = ["January", "February", "March", "April", "May", "June",
                "July", "August", "September", "October", "November", "December"
            ];
            var d = new Date();
            var dt = datetime.create();
            var year = dt.format('Y');
            var date =dt.format('d-m-Y');


            var transporter = nodemailer.createTransport({
                service: 'gmail',
                port: 465,
                secure: true,
                auth: {
                    user: 'dhiva030295@gmail.com',
                    pass: 'dk231425'
                }
            });

            var temp = {
                html: "<html>" +
                "<head>" +
                "<style>" +
                ".flex-container " +
                "{display: -webkit-flex;" +
                "display: flex;" +
                " -webkit-flex-flow:row wrap;" +
                "flex-flow: row wrap;" +
                "text-align: center;}.flex/-container > *" +
                " {padding: 15px; -webkit-flex: 1 100%;flex: 1 100%;}" +
                ".article {text-align: left;}" +
                "header {background:darkgrey;color:white;}" +
                "footer {background: #aaa;color:white;}@media all and (min-width: 768px)" +
                " {.nav {text-align:left;-webkit-flex: 1 auto;flex:1 auto;-webkit-order:1;order:1;}" +
                ".article {-webkit-flex:5 0px;flex:5 0px;-webkit-order:2;order:2;}footer {-webkit-order:3;order:3;}}" +
                "  table {border-collapse: collapse;width: 100%;}th {text-align: left;}" + "h4.r {text-align:end} h4.l{text-align:left} h4.c{text-align:center}" +

                "div.center {margin-left: 160px } div.cen {margin-left: 70px }" +
                "</style>" +
                " </head> " +
                "<body>" +
                "<div class='flex-container'>" +
                "<header class='text-align-center'>" +
                "<a> <img src='http://www.roundsedge.com/dev/images/retlogo.png' width='60' height='70'/>" +
                "</a><h1>Round's Edge Technologies Pvt Ltd</h1>" +
                "</header> " +
                "<h2>PaySlip for the Month of " + monthNames[d.getMonth()] + " " + year + "</h2></div>" +
                "<div class='center'> " +
                "<table> " +
                "<tr>" +
                "<td>EmployeeId :" + req.body.empId + "</td>" +
                "<td>Name :" + req.body.firstName + " " + req.body.lastName + "</td>" +
                "</tr>" +
                "<tr>" +
                "<td>Date Of Joining :" + req.body.dateOfJoin + "</td> " +
                "<td>Designation :" + req.body.designation + "</td>" +
                "</tr>" +
                "<tr>" +
                "<td>Bank Name :" + req.body.bankName + "</td>" +
                "<td>Account Number :" + req.body.accountNumber + "</td>" +
                "</tr> " +
                "<tr>" +
                "<td>Branch Name :" + req.body.branchName + "</td>" +
                "<td>IFSC Code :" + req.body.ifscCode + "</td>" +
                "</tr> " +
                " </table> " +
                "<h4></div>" +
                "<div class='cen'><table >" +
                " <col width='300'> " +
                "<col width='100'> " +
                "<col width='300'> " +
                "<col width='100'>" +
                " <tr>" +
                " <th>Earnings</th>" +
                " <th>Amount</th> " +
                "<th>Deduction</th> " +
                "<th>Amount</th> " +
                "</tr> " +
                "<tr> " +
                "<td>Basic Pay</td> " +
                "<td>" + req.body.salary + ".00</td>" +
                " <td>Deduction Amount</td>" +
                " <td>" + req.body.deduction + "</td> " +
                "</tr> " +
                "<tr>" +
                " <td>Allowance</td> " +
                "<td>" + req.body.allowance + ".00</td> " +
                "</tr> " +
                "<tr> " +
                "<td>House Rent Allowance</td> " +
                "<td>" + allowanceHouse + ".00</td> " +
                "</tr>" +
                " <tr>" +
                " <td>Medical Allowance</td> " +
                "<td>" + allowanceMedical + ".00</td> " +
                "</tr>" +
                " <tr>" +
                " <td>Total Earnings</td> " +
                "<td>" + earning + ".00</td>" +
                " <td>Total Deduction</td>" +
                " <td>" + deduction + ".00</td>" +
                " </tr> " +
                "</table>" +
                "</h4>" +
                "</div>" +
                " <h4 class='c'> Net Pay(Rounded)  :" + total + "</h4> <br><br><br>" +
                "<h4 class='r'> CEO Signature </h4>" +
                "<div class='flex-container'>" +
                " <footer>Copyright &copy; RoundsEdge.com</footer>" +
                "</div> " +
                " </body>" +
                " </html>"

            };


            pdf.create(temp.html, function (err, data) {
                if (err) return console.log(err);
                if (data) {
                    var mailOptions = {
                        from: 'dhiva030295@gmail.com',
                        to: req.body.email,
                        subject: 'Payslip',
                        text: 'your pay slip',
                        attachments: [
                            {
                                filename: 'payslip.pdf',
                                path: 'C:'+data.filename,
                            }]
                    };

                    transporter.sendMail(mailOptions, function (error) {
                        if (error) {
                            console.log(error);
                            res.json({success: false, message: "Something went Wrong please try again"})
                        } else {
                         Payslip.findOneAndUpdate( { objectId:req.body._id},
                                {
                            'firstName': req.body.firstName,
                            'lastName' : req.body.lastName,
                            'empId' : req.body.empId,
                            'salary' : req.body.salary,
                            'dateOfJoin' : req.body.dateOfJoin,
                            'designation' : req.body.designation,
                            'bankName' : req.body.bankName,
                            'accountNumber' : req.body.accountNumber,
                            'accountHolderName' : req.body.accountHolderName,
                            'ifscCode' : req.body.ifscCode,
                            'branchName' : req.body.branchName,
                            'objectId'  : req.body._id,
                            'otherAllowance' : req.body.allowance,
                            'houseAllowance' : req.body.allowanceHouse,
                            'medicalAllowance' : req.body.allowanceMedical,
                            'deduction' : req.body.deduction,
                            'totalEarning' : earning,
                            'totalDeduction' : req.body.deduction,
                            'netAmount' : total,
                            'date' : date,
                            'status' : 'success',
                            'year' : year,
                            'month' : monthNames[d.getMonth()]
                            },{upsert: true},function (){


                                            res.json({success: true, message: "Email sent successfully"});



                                    })
                                    }



                    });
                }
            });
            });





    router.get('/employee/payslip',function (req,res) {
        Payslip.find(function (err, docs) {

            res.json(docs);
        });
    });

cron.schedule('0 0 1 * *', function(){

Employee.updateMany({ status: 'success' },{ $set: { status : 'pending'} },
                    function(){
                    }
                      );
    });


 router.post('/employee/empAllow', function (req, res) {
  var dt = datetime.create();
             var year = dt.format('Y');
             var date =dt.format('d-m-Y');
             console.log(req.body);
        var allow = new Allowance();
        allow.allowanceType = req.body.allowanceType;
        allow.amount = req.body.amount;
        allow.description = req.body.description;
        allow.empId = req.body.empId;
        allow.empName=req.body.firstName;
        allow.applyDate = date;

        if (req.body.allowanceType == null || req.body.allowanceType == "" || req.body.amount == null || req.body.amount == "" || req.body.description == null || req.body.description == ""
            ) {
            res.json({success: false, message: 'Ensure that all information were provided'});
        } else {
            allow.save(function (err, data) {
                if (err) {
                    console.log(err);

                    res.json({success: false, message: 'something went wrong please try again later '});

                } else {


                         res.json({success: true, message: "successfully applied"});
                }
            });
        }

    });

 router.get('/employee/empAllow:id', function (req, res) {
        Allowance.find({'empId': req.params.id}, function (err, docs) {
            res.json(docs);
        })
    });
    router.get('/admin/allowance', function (req, res) {
            Allowance.find(function (err, docs) {
                res.json(docs);
            })
        });


    router.post('/admin/getRejectAllowance:id', function (req, res) {
 
    	 Allowance.findById({'_id': req.params.id}, function (err, docs) {
             
             res.json(docs);
         });
    });
    router.post('/admin/rejectAllowance', function (req, res) {
    	
    	 Allowance.findOneAndUpdate( { _id :req.body._id},
                 {
             'reason': req.body.reason,
             'status' : "Reject",
             'adminId' : req.decoded.adminId,
             'approvedBy' : req.decoded.firstName,             
             },{upsert: true},function (){


                             res.json({success: true, message: "Allowance rejected "});



                     
                     



     });

           });


    return router;
}

