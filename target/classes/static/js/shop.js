

$.ajax({
	url: 'http://localhost:8080/shopify/getAll',
	method: 'GET',
	contentType: 'application/json',
	success: function(res) {
		console.log(res);
		let html = '';
		users = res;
		res.forEach(function(o, idx) {
			html += `<div class="col-lg-3 pb-4">
                    <div class="card">
                        <div class="text-center p-2">
                            <img src="${o.image}" class="img-fluid" alt="...">
                        </div>
                        <div class="card-body mt-4">
                            <h5 class="card-title">${o.name}</h5><br>
                            <p class="card-text"> Price : ₹${o.price}</p>
                            <p class="card-text"> Count : ${o.count}</p>
                            <div class="text-center">
                                <button href="#" id="goToCart" onclick="addToCart(${idx})" class="btn btn-primary btn-sm">
                                    <i class="fa-solid fa-cart-plus"></i> &nbsp; ADD TO CART
                                </button>
                            </div>
                        </div>
                    </div>
                </div>`;
		});
		$('#card').html(html);
	},
	error: function(err) {
		console.error(err);
	}
});





function addToCart(idx) {
	const p = users[idx];
	p.quantity = 1;

	let loginDtl = localStorage.getItem('loginId');
	if (loginDtl) {
		logDt = JSON.parse(loginDtl);
		p.user = {id: logDt.id};
		$.ajax({
			url: 'http://localhost:8080/shop/add',
			method: 'POST',
			contentType: 'application/json',
			data: JSON.stringify(p),
			success: function(res) {
				navBarCartItm();
				console.log(res);
			},
			error: function(err) {
				console.error(err);
			}
		});
	} else {
		$('#exampleModal').modal('show');
	}
}



