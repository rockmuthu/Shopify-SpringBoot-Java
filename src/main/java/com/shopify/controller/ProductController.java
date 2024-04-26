package com.shopify.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


import com.shopify.entity.Products;
import com.shopify.repository.ProductRepository;



@RestController
@RequestMapping("/shopify")
public class ProductController {
	
	@Autowired
	private ProductRepository shop;	
	
	@RequestMapping(value = "/add", method = RequestMethod.POST, consumes = { "application/json" })
	public Products create(@RequestBody Products user) {
		user =shop.saveAndFlush(user);
		return user;
	}
	
	@RequestMapping(value = "/get", method = RequestMethod.GET,produces = { "application/json" })
	public List<Products> getAll(@RequestParam Long userId) { 
		List<Products> users = shop.findAllByUserId(userId);
		return users;
	}
	
	@RequestMapping(value = "/getAll", method = RequestMethod.GET,produces = { "application/json" })
	public List<Products> getAll() { 
		List<Products> users = shop.findAll();
		return users;
	}
	
	@RequestMapping(value = "/delete", method = RequestMethod.DELETE)
	public Boolean deleteUser(@RequestParam Long id) { 
		 shop.deleteById(id);
		return true;
	}
	
	@RequestMapping(value = "/update", method = RequestMethod.POST, consumes = { "application/json" })
	public Products update(@RequestBody Products user) {
		Products u = shop.findById(user.getId()).get();
		u.setName(user.getName());
		u.setCode(user.getCode());
		u.setCount(user.getCount());
		u.setPrice(user.getPrice());
		u.setImage(user.getImage());
		u = shop.saveAndFlush(u);
		return u;
	}

}
