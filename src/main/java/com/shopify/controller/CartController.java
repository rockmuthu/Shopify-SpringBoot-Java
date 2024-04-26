package com.shopify.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.shopify.entity.Cart;
import com.shopify.repository.CartRepository;

@RestController
@RequestMapping("/shop")
public class CartController {

	@Autowired
	private CartRepository shop;

	@RequestMapping(value = "/add", method = RequestMethod.POST, consumes = { "application/json" })
	public Cart create(@RequestBody Cart user) {
		Cart c= shop.saveAndFlush(user);
		return c;
	}

	@RequestMapping(value = "/get", method = RequestMethod.GET, produces = { "application/json" })
	public List<Cart> getAll(@RequestParam Long userId) {
		List<Cart> users = shop.findAllByUserId(userId);
		return users;
	}

	@RequestMapping(value = "/delete", method = RequestMethod.DELETE)
	public String deleteUser(@RequestParam Long id) {
		String success = "";
		try {
			shop.deleteById(id);
			success = "Deleted Successfully!!";
		} catch (Exception e) {
			// TODO: handle exception
			success = "Something Went Wrong!!";
		}
		
		return success;
	}

	@RequestMapping(value = "/getCount", method = RequestMethod.GET, produces = { "application/json" })
	public Long getcount(@RequestParam Long userId) {
		Long count = shop.countByUserId(userId);
		return count;
	}

	@RequestMapping(value = "/update", method = RequestMethod.GET, produces = { "application/json" })
	public Cart update(@RequestParam Long id, @RequestParam Long quantity) {
		Cart p = shop.findById(id).get();
		p.setQuantity(quantity);
		p = shop.saveAndFlush(p);
		return p;
	}
	
	@RequestMapping(value = "/deleteAll", method = RequestMethod.DELETE)
	public Boolean deleteAll() {
		shop.deleteAll();
		return true;
	}
	
//	@RequestMapping(value = "/get", method = RequestMethod.GET, produces = { "application/json" })
//	public List<Cart> getAll(@RequestParam Long userId) {
//		List<Cart> users = shop.findAllByUserId(userId);
//		return users;
//	}
}
