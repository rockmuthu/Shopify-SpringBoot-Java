
let selectedId = null;
let users = [];


function loadData() {
	let loginObj = null;
	let loginDtl = localStorage.getItem('loginId');
	if (loginDtl) {
		loginObj = JSON.parse(loginDtl);

		$.ajax({
			url: 'http://localhost:8080/shopify/get?userId=' + loginObj.id,
			method: 'GET',
			contentType: 'application/json',
			success: function(res) {
				console.log(res);
				let html = '';
				users = res;
				res.forEach(function(o, idx) {
					html += `<tr>
						<td>${idx + 1}</td>
						<td>${o.name}</td>
						<td>${o.code}</td>
						<td>${o.count}</td>
						<td>₹ ${o.price}</td>
						<td><button class="btn btn-sm" onclick="edit(${idx})">Edit</button></td>
						<td><button class="btn btn-sm" onclick="deleteUser(${o.id})" >Delete</button></td>
					</tr>`;
				});
				$('#tbody').html(html);
			},
			error: function(err) {
				console.error(err);
			}
		});
	}
}


function saveUser() {
	if (selectedId && Number(selectedId) > 0) {
		update();
	} else {
		let name = $('#productName').val();
		let code = $('#productCode').val();
		let count = $('#stockCount').val();
		let price = $('#price').val();
		let image = $('#imageURL').val();

		let loginDtl = localStorage.getItem('loginId');
		if (loginDtl) {
			const loginObj = JSON.parse(loginDtl);
			const details = { name: name, code: code, count: count, price: price, image: image, user: { id: loginObj.id } }
			$.ajax({
				url: 'http://localhost:8080/shopify/add',
				method: 'POST',
				contentType: 'application/json',
				data: JSON.stringify(details),
				success: function(res) {
					$('#userForm')[0].reset();
					loadData();
					$('#newUser').modal("hide");
				},
				error: function(err) {
					console.error(err);
				}
			});
		}
	}
}

function deleteUser(id) {
	$.ajax({
		url: 'http://localhost:8080/shopify/delete?id=' + id,
		method: 'DELETE',
		success: function(res) {
			loadData();
		},
		error: function(err) {
			console.error(err);
		}
	});

}

function edit(idx) {

	const user = users[idx];
	selectedId = user.id;
	$('#productName').val(user.name);
	$('#productCode').val(user.code);
	$('#stockCount').val(user.count);
	$('#price').val(user.price);
	$('#imageURL').val(user.image);

	$("#newUser").modal("show");
	$('#saveProduct').html('Update');
	console.log(user);
}


function update() {
	let name = $('#productName').val();
	let code = $('#productCode').val();
	let count = $('#stockCount').val();
	let price = $('#price').val();
	let image = $('#imageURL').val();

	const details = { id: selectedId, name: name, code: code, count: count, price: price, image: image }
	$.ajax({
		url: 'http://localhost:8080/shopify/update',
		method: 'POST',
		contentType: 'application/json',
		data: JSON.stringify(details),
		success: function(res) {
			$('#userForm')[0].reset();
			loadData();
		},
		error: function(err) {
			console.error(err);
		}
	});
	$("#newUser").modal("hide");
	$('#saveProduct').html('Update');
}


loadData();


// Clear Form
$('#newUser').on('hidden.bs.modal', function() {
	$('#userForm')[0].reset();
	$('#saveProduct').html('Submit');
	selectedId = null;
});

$('#close').click(function() {
	$('#userForm')[0].reset();
	$("#newUser").modal("hide");
	$('#saveProduct').html('Submit');
	selectedId = null;
});
