package com.myforum.myforum.config;

import com.myforum.myforum.dao.UserDao;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
//import org.slf4j.Logger;
//import org.slf4j.LoggerFactory;

import static org.springframework.http.HttpHeaders.AUTHORIZATION;

//OncePerRequestFilter means each request that comes to our backend will be intercepted first

@Component
@RequiredArgsConstructor
public class JwtAuthFilter extends OncePerRequestFilter{
    //public static final Logger logger = LoggerFactory.getLogger(JwtAuthFilter.class);
    private final UserDao userDao;
    private final JwtUtils jwtUtils;

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain) throws ServletException, IOException {
        System.out.println(request.getHeaderNames());
        final String authHeader = request.getHeader(AUTHORIZATION);
        final String userEmail;
        final String jwtToken;

        // check if we don't have a header or it does not contain bearer
        if (authHeader == null || !authHeader.startsWith("Bearer")) {
            filterChain.doFilter(request, response);
            return;
        }
        // extract the token
        jwtToken = authHeader.substring(7);
        userEmail = jwtUtils.extractUsername(jwtToken);
        System.out.println(userEmail);
        System.out.println(jwtToken);
        if (userEmail != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            UserDetails userDetails = userDao.findUserByEmail(userEmail);
            if (jwtUtils.isTokenValid(jwtToken, userDetails)) {
                UsernamePasswordAuthenticationToken authToken =
                        new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
                authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                SecurityContextHolder.getContext().setAuthentication(authToken);
            }
        }
        filterChain.doFilter(request, response);
    }
}
