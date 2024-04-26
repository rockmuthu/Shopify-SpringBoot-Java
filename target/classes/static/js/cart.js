var num = [];


function displayCrtItm() {
	let loginObj = null;
	let loginDtl = localStorage.getItem('loginId');
	if (loginDtl) {
		loginObj = JSON.parse(loginDtl);

		$.ajax({
			url: 'http://localhost:8080/shop/get?userId=' + loginObj.id,
			method: 'GET',
			contentType: 'application/json',
			success: function(res) {
				console.log(res.length);
				num = res;
				if (res.length == 0) {
					$('#aaaa').html('<img src="https://kirti.skoozo.com/assets/img/empty-cart.png" alt="" class = "bbbb">');
					$("#place-order").removeClass("btn btn-primary").addClass("btn btn-primary disabled");
				} else {
					let html = '';
					let totalPrice = 0;
					let finalPrice = 0;
					users = res;
					res.forEach(function(o, index) {
						let intNum = 'value-' + index;
						let totalAmt = o.price * o.quantity;

						totalPrice += totalAmt;
						finalPrice = (totalPrice + (totalPrice * 0.1) + 230);

						html += `<div class="newOne">
                    <div class="card mb-3" style="max-width: 540px;">
                        <div class="row g-0">
                            <div class="col-md-4">
                                <img src="${o.image}" class="img-fluid rounded-start" alt="..." width="100%">
                            </div>
                            <div class="col-md-8" style="padding-left: 20px;">
                                <div class="card-body">
                                    <h5 class="card-title">${o.name}</h5>
                                    <p class="card-text">
                                    <h6 class="card-subtitle mb-2 text-muted" id="123">
                                        Price : ₹${o.price} <br><br>
                                        Quantity : ${o.quantity} <br><br>
                                        Total : ₹${totalAmt}
                                    </h6>
                                    </p>
                                    <div class="col align-self-center">
                                        <div class="d-flex float-end">
                                            <button class="btn btn-danger btn-sm" onclick="removeCartItem(${o.id})">REMOVE</button>
                                               
                                        </div>
                                    </div>
                                    <div class="col align-self-center">
                                        <div class="btn-group btn-group-sm" role="group" aria-label="Small button group">
                                            <button type="button" onclick="minus(${index})" class="btn btn-outline-dark" class="btn btn-outline-dark" >-</button>
                                                <input type="number" id="${intNum}" class="shopify" style="text-align: center;" size="2"
                                                value="${o.quantity}" min="1" max="10" readonly/>
                                            <button type="button" onclick="plus(${index})" class="btn btn-outline-dark" >+</button>
                                        </div>                                      
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>`;
					});
					$('#items').html(html);
					$('#totalPrc').html('₹' + totalPrice);
					$('#finalPrc').html('₹' + finalPrice);
					$("#place-order").removeClass("btn btn-primary disabled").addClass("btn btn-primary");
				}
				navBarCartItm();

			},

			error: function(err) {
				console.error(err);
			}
		});
	} else {
		$('#aaaa').html('<img src="https://polytronofficial.com/assets/images/empty-cart.png" alt="Snow" id="elseImg"><a id="elseBtn" > Please LogIn To View Cart Items </a>');
		$("#place-order").removeClass("btn btn-primary").addClass("btn btn-primary disabled");
	}
}


displayCrtItm();





function minus(index) {

	let obj = num[index];
	let qty = obj.quantity;
	console.log(obj.id);
	quantity = qty - 1;


	$.ajax({
		url: `http://localhost:8080/shop/update?id=${obj.id}&quantity=${quantity}`,
		method: 'GET',
		contentType: 'application/json',
		success: function(res) {

			displayCrtItm();
			if (num[index].quantity == 1) {
				removeCartItem(`${obj.id}`);
				navBarCartItm();
			}

		},
		error: function(err) {
			console.error(err);
		}

	});



}


