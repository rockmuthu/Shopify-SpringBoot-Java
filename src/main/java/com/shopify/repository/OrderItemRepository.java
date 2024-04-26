package com.shopify.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.shopify.entity.OrderItem;

public interface OrderItemRepository extends JpaRepository<OrderItem, Long>{

	List<OrderItem> findByOrderId(Long orderId);
	
}
