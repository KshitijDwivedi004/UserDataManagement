package com.kshitij.employeemanagement.service;

import com.kshitij.employeemanagement.model.User;

import java.util.List;

public interface UserService {
    User saveUser(User user);

    List<User> getAllUsers();

    User getUserById(long id);

    Boolean deleteUser(Long id);

    User updateUser(long id, User user);
}
