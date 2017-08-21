$(function () {
    $('#addStudentForm').validate({
        rules: {
			'date': {
                customdate: true
            },
			'mobile': {
                mobile: true
            },
			'email': {
                email: true
            },
			'age':{
			 requied:true
			},
			'address':{
			 required: true
			},
			'empid':{
				required :true
			},
			'bankname':{
			   requied :true
			},
			'an':{
			an:true
			},
			'password':{
			pass:true
			},
			'ic':{
				ic:true
			},
			'ach':{
			required:true
			},
			'branchname':{
			  requied:true
			},
			'doc':{
			  doc:true
			},
			'dob':{
			  dob:true
			}
        },
        highlight: function (input) {
            $(input).parents('.form-line').addClass('error');
        },
        unhighlight: function (input) {
            $(input).parents('.form-line').removeClass('error');
        },
        errorPlacement: function (error, element) {
            $(element).parents('.form-group').append(error);
        }
    });
	$.validator.addMethod('customdate', function (value, element) {
        return value.match(/^\d\d\d\d?-\d\d?-\d\d$/);
    },
        'Please enter a date in the format YYYY-MM-DD.'
    );
	$.validator.addMethod('mobile', function (value, element) {
        return value.match(/^\d{10}$/);
    },
        'Please enter a 10 digit mobile number.'
    );
	$.validator.addMethod('email', function (value, element) {
        return value.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);
    },
        'Please enter a valid Email Address.'
    );
	$.validator.addMethod('an', function (value, element) {
        return value.match(/^\d{6}\d[0-9]*$/);
    },
        'Please enter a vaild account Number.'
    );
	$.validator.addMethod('an', function (value, element) {
        return value.match(/^\d{6}\d[0-9]*$/);
    },
        'Please enter a vaild IFSC code.'
    );
$.validator.addMethod('pass', function (value, element) {
        return value.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/);
    },
        'password between 6 to 20 characters which contain at least one numeric digit, one uppercase, and one lowercase letter'
    );
	$.validator.addMethod('doc', function (value, element) {
        return value.match(/^\d\d\d\d?-\d\d?-\d\d$/);
    },
        'Please enter a date in the format YYYY-MM-DD.'
    );
	$.validator.addMethod('pass', function (value, element) {
        return value.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/);
    },
        'password between 6 to 20 characters which contain at least one numeric digit, one uppercase, and one lowercase letter'
    );
	$.validator.addMethod('dob', function (value, element) {
        return value.match(/^\d\d\d\d?-\d\d?-\d\d$/);
    },
        'Please enter a date in the format YYYY-MM-DD.'
    );
});