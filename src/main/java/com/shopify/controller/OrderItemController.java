package com.shopify.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.shopify.dto.OrderDto;
import com.shopify.entity.OrderItem;
import com.shopify.entity.Orders;
import com.shopify.repository.OrderItemRepository;
import com.shopify.repository.OrdersRepository;

@RestController
@RequestMapping("/orderitem")
public class OrderItemController {

	@Autowired
	private OrderItemRepository orderitem;
	
	@Autowired
	private OrdersRepository orders;

	@RequestMapping(value = "/add", method = RequestMethod.POST, consumes = { "application/json" })
	public Orders create(@RequestBody OrderDto orderdto) {
		Orders o = orders.saveAndFlush(orderdto.getOrder());
		List<OrderItem> oi = orderdto.getOrderitems();
		
		oi.forEach(f -> f.setOrder(o));
		
		orderitem.saveAll(oi);
		return o;
	}
	
	
	@RequestMapping(value = "/get", method = RequestMethod.GET, produces = { "application/json" })
	public List<OrderItem> getOrderItemsByOrderId(@RequestParam Long orderId) {
	    return orderitem.findByOrderId(orderId);
	}

	
}












