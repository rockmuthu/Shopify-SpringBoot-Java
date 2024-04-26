package com.shopify.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
@Controller
public class HtmlController {

	
	@RequestMapping("/home")
	public String homepage() {
		return "home";
	}

	@RequestMapping("/product")
	public String productpage() {
		return "product";
	}
	
	@RequestMapping("/shop")
	public String shoppage() {
		return "shop";
	}
	
	@RequestMapping("/cart")
	public String cartpage() {
		return "cart";
	}
	
	@RequestMapping("/order")
	public String orderpage() {
		return "order";
	}
}
