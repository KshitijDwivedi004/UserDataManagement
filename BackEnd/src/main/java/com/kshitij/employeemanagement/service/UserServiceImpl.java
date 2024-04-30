package com.kshitij.employeemanagement.service;

import com.kshitij.employeemanagement.entity.UserEntity;
import com.kshitij.employeemanagement.model.User;
import com.kshitij.employeemanagement.repository.UserRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserServiceImpl implements  UserService{

    private UserRepository userRepository;

    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public User saveUser(User user) {
        UserEntity userEntity = new UserEntity();
        BeanUtils.copyProperties(user,userEntity);
        userRepository.save(userEntity);
        return user;
    }

    @Override
    public List<User> getAllUsers() {
        List<UserEntity> users= userRepository.findAll();

        List<User> user=users.stream()
                .map(userEntity -> new User(
                        userEntity.getId(),
                        userEntity.getFirstName(),
                        userEntity.getLastName(),
                        userEntity.getEmailId()
                )).collect(Collectors.toList());
        return user;
    }

    @Override
    public User getUserById(long id) {
        UserEntity userEntity = userRepository.findById(id).get();

        User user = new User();
        BeanUtils.copyProperties(userEntity,user);
        return user;
    }

    @Override
    public Boolean deleteUser(Long id) {
        UserEntity user= userRepository.findById(id).get();
        userRepository.delete(user);
        return true;
    }

    @Override
    public User updateUser(long id, User user) {
        UserEntity userEntity = userRepository.findById(id).get();
        userEntity.setFirstName(user.getFirstName());
        userEntity.setLastName(user.getLastName());
        userEntity.setEmailId(user.getEmailId());

        userRepository.save(userEntity);
        return user;
    }


}
