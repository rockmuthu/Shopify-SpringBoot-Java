package com.shopify.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;


import com.shopify.entity.Orders;

public interface OrdersRepository extends JpaRepository<Orders, Long>{

	List<Orders> findAllByUserId(Long userId);

}
