package com.myforum.myforum.controllers;

import com.myforum.myforum.dao.UserDao;
import com.myforum.myforum.dto.AuthenticationRequest;
import com.myforum.myforum.config.JwtUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;

@RestController
@RequiredArgsConstructor
public class AuthenticationController {

    private final AuthenticationManager authenticationManager;
    private final UserDao userDao;
    private final JwtUtils jwtUtils;

    /*
    @PostMapping("/login")
    public ResponseEntity<String> authenticate(
            @RequestBody AuthenticationRequest request
    ){
        System.out.println("loginin alussa");
        //org.springframework.security.core.userdetails.User [Username=user1, Password=[PROTECTED], Enabled=true, AccountNonExpired=true, credentialsNonExpired=true, AccountNonLocked=true, Granted Authorities=[ROLE_USER]]
        //System.out.println(request);
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
        );
        final UserDetails user = userDao.findUserByEmail(request.getEmail());
        System.out.println("user");
        System.out.println(user);
        if(user != null ) {
            //System.out.println(request);
            //if(user.isCredentialsNonExpired()){
            //    return null;
            //}
            return ResponseEntity.ok(jwtUtils.generateToken(user));
        }
        return ResponseEntity.status(400).body("Some error has occurred");

    }
     */
    @PostMapping("/login")
    public ResponseEntity<String> authenticate(
            @RequestBody AuthenticationRequest request
    ){

        try{
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
            );

            final UserDetails user = userDao.findUserByEmail(request.getEmail());
            if(user != null) {
                return ResponseEntity.ok(jwtUtils.generateToken(user));
            }
        }catch(Exception e){

            final UserDetails user = userDao.findUserByEmail(request.getEmail());

            if(user != null) {
                String userToken = jwtUtils.generateToken(user);
                return ResponseEntity.ok(userToken);
            }
        }

        return ResponseEntity.status(400).body("Some error has occurred");
    }

    @PostMapping("/logout")
    public void logout(
            @RequestBody String token
    ){
        System.out.println(token);
        /*
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();

        if (auth != null){
            new SecurityContextLogoutHandler().logout((HttpServletRequest) request, null, auth);
        }
        return (ResponseEntity<String>) ResponseEntity.status(400);

         */

    }
}
