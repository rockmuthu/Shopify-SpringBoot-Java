package com.shopify.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.shopify.entity.Products;

public interface ProductRepository extends JpaRepository<Products, Long> {

	List<Products> findAllByUserId(Long userId);

}
