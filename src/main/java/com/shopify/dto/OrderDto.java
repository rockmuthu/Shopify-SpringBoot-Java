package com.shopify.dto;

import java.util.List;

import com.shopify.entity.OrderItem;
import com.shopify.entity.Orders;
import com.shopify.entity.User;

import jakarta.persistence.OneToOne;

public class OrderDto {

	
	private Orders order;
	private List<OrderItem> orderitems;
	
	@OneToOne
	private User user;
	
	public Orders getOrder() {
		return order;
	}
	public void setOrder(Orders order) {
		this.order = order;
	}
	public List<OrderItem> getOrderitems() {
		return orderitems;
	}
	public void setOrderitems(List<OrderItem> orderitems) {
		this.orderitems = orderitems;
	}
	public User getUser() {
		return user;
	}
	public void setUser(User user) {
		this.user = user;
	}
	
	
	
}
