package com.shopify.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.shopify.entity.Cart;
import com.shopify.entity.OrderItem;
import com.shopify.entity.Orders;
import com.shopify.repository.CartRepository;
import com.shopify.repository.OrderItemRepository;
import com.shopify.repository.OrdersRepository;

@RestController
@RequestMapping("/order")
public class OrdersController {

	@Autowired
	private OrdersRepository order;
	
	@Autowired
	private CartRepository cartRepository;
	
	@Autowired
	private OrderItemRepository itemRepository;

	@RequestMapping(value = "/add", method = RequestMethod.POST, consumes = { "application/json" })
	public Orders create(@RequestBody Orders user) {
		user = order.saveAndFlush(user);
		return user;
	}

	@RequestMapping(value = "/get", method = RequestMethod.GET, produces = { "application/json" })
	public List<Orders> getAll(@RequestParam Long userId) {
		List<Orders> users = order.findAllByUserId(userId);
		return users;
	}
	
	@RequestMapping(value = "/createOrder", method = RequestMethod.GET, produces = { "application/json" })
	public Orders createOrder(@RequestBody Orders o, @RequestParam Long userId) {
		
		Orders ord = order.saveAndFlush(o);
		List<Cart> cartItems = cartRepository.findAllByUserId(userId);
		List<OrderItem> ois = new ArrayList<>();
		for (Cart cart : cartItems) {
			OrderItem oi = new OrderItem();
			oi.setName(cart.getName());
			ois.add(oi);
			oi.setOrder(ord);
		}
		
		itemRepository.saveAll(ois);
		
		return ord;
	}

}
