function navBarCartItm() {
	let loginObj = null;
	let loginDtl = localStorage.getItem('loginId');
	if (loginDtl) {
		loginObj = JSON.parse(loginDtl);

		$.ajax({
			url: 'http://localhost:8080/shop/getCount?userId=' + loginObj.id,
			method: 'GET',
			contentType: 'application/json',
			success: function(res) {
				strCartItems = res;
				console.log(strCartItems);

				document.getElementById('itemsCount').innerHTML = "(&nbsp" + strCartItems + "&nbsp)";

			},
			error: function(err) {
				console.error(err);
			}
		});
	}


}

navBarCartItm();




function signUp() {

	let name = $('#name').val();
	let email = $('#emailId').val();
	let mobile = $('#mobile').val();
	let password = $('#passcode').val();

	const details = { name: name, email: email, mobile: mobile, password: password }
	$.ajax({
		url: 'http://localhost:8080/user/add',
		method: 'POST',
		contentType: 'application/json',
		data: JSON.stringify(details),
		success: function(res) {
			$('#signUpForm')[0].reset();
			console.log(res);
			//			$('#exampleModal').modal("show");

		},
		error: function(err) {
			alert("Email already registered...");
			console.log("Email already registered...");
		}
	});
}


function login() {

	let email = $('#email').val();
	let password = $('#password').val();

	const details = { email: email, password: password }
	$.ajax({
		url: 'http://localhost:8080/user/login',
		method: 'POST',
		contentType: 'application/json',
		data: JSON.stringify(details),
		success: function(res) {
			$('#loginForm')[0].reset();
			console.log(res);

			let id = res.id;
			let name = res.name;
			let email = res.email;
			let mobile = res.mobile;

			let log = { id, name, email, mobile };

			localStorage.setItem('loginId', JSON.stringify(log));

			window.location.href = "http://localhost:8080/home";

		},
		error: function(err) {
			console.error(err);
		}
	});
}


function loginDtls() {
	let loginDtl = localStorage.getItem('loginId');
	if (loginDtl) {
		logDt = JSON.parse(loginDtl);

		console.log(logDt.id);
		console.log(logDt.name);
		let name = logDt.name;

		$('#profile').html(name);


	}
}

loginDtls();

function logout() {
	localStorage.clear();
	window.location.reload();
}


$(function() {
	// This function will execute only when the page is loaded

	// Checking login or not
	const userStr = localStorage.getItem('loginId');
	if (userStr) {
		const u = JSON.parse(userStr);
		if (u.id) {
			$('.afterLogin').removeClass('d-none');
		} else {
			$('#exampleModal').modal('show');
			$('.beforeLogin').removeClass('d-none');
		}
	} else {
		$('#exampleModal').modal('show');
		$('.beforeLogin').removeClass('d-none');
	}

});











