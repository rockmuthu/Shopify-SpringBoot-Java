package com.shopify.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.shopify.entity.Cart;

public interface CartRepository extends JpaRepository<Cart, Long>{
      long count();
      
      List<Cart> findAllByUserId(Long userId);

	Long countByUserId(Long userId);

}
