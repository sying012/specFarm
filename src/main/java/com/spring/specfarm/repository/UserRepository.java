package com.spring.specfarm.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.spring.specfarm.entity.User;

public interface UserRepository extends JpaRepository<User, String> {

}
