angular.module('payrollController',['payrollService','toastr','ngSanitize'])
    .controller('payCtrl',function ($window,$timeout,Payroll,$scope,toastr ) {
        var app = this;

        var refresh = function () {
            Payroll.getEmployee().then(function (data) {
                app.employees = data.data;
                payslip();

        });
        };



        var payslip=function () {
            Payroll.getPayslip().then(function (data) {
                $scope.pay = data.data;
                console.log(data);

            });
        };

        refresh();

             $scope.viewEmployee = function (id) {
            Payroll.getEmployeeById(id)
                .then(function (data) {
                    $scope.view = data.data;
                    refresh();
                });
        }

        $scope.generatePayslip = function (view) {
              console.log('form submitted');
            Payroll.createPayslip(view).then(function (data) {

                console.log(data);

                if (data.data.success) {

                    toastr.success(data.data.message, 'success');

                    $timeout(function () {
                        $window.location.reload();
                    }, 2000);

                } else {
                    toastr.error(data.data.message, 'error');
                }
            })

        }
         $scope.updatePayslip = function (view) {
                      console.log('form submitted');
                    Payroll.updatePayslip(view).then(function (data) {
                        console.log(data);

                        if (data.data.success) {

                            toastr.success(data.data.message, 'success');

                            $timeout(function () {
                                $window.location.reload();
                            }, 2000);

                        } else {
                            toastr.error(data.data.message, 'error');
                        }
                    })

                }
   $scope.viewPayslip=function (id) {

       Payroll.viewPayslip(id).then(function (data) {
           var data=data.data;
          $scope.template =
               "<header class='text-align-center'>" +
               "<a> <img src='http://www.roundsedge.com/dev/images/retlogo.png' width='60' height='70'/>" +
               "</a><h1>Round's Edge Technologies Pvt Ltd</h1>" +
               "</header> " +
               "<h2>PaySlip for the Month of " + data.month + " " + data.year + "</h2></div>" +
               "<h4><table> " +
               "<tr>" +
               "<td>EmployeeId :" + data.empId+ "</td>" +"<td></td>"+
               "<td>Name :" + data.firstName + " " + data.lastName + "</td>" +
               "</tr>" +
               "<tr>" +
               "<td>Date Of Joining :" + data.dateOfJoin + "</td> " +
               "<td>Designation :" + data.designation + "</td>" +
               "</tr>" +
               "<tr>" +
               "<td>Bank Name :" + data.bankName + "</td>" +
               "<td>Account Number :" +data.accountNumber + "</td>" +
               "</tr> " +
               "<tr>" +
               "<td>Branch Name :" + data.branchName + "</td>" +
               "<td>IFSC Code :" + data.ifscCode + "</td>" +
               "</tr> " +
               " </table> " +
               "</h4><h4>" +
               "<table >" +
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
               "<td>" + data.salary + ".00</td>" +
               " <td>Deduction Amount</td>" +
               " <td>" + data.deduction + "</td> " +
               "</tr> " +
               "<tr>" +
               " <td>Allowance</td> " +
               "<td>" + data.otherAllowance + ".00</td> " +
               "</tr> " +
               "<tr> " +
               "<td>House Rent Allowance</td> " +
               "<td>" + data.houseAllowance + ".00</td> " +
               "</tr>" +
               " <tr>" +
               " <td>Medical Allowance</td> " +
               "<td>" + data.medicalAllowance + ".00</td> " +
               "</tr>" +
               " <tr>" +
               " <td>Total Earnings</td> " +
               "<td>" + data.totalEarning+ ".00</td>" +
               " <td>Total Deduction</td>" +
               " <td>" + data.totalDeduction + ".00</td>" +
               " </tr> " +
               "</table>" +
               "</h4>" +
               +
               " <h4> NetPay(Rounded):" + data.netAmount +" </h4> <br><br><br>" +
               "<h4 > CEO Signature </h4>" +
               " <footer>Copyright &copy; RoundsEdge.com</footer>"




       })
   }


    })