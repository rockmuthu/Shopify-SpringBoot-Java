let ord = [];

let loginObj = null;
	let loginDtl = localStorage.getItem('loginId');
	if (loginDtl) {
		loginObj = JSON.parse(loginDtl);

//Orders
$.ajax({
	
	url: `http://localhost:8080/order/get?userId=` + loginObj.id,
	method: 'GET',
	contentType: 'application/json',
	success: function(ord) {

		console.log(ord);

		let html1 = '';
		ord.forEach(function(o) {

			//OrderItem
			$.ajax({
				url: `http://localhost:8080/orderitem/get?orderId=${o.id}`,
				method: 'GET',
				contentType: 'application/json',
				success: function(ordItm) {

					let html = '';
					ordItm.forEach(function(p) {
						console.log(p);
						html += `<tr>
									<td>
										<a href="/shop"><img src="${p.image}" alt="" width="20%"></a>
									</td>
									<td>
										Name: &nbsp ${p.name}<br>
										Price: &nbsp ₹${p.price}
									</td>
									<td>
										${p.quantity}
									</td>
									<td>
										₹ &nbsp ${p.total}
									</td>
								</tr>`
					})
					
					html1 += `<h2 class="accordion-header" id="headingOne">
								<button class="accordion-button" type="button" data-bs-toggle="collapse"
									data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne" id="accAtn">
									${'ORDERED ON  ' + (o.orderDate)}
								</button>
							</h2>
							<div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne"
								data-bs-parent="#accordionExample">
								<div class="accordion-body">
									<div class="row">
										<div class="col-lg-4">
											<div class="card">
												<div class="card-header">
													ORDER DETAIL
												</div>
												<div class="card-body">
													<table class="table table-sm table-condensed m-0">
														<tr>
															<th>Total Price</th>
															<td id="1">${o.beforePrice}</td>
														</tr>
														<tr>
															<th>Delivery + GST</th>
															<td id="2">${o.deliveryCharge}</td>
														</tr>
														<tr>
															<th>Total Price</th>
															<td id="3">${o.totalPrice}</td>
														</tr>
													</table>
												</div>
											</div>
										</div>
		
										<div class="col-lg-8">
											<div class="card">
												<div class="card-header">
													BILL TO <span id="4" class="float-end">${o.deliveryDate}</span>
												</div>
												<div class="card-body">
													<h6 id="ordName">${o.customerName}</h6>
													<p class="mb-0" id="ordCity">${o.customerAddress},${o.customerState}</p><span id="ordState"></span>
													<p class="mb-0" id="pinCode">${o.customerPincode}</p>
													<p class="mb-0" id="ordMob">${o.customerMobile}</p>
												</div>
											</div>
										</div>
									</div>
									<div class="card mt-3">
										<div class="card-header">
											ORDERED ITEMS
										</div>
										<div class="card-body">
											<table class="table table-sm table-condensed">
												<thead>
													<tr>
														<th>
															IMAGE
														</th>
														<th>
															DESCRIPTION
														</th>
														<th>
															QUANTITY
														</th>
														<th>
															PRICE
														</th>
													</tr>
												</thead>
												<tbody id="ordereditm">
												    
														${html}	                               
												    
												</tbody>
		
											</table>
		
										</div>
									</div>
								</div>
							</div>`
					$('#123').html(html1);
				},
				error: function(err) {
					console.error(err);
				}

			});

		})



	},
	error: function(err) {
		console.error(err);
	}
});

}















