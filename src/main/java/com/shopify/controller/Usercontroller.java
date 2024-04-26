package com.shopify.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.shopify.dto.LoginDto;
import com.shopify.entity.User;
import com.shopify.repository.UserRepository;

@RestController
@RequestMapping("/user")
public class Usercontroller {

	@Autowired
	private UserRepository userRepository;

	@RequestMapping(value = "/add", method = RequestMethod.POST, consumes = { "application/json" })
	public ResponseEntity<String> create(@RequestBody User user) {
		
		if (userRepository.existsByEmail(user.getEmail())) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Email already registered...");
		}		
		
		user.setPassword(user.getPassword());
		userRepository.save(user);
		return ResponseEntity.ok("User registered successfully");
	}



	@RequestMapping(value = "/login", method = RequestMethod.POST, consumes = { "application/json" })
	public ResponseEntity<Object> login(@RequestBody LoginDto loginDto) {
	
		User user = userRepository.findOneByEmailIgnoreCaseAndPassword(loginDto.getEmail(), loginDto.getPassword());
		if(user == null) {
			return ResponseEntity.ok("Login Failed");
		} else {
			Object u = userRepository.saveAndFlush(user);
			return ResponseEntity.ok(u);
			
		}
		
	}

}
