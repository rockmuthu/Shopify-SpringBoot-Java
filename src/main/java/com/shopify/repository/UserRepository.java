package com.shopify.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.shopify.entity.User;

public interface UserRepository extends JpaRepository<User, Long> {

	User findByEmail(String email);

	boolean existsByName(String name);

	boolean existsByEmail(String email);

	boolean findByName(String name);

	User findOneByEmailIgnoreCaseAndPassword(String email, String password);



}
