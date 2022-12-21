package com.myforum.myforum.dao;

import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Repository;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

@Repository
public class UserDao {
    private final static List<UserDetails> APPLICATION_USERS = Arrays.asList(
            new User(
                    "admin.user@gmail.com",
                    "password",
                    Collections.singleton(new SimpleGrantedAuthority("ROLE_ADMIN"))
            ),
            new User(
                    "user.user@gmail.com",
                    "password",
                    Collections.singleton(new SimpleGrantedAuthority("ROLE_USER"))
            ),
            new User(
                    "user1",
                    "password",
                    Collections.singleton(new SimpleGrantedAuthority("ROLE_USER"))
            )
    );


    public UserDetails findUserByEmail(String userEmail) {
        // access a static list of users in memory
        return APPLICATION_USERS
                .stream()
                .filter(u -> u.getUsername().equals(userEmail))
                .findFirst()
                .orElseThrow(()-> new UsernameNotFoundException("No user was found"))
                ;
    }
}