function plus(index) {

	let obj = num[index];
	let qty = obj.quantity;
	console.log(obj.id);
	quantity = qty + 1;


	$.ajax({
		url: `http://localhost:8080/shop/update?id=${obj.id}&quantity=${quantity}`,
		method: 'GET',
		contentType: 'application/json',
		success: function(res) {

			displayCrtItm();
		},
		error: function(err) {
			console.error(err);
		}
	});
}





function removeCartItem(id) {
	var result = confirm("Want to delete?");
	if (result) {
		$.ajax({
			url: 'http://localhost:8080/shop/delete?id=' + id,
			method: 'DELETE',
			success: function(res) {
				navBarCartItm();
				displayCrtItm();
			},
			error: function(err) {
				console.error(err);
			}
		});

	}

}



function placeOrder() {
	let loginObj = null;
	let loginDtl = localStorage.getItem('loginId');
	if (loginDtl) {
		loginObj = JSON.parse(loginDtl);



		let xyz = '';
		let totalcost = 0;

		let orderNumber = Math.floor(Math.random() * 100) + 1;
		let totalAmount = $('#finalPrc').val();
		let customerName = $('#billName').val();
		let customerAddress = $('#billCity').val();
		let customerState = $('#billState').val();
		let customerPincode = $('#pinCode').val();
		let customerMobile = $('#billMobile').val();

		// Create a new Date object
		let currentDate = new Date();

		// Get the date and time components
		const year = currentDate.getFullYear();
		const month = currentDate.getMonth() + 1; // January is 0, so add 1 to get the actual month number
		const day = currentDate.getDate();
		const hours = currentDate.getHours();
		const minutes = currentDate.getMinutes();
		const seconds = currentDate.getSeconds();

		// Format the date and time string
		const dateTimeString = `( ${year}-${month}-${day} & ${hours}:${minutes}:${seconds} )`;

		// orderSummary
		// Expected Delivery Date
		const today = new Date();
		const minDays = 3;
		const maxDays = 7;
		const randomDays = Math.floor(Math.random() * (maxDays - minDays + 1)) + minDays;
		const delivery = new Date(today.getTime() + (randomDays * 24 * 60 * 60 * 1000));
		let abc = delivery.toDateString();

		let deliveryDate = "Delivery Expected by " + '( ' + abc + ' )';


		const details = {

			order: {
				orderNumber: orderNumber,
				totalAmount: totalAmount,
				customerName: customerName,
				customerAddress: customerAddress,
				customerState: customerState,
				customerName: customerName,
				customerPincode: customerPincode,
				customerMobile: customerMobile,
				deliveryDate: deliveryDate,
				deliveryCharge: {},
				totalPrice: {},
				beforePrice: {},
				orderDate: {},
				user: { id: loginObj.id }
			},
			orderitems: []
		};


		num.forEach(function(o) {
			xyz = o.price * o.quantity;
			totalcost += xyz;
			details.orderitems.push({
				name: o.name,
				code: o.code,
				count: o.count,
				price: o.price,
				image: o.image,
				quantity: o.quantity,
				total: xyz,
			});

		});


		// Order Summary Details
		let deliveryCharge = ((totalcost * 0.1) + 230);
		let beforePrice = totalcost;
		let totalPrice = ((totalcost) + (totalcost * 0.1) + 230);

		details.order.deliveryCharge = deliveryCharge;
		details.order.beforePrice = beforePrice;
		details.order.totalPrice = totalPrice;
		details.order.orderDate = dateTimeString;



		$.ajax({
			url: 'http://localhost:8080/orderitem/add',
			method: 'POST',
			contentType: 'application/json',
			data: JSON.stringify(details),
			success: function(res) {
				console.log(res);

				$.ajax({
					url: 'http://localhost:8080/shop/deleteAll',
					method: 'DELETE',
					contentType: 'application/json',
					success: function(res) {
						console.log(res);
						displayCrtItm();

					},
					error: function(err) {
						console.error(err);
					}
				});

			},
			error: function(err) {
				console.error(err);
			}
		});

	}

/*
	setTimeout(function() {
		location.reload();
	}, 2000);
	*/
}












